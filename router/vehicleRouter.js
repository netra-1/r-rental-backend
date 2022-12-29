const express = require("express");
const router = new express.Router();
const Room = require("../models/roomModel");
const auth = require("../auth/auth");
const upload = require("../upload/upload");

router.post(
  "/room/insert",
  auth.userGuard,
  upload.single("v_img"),
  (req, res) => {
    const user_Id = req.userInfo._id;
    const room_name = req.body.room_name;
    const room_category = req.body.room_category;
    const room_company = req.body.room_company;
    const room_desc = req.body.room_desc;
    const room_rich_desc = req.body.room_rich_desc;
    const is_featured = req.body.is_featured;
    const booking_cost = req.body.booking_cost;
    const room_sku = req.body.room_sku;
    const room_image = req.file.filename;
    const data = new Room({
      room_name: room_name,
      room_category: room_category,
      room_company: room_company,
      room_desc: room_desc,
      room_rich_desc: room_rich_desc,
      is_featured: is_featured,
      room_sku: room_sku,
      booking_cost: booking_cost,
      room_image: room_image,
      user_Id : user_Id,
    });
    data
      .save()
      .then(() => {
        res.json({ msg: "Room added", success: true });
      })
      .catch((e) => {
        res.json({ "Room add" :e });
      });
  }
);

router.put(
  "/room/update_image",
  auth.userGuard,
  upload.single("v_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    Room.updateOne(
      { _id: req.body._id },
      {
        room_image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "room image updated", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.put("/room/update", auth.userGuard, (req, res) => {
  Room.updateOne(
    { _id: req.body._id },
    {
      room_name: req.body.room_name,
      room_desc: req.body.room_desc,
      room_rich_desc: req.body.room_rich_desc,
      is_featured: req.body.is_featured,
      room_company: req.body.room_company,
      room_category: req.body.room_category,
      room_sku: req.body.room_sku,
      booking_cost: req.body.booking_cost,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "room updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.delete("/room/delete/:id", auth.userGuard, (req, res) => {
  Room.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "room deleted",
      });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.get("/room/get/all", (req, res) => {
  Room.find()
    .then((room) => {
      if (room != null) {
        res.status(201).json({
          success: true,

          data: room,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
router.get("/room/filter/:category", (req, res) => {
  Room.find({ room_category: req.params.category })
    .then((room) => {
      if (room != null) {
        res.status(201).json({
          success: true,

          data: room,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
router.get("/room/get/featured", (req, res) => {
  Room.find({ is_featured: true })
    .then((room) => {
      if (room != null) {
        res.status(201).json({
          success: true,

          data: room,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.get("/room/dashboard", auth.userGuard, async (req, res) => {
  const roomList = await Room.find({});
  res.json({
    success: true,
    data: roomList,
  });
});

router.get("/room/:id", (req, res) => {
  Room.findOne({ _id: req.params.id })

    .then((data) => {
      res.status(201).json({ success: true, data: data });
    })

    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
module.exports = router;
