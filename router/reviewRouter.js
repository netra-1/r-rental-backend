const express = require("express");
const router = new express.Router();
const Review = require("../models/reviewModel");
const auth = require("../auth/auth");

router.post("/review/insert/:room_id", auth.userGuard, (req, res) => {
  const user_id = req.userInfo._id;
  const room_id = req.params.room_id;
  const data = new Review({
    user_id: user_id,
    room_id: room_id,
    rating: req.body.rating,
    review: req.body.review,
  });
  data
    .save()
    .then(() => res.status(201).json({ msg: "Review Added", success: true }))
    .catch((e) => res.json({ msg: e }));
});

router.get("/review/get/:id", (req, res) => {
  Review.find({ room_id: req.params.id })
    .populate("user_id")
    .then((review) => {
      if (review != null) {
        res.status(201).json({
          success: true,
          data: review,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
module.exports = router;
