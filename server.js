const express = require('express')
const logger = require("morgan")
const cors = require('cors')
const userRouter = require('./api/routes/users')
const collectionRouter = require('./api/routes/collections')
const mongoose = require('mongoose')
require('dotenv').config()
const db = require('./schemas/db')
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}),
);

require('./config/config-passport')

app.use('/api/users', userRouter)     //
app.use('/api/collections', collectionRouter)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Use api on routes: 
    /api/registration - registration user {username, email, password}
    /api/login - login {email, password}
    /api/logout - logout`,
    data: 'Not found',
  })
})

app.use((err, _, res, __) => {
  console.log(err.message)
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`)
})})
.catch((err) => {
  console.log(`Error:${err.message}`);
})

