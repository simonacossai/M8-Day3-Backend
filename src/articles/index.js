const express = require("express")

const ArticleSchema = require("./schema")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleSchema.find()
    res.send(articles)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const article = await ArticleSchema.findById(id)
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
    const newarticle = new ArticleSchema(req.body)
    const { _id } = await newarticle.save()

    res.status(201).send(newarticle)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    })
    if (article) {
      res.send(article)
    } else {
      const error = new Error(`article with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findByIdAndDelete(req.params.id)
    if (article) {
      res.send("Article deleted successfully")
    } else {
      const error = new Error(`article with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router