const express = require("express");
const router = new express.Router();
const Category = require("../models/categoryModel");
const auth = require("../auth/auth");
const upload = require("../upload/upload");

router.post(
  "/category/insert",
  auth.userGuard,
  upload.single("c_img"),
  (req, res) => {
    const category_name = req.body.category_name;
    const category_desc = req.body.category_desc;
    const category_image = req.file.filename;
    const data = new Category({
      category_name: category_name,
      category_desc: category_desc,
      category_image: category_image,
    });
    data
      .save()
      .then(() =>
        res.status(201).json({ msg: "Category added", success: true })
      )
      .catch((e) => res.json({ msg: e }));
  }
);

router.put("/category/update", auth.userGuard, (req, res) => {
  Category.updateOne(
    { _id: req.body._id },
    {
      category_name: req.body.category_name,
      category_desc: req.body.category_desc,
    }
  )
    .then(() => {
      res.status(201).json({ msg: "Category updated", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

router.put(
  "/category/update_image",
  auth.userGuard,
  upload.single("c_img"),
  (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ msg: "Invalid file type" });
    }
    Category.updateOne(
      { _id: req.body._id },
      {
        category_image: req.file.filename,
      }
    )
      .then(() => {
        res.json({ msg: "category image updated", success: true });
      })
      .catch((e) => {
        res.json({ e });
      });
  }
);

router.get("/category/get", auth.userGuard, (req, res) => {
  Category.find()
    .then((categoryList) => {
      if (categoryList != null) {
        res.status(201).json({
          success: true,

          data: categoryList,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

router.delete("/category/delete/:id", auth.userGuard, (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ msg: "Category deleted", success: true });
    })
    .catch((e) => {
      res.json({ e });
    });
});

module.exports = router;
