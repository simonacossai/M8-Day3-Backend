const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
    {
        name: {
          type: String,
        },
        surname: {
          type: String,
        },
        email: {
          type: String,
        },
        image: {
          type: String,
          default: "http://placehold.it/50x50",
        },
        username: {
          type: String,
        },
        password:{
          type:String,
        }
      },
)

module.exports = model("User", UserSchema)