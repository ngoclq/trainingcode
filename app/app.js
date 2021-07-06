import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import mongodb from './libs/mongodb';
import baseResponse from './libs/baseResponse';
import logger from './libs/logger'
import corsOptionDelegate from './libs/corsOption'

import router from './feature'

const app = express()


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
  app.use(cors())
} else {
  app.use(cors(corsOptionDelegate))
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(cookieParser())
app.use(baseResponse)
app.use('', router)

const dbInMemoryHandler = require("./config/jest/db-handler.js");
const dbConnect = () => {
  mongodb.connect(err => {
    if (err) logger.error(err)
    logger.tick('Connection has been established successfully')
  })
}
console.log("process.env.NODE_ENV  ==> ", process.env.NODE_ENV )
process.env.NODE_ENV === "Test" ? dbInMemoryHandler.connect() : dbConnect();

export default app
