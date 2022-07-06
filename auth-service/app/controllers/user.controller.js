const db = require("../models");
const User = db.user;


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.send({ message: "Email cannot be empty" });
      return;
    }
    if (!req.body.username) {
        res.send({ message: "Username cannot be empty" });
        return;
      }
    if (!req.body.password) {
        res.send({ message: "Password cannot be empty" });
        return;
      }
  
    // Create a new User
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    User.findOne({username: user.username})
      .then(data => {

        if (!data){
        user
        .save(user)
        .then(
          res.send({message:"Registered Successfully"}))
        .catch(err => {
          res.send({
            message:
              err.message || "Some error occurred while creating new user."
          });
        });}
        else{
            res.send({ message: "User already exists with username " + user.username});
        }

      })
  };

  // Retrieve all users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { title: { $regex: new RegExp(username), $options: "i" } } : {};
  
    User.find(condition)
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
  
  // Find a single User with email
  exports.findOne = (req, res) => {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [credusername, credpassword] = credentials.split(':');
    User.findOne({username: credusername})
      .then(data => {
        if (!data)
          res.send({ message: "Not found User with username " + credusername,authorised:false,access:null });
        else{
            if(data.password == credpassword){
                const access_token = makeid(20);
                res.send({message: "Found",authorised: true,access:access_token});
            }
            else{
                res.send({message: "Found",authorised: false,access:null});
            }
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with username=" + username });
      });
  };

  exports.deleteAll = (req, res) => {
    User.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Users were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };