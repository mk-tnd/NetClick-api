const { User } = require("../models");

exports.login = (req, res, next) => {
  console.log(req.user);
};

exports.register = (req, res, next) => {};
