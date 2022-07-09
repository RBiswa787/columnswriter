const { createPrivateKey } = require("crypto");
const db = require("../models");
const Creator = db.creator;


// Create and Save a new User
exports.create = (req, res) => {

    // Create a new User
    const creator = new Creator({
      username: req.body.username,
      accesstoken: req.body.accesstoken,
      name: req.body.name,
      position: req.body.position,
      about: req.body.about,
      github: req.body.github,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      image: req.body.image
    });

    Creator.findOne({username: creator.username})
      .then(data => {

        if (!data){
        creator
        .save(creator)
        .catch(err => {
          res.send({
            message:
              err.message || "Some error occurred while creating new user."
          });
        })
        .then(
          res.send({message: "AMS Registered Successfully"})
        );}
        else{
            res.send({ message: "User already exists with username " + creator.username});
        }

      })
      .catch(err => {
        res.send({
          message:
            err.message || "Some error occurred while creating new user."
        })})
  };


  exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  
    Creator.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Creator.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Creators were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

  exports.updateToken = (req,res) => {
    const update = {
      "accesstoken": req.body.accesstoken
    };
    Creator.findOneAndUpdate({"username":req.body.username},{$set:update})
    .then(
      res.send({message: "token set"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
  };

  exports.getProfile = (req,res) => {
    const username = req.body.username;
    const accesstoken = req.body.accesstoken;
    Creator.findOne({username: username})
    .then(data => {
      res.send(data);
    })
  };

  exports.updateProfile = (req,res) => {
    const update = { 
      "username": req.body.username,
      "accesstoken": req.body.accesstoken,
      "name": req.body.name,
      "position": req.body.position,
      "about": req.body.about,
      "github": req.body.github,
      "linkedin": req.body.linkedin,
      "twitter": req.body.twitter,
      "image": req.body.image
    }
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$set:update})
    .then(
      res.send({message: "profile updated"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.updateDraftArticle = (req,res) => {
    const id = req.body.articleid
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$push:{"draft_articles":id}})
    .then(
      res.send({message: "Article added to creator draft"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.updateReviewArticle = (req,res) => {
    const id = req.body.articleid
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$push:{"review_articles":id}})
    .then(
      res.send({message: "Article added for review!"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.updatePublishArticle = (req,res) => {
    const id = req.body.articleid
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$push:{"published_articles":id}})
    .then(
      res.send({message: "Article published!"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.deleteDraftArticle = (req,res) => {
    const id = req.body.articleid
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$pull:{"draft_articles":id}})
    .then(
      res.send({message: "Article removed from creator draft"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.deleteReviewArticle = (req,res) => {
    const id = req.body.articleid
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$pull:{"review_articles":id}})
    .then(
      res.send({message: "Article removed from review!"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };

  exports.deletePublishArticle = (req,res) => {
    const id = req.body.articleid
    Creator.findOneAndUpdate({"username":req.body.username,"accesstoken":req.body.accesstoken},{$pull:{"published_articles":id}})
    .then(
      res.send({message: "Article unpublished!"})
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred!"
      });
    });
  };