const express = require("express")

const ArticleSchema = require("./schema")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleSchema.find()   //find is the equivalent of our generic read of the whole json file
    res.send(articles)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findById(req.params.id)   //findById is how we're getting back from the db the element with that specific id that we pass
    if (article) {
      res.send(article)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("A problem occurred!")
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newarticle = new ArticleSchema(req.body) //this is how we create the instance for the new element that we're going to add (that we pass between parenthesis)
    const { _id } = await newarticle.save()       // we add it through the save()

    res.status(201).send(newarticle)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndUpdate(req.params.id, req.body, {   //for the put method we do basically a mix of the post and get by id
      runValidators: true,                                               //by using findByIdAndUpdate we pass the id to find our element and pass as the second parameter our updated body
      new: true,
    })
    if (article) {
      res.send(article)
    } else {
      const error = new Error(`article not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndDelete(req.params.id)   //find by id and delete the found element 
    if (article) {
      res.send("Article deleted successfully")
    } else {
      const error = new Error("Article not found")
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router