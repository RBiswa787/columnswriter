module.exports = app => {
    const article = require("../controllers/article.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", article.create);
  
    router.get("/", article.findAll);
  
    router.delete("/", article.deleteAll);

    router.post("/getarticle",article.getArticle);

    router.post("/updateArticle",article.updateArticle);

    router.post("/updateStatus",article.updateStatus);

    router.post("/userdraftarticle",article.getUserDraftArticles);

    router.post("/userreviewarticle",article.getUserReviewArticles);

    router.post("/userpublisharticle",article.getUserPublishArticles);

    app.use("/api/article", router);
  };