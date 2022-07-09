
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        author:{
            type: String,
            required: true,
          },
        name: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true
        },
        markdown: {
          type: String,
          required: true
        },
        category: {
          type: String
        },
        status: {
          type: Number,
          default: 0
        }
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Article = mongoose.model("article", schema);
    return Article;
  };