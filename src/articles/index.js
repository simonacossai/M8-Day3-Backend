const express = require("express")
const mongoose = require("mongoose")
const ArticleSchema = require("./schema")
const ReviewSchema = require("../reviews/schema")
const router = express.Router()
const verify = require("../auth/verifyToken");

/*
.map((book) => book.price * book.quantity)
    .reduce((acc, el) => acc + el, 0);
    */
router.get("/",verify, async (req, res, next) => {
  try {
    const articles = await ArticleSchema.find()   //find is the equivalent of our generic read of the whole json file
    res.send(articles)
  } catch (error) {
    next(error)
  }
})

router.get("/:id",verify, async (req, res, next) => {
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

router.post("/",verify, async (req, res, next) => {
  try {
    const newarticle = new ArticleSchema(req.body) //this is how we create the instance for the new element that we're going to add (that we pass between parenthesis)
    const { _id } = await newarticle.save()       // we add it through the save()

    res.status(201).send(newarticle)
  } catch (error) {
    next(error)
  }
})

router.put("/:id",verify, async (req, res, next) => {
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

router.delete("/:id",verify, async (req, res, next) => {
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

router.post("/:id/reviews/",verify, async (req, res, next) => {
    try {
      const newReview = { ...req.body, date: new Date() }
  
      const updatedArticle = await ArticleSchema.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            reviews: newReview,
          },
        },
        { runValidators: true, new: true }
      )
      res.status(201).send(updatedArticle)
    } catch (error) {
      next(error)
    }
  })
  
  router.get("/:id/reviews/",verify, async (req, res, next) => {
    try {
      const { reviews } = await ArticleSchema.findById(req.params.id, {
        reviews: 1,
        _id: 0,
      })
      res.send(reviews)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
  router.get("/:id/reviews/:reviewId",verify, async (req, res, next) => {
    try {
      const { reviews } = await ArticleSchema.findOne(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          _id: 0,
          reviews: {
            $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
          },
        }
      ) 
      if (reviews && reviews.length > 0) {
        res.send(reviews[0])
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
  router.delete("/:id/reviews/:reviewId",verify, async (req, res, next) => {
    try {
      const modifiedArticle = await ArticleSchema.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            reviews: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
          },
        },
        {
          new: true,
        }
      )
      res.send(modifiedArticle)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
  router.put("/:id/reviews/:reviewId",verify, async (req, res, next) => {
    try {
      const { reviews } = await ArticleSchema.findOne(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          _id: 0,
          reviews: {
            $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
          },
        }
      )
  
      if (reviews && reviews.length > 0) {
        const ReviewToReplace = { ...reviews[0].toObject(), ...req.body }
  
        const modifiedReview = await ArticleSchema.findOneAndUpdate(
          {
            _id: mongoose.Types.ObjectId(req.params.id),
            "reviews._id": mongoose.Types.ObjectId(req.params.reviewId),
          },
          { $set: { "reviews.$": ReviewToReplace } },
          {
            runValidators: true,
            new: true,
          }
        )
        res.send(modifiedReview)
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

module.exports = router