module.exports = app => {
    const creator = require("../controllers/creator.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", creator.create);
  
    router.get("/", creator.findAll);
  
    router.delete("/", creator.deleteAll);
    
    router.post("/token",creator.updateToken);

    router.post("/getprofile",creator.getProfile);

    router.post("/editprofile",creator.updateProfile);

    router.post("/draft",creator.updateDraftArticle);

    router.post("/review",creator.updateReviewArticle);

    router.post("/publish",creator.updatePublishArticle);

    router.post("/deletedraft",creator.deleteDraftArticle);

    router.post("/deletereview",creator.deleteReviewArticle);

    router.post("/deletepublish",creator.deletePublishArticle);

    app.use("/api/creator", router);
  };