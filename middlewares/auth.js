const jwt = require('jsonwebtoken');
const { findById } = require('../controllers/user');

exports.authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const { id } = decodedToken;
        const result = await checkIfUserExistById(id);
        if (result) {
            next && next();
        } else {
            res.send("Authentication Failed").status(401);
        }
    } else {
        res.send("please provide JWT").status(401);
    }
}

const checkIfUserExistById = async (id) => {
    let isExist = false;
    const response = await findById(id);
    if (response && response._id) {
        isExist = true;
    }
    return isExist;
}

