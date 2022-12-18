const app = require("../app");
const request = require("supertest");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3OWJmOGVhZjkzYmFiNTNmYjAxNTYiLCJpYXQiOjE2NTgyOTc4NzF9.sicIsQXQLr90cJae-mfeE_KzFTEjrqjkk2Szr-j1jJI";

// User Router testting

describe("POST /user/register", function () {
  it("User register test", function (done) {
    request(app)
      .post("/user/register")
      .send({
        username: "user1223",
        password: "user1223",
        email: "user122@gmai.com",
        userType: "user",
        phone: "324234234",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("POST /user/login", function () {
  it("User login test", function (done) {
    request(app)
      .post("/user/login")
      .send({ username: "user12", password: "user12" })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("GET /user/dashboard", function () {
  it("User profile test", function (done) {
    request(app)
      .get("/user/dashboard")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /user/update_profile", function () {
  it("profile update test", function (done) {
    request(app)
      .put("/user/update_profile")
      .set("Authorization", token)
      .send({
        firstname: "Harry",
        lastname: "Kane",
        address: "UK",
        gender: "Male",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// room router testing

describe("GET /room/get", function () {
  it("Get all Rooms test", function (done) {
    request(app)
      .get("/room/get")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("GET /room/filter/:category", function () {
  it("Get Rooms of a category test", function (done) {
    request(app)
      .get("/room/filter/Car")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /room/get/featured", function () {
  it("Get featured rooms test", function (done) {
    request(app)
      .get("/room/get/featured")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /room/:id", function () {
  it("Get specific room test", function (done) {
    request(app)
      .get("/room/62ad9910192d892c72b799ea")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("PUT /room/update", function () {
  it("Update room details test", function (done) {
    request(app)
      .put("/room/update")
      .set("Authorization", token)
      .send({
        _id: "62ad9910192d892c72b799ea",
        room_name: "Yamaha MT-7",
        room_desc:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        room_rich_desc:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        is_featured: true,
        room_company: "Yamaha",
        room_sku: "JADS122",
        booking_cost: "2000",
        room_category: "Bike",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("DELETE /room/delete/:id", function () {
  it("Delete a room test", function (done) {
    request(app)
      .delete("/room/62de36c4521c77297d3c12cc")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// category router test

describe("POST /category/insert", function () {
  it("Insert category test", function (done) {
    request(app)
      .post("/category/insert")
      .set("Authorization", token)
      .send({
        category_name: "Cycle",
        category_desc: "Two wheeled pedal cycles",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /category/get", function () {
  it("Get all categories test", function (done) {
    request(app)
      .get("/category/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /category/update", function () {
  it("Update category test", function (done) {
    request(app)
      .put("/category/update")
      .set("Authorization", token)
      .send({
        _id: "62bd5468b935e350e732eb5c",
        category_name: "Bike",
        category_desc: "Two wheeled motor running bicycle",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// article Router test

describe("GET /article/get", function () {
  it("Get articles test", function (done) {
    request(app)
      .get("/article/get")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("GET /article/get/featured", function () {
  it("Get featured articles test", function (done) {
    request(app)
      .get("/article/get/featured")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /article/update", function () {
  it("Update article test", function (done) {
    request(app)
      .put("/category/update")
      .set("Authorization", token)
      .send({
        _id: "62b814918ffae5a87ee38d25",
        title: "Tesla new model in market",
        date: "2020-12-22",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.",
        rich_description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.",
        is_featured: true,
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("DELETE /article/delete/:id", function () {
  it("Delete articles test", function (done) {
    request(app)
      .delete("/article/delete/62dd6213469ee0a7708c6c7c")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// review router test

describe("POST /review/insert/:room_id", function () {
  it("Post review test", function (done) {
    request(app)
      .post("/review/insert/62ad9910192d892c72b799ea")
      .set("Authorization", token)
      .send({
        rating: "3",
        review:
          "It was a very good condition room. The ride was very fun. I would definitely rent it again",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /review/get/:id", function () {
  it("Get room reviews test", function (done) {
    request(app)
      .get("/review/get/62ad9910192d892c72b799ea")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// favourite router test

describe("POST /favourite/insert/:room_id", function () {
  it("Add to favourites test", function (done) {
    request(app)
      .post("/favourite/insert/62ad9910192d892c72b799ea")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /favourite/get/", function () {
  it("Get favourites test", function (done) {
    request(app)
      .get("/favourite/get/")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("DELETE /favourite/delete/:id", function () {
  it("Delete from favourites test", function (done) {
    request(app)
      .delete("/favourite/delete/62da56f0a30bea8efd7bdcfe")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// booking router tests

describe("POST /booking/add/:room_id", function () {
  it("Room booking test", function (done) {
    request(app)
      .post("/booking/add/62ad9910192d892c72b799ea")
      .set("Authorization", token)
      .send({
        no_of_days: "2",
        booking_date: "2020-12-02",
        booking_time: "14:02",
        address: "testing",
        contact_no: "234234",
        status: "renting",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /user/booking/get", function () {
  it("Get user's bookings test", function (done) {
    request(app)
      .get("/user/booking/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET/booking/get", function () {
  it("Get all bookings test", function (done) {
    request(app)
      .get("/booking/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /booking/update/:id", function () {
  it("Update booking test", function (done) {
    request(app)
      .put("/booking/update/62ad9910192d892c72b799ea")
      .set("Authorization", token)
      .send({
        room_id: "62d53a5c878741c1fc2651ce",
        booking_date: "2022-12-34",
        booking_time: "7:02",
        address: "Lalitpur",
        contact_no: "23432234",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
