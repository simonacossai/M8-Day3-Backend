const { Schema, model } = require("mongoose")

const ReviewSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Review", ReviewSchema)