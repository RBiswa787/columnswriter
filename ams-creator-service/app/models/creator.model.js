
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username:{
            type: String,
            required: true,
            unique:  true
          },
        accesstoken: {
            type: String,
          },
        name:{
          type: String
        },
        position:{
          type: String
        },
        about: {
          type: String
        },
        github: {
          type: String
        },
        linkedin: {
          type: String
        },
        twitter: {
          type: String
        },
        image: {
          type: String
        },
        draft_articles: {
          type: Array
        },
        review_articles: {
          type: Array
        },
        published_articles: {
          type: Array
        }
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Creator = mongoose.model("creator", schema);
    return Creator;
  };