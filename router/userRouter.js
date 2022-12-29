const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../upload/upload");

//Importing Model
const User = require("../models/userModel");

router.post("/user/register", (req, res) => {
  console.log(req.body.username);
  const username = req.body.username;
  console.log(username);
  User.findOne({ username: username })
    .then((user_data) => {
      if (user_data != null) {
        res.json({ msg: "username already exist" });
        return;
      }
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const address = req.body.address;
      const phone = req.body.phone;
      const gender = req.body.gender;
      const email = req.body.email;
      const password = req.body.password;

      bcryptjs.hash(password, 10, (e, hashed_pw) => {
        const data = new User({
          firstname: firstname,
          lastname: lastname,
          address: address,
          phone: phone,
          gender: gender,
          username: username,
          email: email,
          password: hashed_pw,
          userType: "user",
        });
        data
          .save()
          .then(() => {
            res.status(201).json({ msg: "Registered", success: true });
          })
          .catch((e) => {
            res.json({ e });
          });
      });
    })
    .catch();
});

// For login

router.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  User.findOne({ username: username })
    .then((user_data) => {
      console.log(user_data);
      if (user_data == null) {
        res.json({ msg: "Invalid Credentials" });
        return;
      }
      bcryptjs.compare(password, user_data.password, (e, result) => {
        if (result == false) {
          res.json({ msg: "Invalid Credential" });
          return;
        }
        // Creating token for logged in user
        const token = jwt.sign({ userId: user_data._id }, "nrental");
        res.status(201).json({ token: token, userType: user_data.userType });
      });
    })
    .catch();
});

// for testing token
router.delete("/booking/delete", auth.userGuard, (req, res) => {
  res.json({ msg: "booking deleted" });
});

// Dashboard router for admin
router.get("/user/dashboard", auth.userGuard, (req, res) => {
  res.status(201).json({
    firstname: req.userInfo.firstname,
    lastname: req.userInfo.lastname,
    address: req.userInfo.address,
    phone: req.userInfo.phone,
    gender: req.userInfo.gender,
    username: req.userInfo.username,
    email: req.userInfo.email,
    profile_img: req.userInfo.profile_img,
    userType: req.userInfo.userType,
  });
});
// Dashboard router for admin
router.get("/user/get", auth.userGuard, (req, res) => {
  res.status(201).json({
    success: true,
    data: {
      firstname: req.userInfo.firstname,
      lastname: req.userInfo.lastname,
      address: req.userInfo.address,
      phone: req.userInfo.phone,
      gender: req.userInfo.gender,
      username: req.userInfo.username,
      email: req.userInfo.email,
      profile_img: req.userInfo.profile_img,
      userType: req.userInfo.userType,
    },
  });
});

router.put(
  "/user/update_profile_img",
  auth.userGuard,
  upload.single("user_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    User.updateOne(
      { _id: req.userInfo._id },
      { profile_img: req.file.filename }
    )
      .then(() => {
        res.status(201).json({ msg: "room image updated", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.put("/user/update_profile", auth.userGuard, (req, res) => {
  User.updateOne(
    { _id: req.userInfo._id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      username: req.body.username,
      email: req.body.email,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Profile updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.put("/password/update", auth.userGuard, (req, res) => {
  const old_password = req.body.old_password;
  const new_password = req.body.new_password;
  User.findOne({
    _id: req.userInfo._id,
  })
    .then((user_data) => {
      if (user_data == null) {
        res.json({
          msg: "Invalid Credentials",
        });
        return;
      }
      bcryptjs.compare(old_password, user_data.password, (e, result) => {
        if (result == false) {
          res.json({
            msg: "Incorrect password",
          });
          return;
        }
        bcryptjs.hash(new_password, 10, (e, hashed_pw) => {
          User.updateOne(
            { _id: req.userInfo._id },
            {
              password: hashed_pw,
            }
          )
            .then(
              res.status(201).json({
                msg: "Password changed",
                success: true,
              })
            )
            .catch((e) => {
              res.json({
                msg: e,
              });
            });
        });
      });
    })
    .catch((e) => {
      res.json({
        success: false,
        msg: e,
      });
    });
});

module.exports = router;
