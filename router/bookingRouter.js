const express = require("express");
const router = new express.Router();
const Booking = require("../models/bookingModel");
const Bidding = require("../models/biddingModel");
const auth = require("../auth/auth");

router.post("/booking/add/:room_id", auth.userGuard, (req, res) => {
  const user_id = req.userInfo._id;
  const room_id = req.params.room_id;
  const data = new Booking({
    user_id: user_id,
    room_id: room_id,
    no_of_days: req.body.no_of_days,
    booking_date: req.body.booking_date,
    booking_time: req.body.booking_time,
    address: req.body.address,
    contact_no: req.body.contact_no,
    status: "renting",
  });
  data
    .save()
    .then(() => res.status(201).json({ msg: "Room Booked ", success: true }))
    .catch((e) => res.json({ msg: e }));
});

router.post("/bidding/add/:room_id", auth.userGuard, (req, res) => {
  const user_id = req.userInfo._id;
  const room_id = req.params.room_id;
  const data = new Bidding({
    user_id: user_id,
    room_id: room_id,
    price : req.body.price,
    status: "bidding",
  });
  data
    .save()
    .then(() => res.status(201).json({ msg: "Room Booked ", success: true }))
    .catch((e) => res.json({ msg: e }));
});

router.put("/bidding/update/:id", auth.userGuard, (req, res) => {
  Bidding.updateOne(
    { _id: req.params.id },
    {
      price : req.body.price,
      status: req.body.status,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Booking updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.delete("/booking/delete/:id", auth.userGuard, (req, res) => {
  Booking.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({ msg: "Booking Deleted ", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.get("/user/booking/get", auth.userGuard, (req, res) => {
  Booking.find({ user_id: req.userInfo._id })
    .populate("room_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});


router.get("/booking/get", auth.userGuard, (req, res) => {
  Booking.find()
    .populate("room_id")
    .populate("user_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/bidding/get", (req, res) => {
  Bidding.find()
    .populate("room_id")
    .populate("user_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/user/bidding/get/",auth.userGuard, (req, res) => {
  Bidding.find({user_id: req.userInfo._id})
    .populate("room_id")
    .populate("user_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/booking/get/details/:id", auth.userGuard, (req, res) => {
  Booking.findOne({ _id: req.params.id })
    .populate("room_id")
    .then((booking) => {
      if (booking != null) {
        res.status(201).json({
          success: true,
          data: booking,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.put("/booking/update/:id", auth.userGuard, (req, res) => {
  Booking.updateOne(
    { _id: req.params.id },
    {
      room_id: req.body.room_id,
      no_of_days: req.body.no_of_days,
      booking_date: req.body.booking_date,
      booking_time: req.body.booking_time,
      address: req.body.address,
      contact_no: req.body.contact_no,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Booking updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});
router.put("/booking/update/status/:id", auth.userGuard, (req, res) => {
  Booking.updateOne(
    { _id: req.params.id },
    {
      status: req.body.status,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Booking status updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});
module.exports = router;
