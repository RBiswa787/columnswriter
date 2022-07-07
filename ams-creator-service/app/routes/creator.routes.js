module.exports = app => {
    const creator = require("../controllers/creator.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Creator
    router.post("/", creator.create);
  
    // Retrieve all Creators
    router.get("/", creator.findAll);
  
    router.delete("/", creator.deleteAll);
    
    router.post("/token",creator.updateToken);

    router.post("/getprofile",creator.getProfile);

    router.post("/editprofile",creator.updateProfile);

    app.use("/api/creator", router);
  };