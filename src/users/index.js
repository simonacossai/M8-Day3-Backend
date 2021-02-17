const express = require("express");
const UserSchema = require("./schema")
const router = express.Router();
const verify = require("../auth/verifyToken");

router
  .route("/")
  .get(verify, async (req, res, next) => {
    try {
        const authors = await UserSchema.find(req.query)
        res.send(authors)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })

  router.get("/:id",verify, async (req, res, next) => {
    try {
      const author = await UserSchema.findById(req.params.id)
      if (author) {
        res.send(author)
      } else {
        const error = new Error(`author not found`)
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      next(error)
    }
  })
  
  router.delete("/:id",verify, async (req, res, next) => {
    try {
      const author = await UserSchema.findByIdAndDelete(req.params.id)
      if (author) {
        res.send("Author deleted successfully")
      } else {
        const error = new Error(`author not found`)
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      next(error)
    }
  })


module.exports = router;
