const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User Guard
module.exports.userGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "nrental");
    // console.log(data);
    User.findOne({
      _id: data.userId,
    })
      .then((user_data) => {
        req.userInfo = user_data;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid token" });
  }
};
