const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const ArticleSchema = new Schema(
  {
    headLine: {
      type: String,
      required: true,
    },
    subHead: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
   },
   category: {
       type: Object,
       name: {
           type: String,
           required: true,
       },
       img: {
           type: String,
           required: true,
       }
   },
   author: [{
     name:{
       type: String
     },
     img:{
       type: String
     }
   }],
    cover:{type: String,
        required: true,
    },
    reviews: [
        {
          user: String,
          text: String,
        },
      ],
  },
 
  { timestamps: true }
)

module.exports = mongoose.model("Article", ArticleSchema)