const Brand = require('../models/brand');

exports.create = (req, res, next) => {
  const brand = new Brand(req.body);
  brand.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    next && next();
    return res.json(user);
  });
};