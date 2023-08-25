import express from 'express'
import userRoute from './userRoute.js'
import foodRoute from './foodRoute.js'
import resRoute from './resRoute.js'
import orderRoute from './orderRoute.js'

const rootRoute = express.Router()

rootRoute.use('/user', userRoute)
rootRoute.use('/food', foodRoute)
rootRoute.use('/res', resRoute)
rootRoute.use('/order', orderRoute)

export default rootRoute