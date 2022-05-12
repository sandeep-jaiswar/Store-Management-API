require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const redis = require("redis")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const logger = require("morgan")
const session = require("express-session")
const rootRoute = require("./routes")
const port = process.env.PORT || 3000
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const noOfWorkers = numCPUs / 4 >= 6 ? 6 : numCPUs / 4 + 1

//db connection
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
})
const connection = mongoose.connection
connection.once("open", function () {
  console.info("MongoDB database connection established successfully")
})

//redis
const startRedis = async () => {
  const client = redis.createClient({
    url: `redis://${process.env.REDISUSER}:${process.env.REDISPASS}@${process.env.REDISHOST}:${process.env.REDISPORT}`,
  })
  await client.connect().then(() => {
    console.info("redis is connected successfully")
  })
  client.on("error", (err) => {
    console.error("Error " + err)
  })
  return client
}
;(async () => {
  const redi = await startRedis()
  global.redis = redi
})()

const app = express()

//express-session
const sessionObj = {
  secret: process.env.SESSIONSECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
}
if (process.env.ENV === "production") {
  app.set("trust proxy", 1) // trust first proxy
  sessionObj.cookie.secure = true // serve secure cookies
}
app.use(session(sessionObj))

//cluster forking
let server = null
if (cluster.isMaster && process.env.ENV == "production") {
  for (var i = 0; i < noOfWorkers; i++) {
    console.log("Cluster Forked")
    cluster.fork()
  }
  Object.keys(cluster.workers).forEach(function (id) {
    console.log("I am running with ID : " + cluster.workers[id].process.pid)
  })
  cluster.on("exit", function (worker, code, signal) {
    console.log("Worker " + worker.process.pid + " died")
    var newWorker = cluster.fork()
    newWorker.on("message", function (msg) {
      msg.workerId = newWorker.process.pid
    })
  })
} else {
  const port = process.env.PORT
  server = app.listen(port, function () {
    console.log("app listening on port " + port + "!")
  })
}

//middlewares
app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressValidator())
app.use("/api", rootRoute)

//error global
app.use((err, req, res, next) => {
  console.log("in error")
  if (!err) {
    return next()
  }
  res.status(500)
  console.log(err)
  res.send(err)
})
