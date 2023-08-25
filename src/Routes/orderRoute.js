import express from 'express'
import { orderPostHandler } from '../Controllers/orderController.js'

const orderRoute = express.Router()

orderRoute.post('/orderPost/:userID/:foodID' ,orderPostHandler)

export default orderRoute