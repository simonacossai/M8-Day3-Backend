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
   author:{
       type: Object,
       name:{
           type: String,
           required: true,
       },
       img: {
           type: String,
           required: true,        
       }
   },
    cover:{type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
  },
 
  { timestamps: true }
)

module.exports = mongoose.model("Article", ArticleSchema)