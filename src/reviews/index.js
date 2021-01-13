
const express = require("express")
const q2m = require("query-to-mongo")
const ReviewModel = require("./schema")
const router = express.Router()
        
//POST /articles/:id => adds a new review for the specified article
router.post("/", async (req, res, next) => {
    try {
        const newReview = new ReviewModel(req.body)
        const { _id } = await newReview.save()
        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
})

//GET /articles/:id/reviews => returns all the reviews for the specified article

router.get("/", async (req, res, next) => {
    try {
      const query = q2m(req.query)
      const total = await ReviewModel.countDocuments(query.criteria)
  
      const reviews = await ReviewModel.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
      res.send({ links: query.links("/reviews", total), reviews })
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  

  //GET /articles/:id/reviews/:reviewId => returns a single review for the specified article
  router.get("/:id", async (req, res, next) => {
    try {
      const review = await ReviewModel.findById(req.params.id)
      res.send(review)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
  //PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article
  router.put("/:id", async (req, res, next) => {
    try {
      const modifiedReview = await ReviewModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          runValidators: true,
          new: true,
        }
      )
      if (modifiedReview) {
        res.send(modifiedReview)
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
 //DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article

  router.delete("/:id", async (req, res, next) => {
    try {
      const review = await ReviewModel.findByIdAndDelete(req.params.id)
      if (review) {
        res.send(review)
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
module.exports = router

