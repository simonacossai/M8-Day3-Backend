const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const articlesRouter = require("./articles")
const usersRouter = require("./users")
const authRouter = require("./auth/auth.js");


const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers.js")

const server = express()

const port = process.env.PORT

server.use(express.json())

server.use(cors())

server.use("/articles", articlesRouter)
server.use("/users", usersRouter)
server.use("/api/user", authRouter);


// ERROR HANDLERS MIDDLEWARES

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch(err => console.log(err))