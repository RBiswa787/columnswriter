const { createPrivateKey } = require("crypto");
const db = require("../models");
const mongoose = require("mongoose");
const Article = db.article;
const Creator = db.creator;

// Create and Save a new User
exports.create = (req, res) => {
    var myId = mongoose.Types.ObjectId();
    // Create a new User
    const article = new Article({
      author: req.body.username,
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      category: req.body.category,
      _id: myId
    });

    Article.findOne({title: article.title})
      .then(data => {

        if (!data){
        article
        .save(article)
        .then(res.send({"id": myId,"message":"Saved!"}))
        .catch(err => {
          res.status(404).send({
            message:
              err.message || "Some error occurred while creating new article."
          });
        })
        }
        else{
            res.send({ message: "Article already exists with title " + article.title});
        }

      })
      .catch(err => {
        res.send({
          message:
            err.message || "Some error occurred while creating new article."
        })})
  };


  exports.findAll = (req, res) => {
    const article = req.query.article;
    var condition = article ? { article: { $regex: new RegExp(article), $options: "i" } } : {};
  
    Article.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving articles."
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Article.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Article were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all articles."
        });
      });
  };


  exports.getArticle = (req,res) => {
    const id = req.body.id;
    Article.findById(id)
    .then(data => {
        res.send(data);
    })
  };

  exports.updateArticle = (req,res) => {
    const update = { 
      "title": req.body.title,
      "description": req.body.description,
      "markdown": req.body.markdown,
    }
    Creator.findOne({"username":req.body.username,"accesstoken":req.body.accesstoken})
    .then(
      data => {
        if(data){
          Article.findOneAndUpdate({"_id":req.body.id},{$set:update})
          .catch(
            err => {
              res.send(err.message);
            }
          );
        }
        else{
          res.send({"message":"Not Authorised!"});
        }
      }
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.getUserDraftArticles = (req,res) => {
    const username = req.body.username;
    var condition = {"username":username,"status": 0};
    Article.find(condition)
    .then(
      data => {
        res.send(data);
      }
    )
    .catch(
      err => {
        res.status(404).send(err.message);
      }
    )
  }

  exports.getUserReviewArticles = (req,res) => {
    const username = req.body.username;
    var condition = {"username":username,"status": 1};
    Article.find(condition)
    .then(
      data => {
        res.send(data);
      }
    )
    .catch(
      err => {
        res.status(404).send(err.message);
      }
    )
  }

  exports.getUserPublishArticles = (req,res) => {
    const username = req.body.username;
    var condition = {"username":username,"status": 2};
    Article.find(condition)
    .then(
      data => {
        res.send(data);
      }
    )
    .catch(
      err => {
        res.status(404).send(err.message);
      }
    )
  }

  exports.updateStatus = (req,res) => {
    const update = { 
      "status": req.body.status
    }
    Creator.findOne({"username":req.body.username,"accesstoken":req.body.accesstoken})
    .then(
      data => {
        if(data){
          Article.findOneAndUpdate({"_id":req.body.id},{$set:update})
          .then(value => {res.send("executed!")})
          .catch(
            err => {
              res.send(err.message);
            }
          );
        }
        else{
          res.send({"message":"Not Authorised!"});
        }
      }
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };