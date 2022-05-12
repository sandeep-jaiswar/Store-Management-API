const user = require('../models/user');
const jwt = require('jsonwebtoken');

exports.create = (req, res, next) => {
    const userObj = new user({
        name: req.body.name
    })
    userObj.save((err, user) => {
        if (err) {
            res.send(err.message)
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        insertToken({ id: user._id, token }, res, next);
        req.session.sid = user._id;
    });
}

exports.getAll = async (req, res, next) => {
    const resultFromRedis = await global.redis.get('getAllUser');
    if (resultFromRedis) {
        res.send(JSON.parse(resultFromRedis)).json().status(200);
    } else {
        user.find((err, users) => {
            if (err) {
                res.send(err.message);
            } else {
                global.redis.set('getAllUser', JSON.stringify(users));
                res.send(users).json().status(200);
            }
        })
    }
}

exports.userById = async (req, res, next, id) => {
    const response = await findById(id);
    return res.send(response);
}

exports.findById = async id => {
    try {
        return new Promise((resolve, reject) => {
            user.findById(id).exec((err, user) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                return resolve(user);
            })
        })
    } catch (e) {
        console.log(e.message)
    }
}

exports.read = (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}

exports.update = (req, res) => {
    user.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not authorized to perform this action"
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        return res.json(user);
    })
}

insertToken = (req, res, next) => {
    const { id, token } = req;
    user.findOneAndUpdate({ _id: id }, { token }, { new: true }, (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            res.send(data)
        }
    })
}