const { isEmail } = require('validator');

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username:{
            type: String,
            required: true,
            createIndexes: { unique: true },
            unique:  true
          },
        email: {
            type: String,
            required: true,
            validate: [isEmail, 'invalid email'],
            unique: true
          },
        password: { type: String, required: true }
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };