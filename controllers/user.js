const user = require('../models/user')

exports.userById = (req, res, next, id) => {
    console.log(id);
    user.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not Found"
            })
        }
        req.profile = user;

        next()
    })
}

exports.read = (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}

exports.update = (req, res) => {
    user.findOneAndUpdate({_id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
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