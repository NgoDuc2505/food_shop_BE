import express from 'express'
import { setLikeHandler, unLikeHandler, getLikeByResHandler, getLikeByUserHandler, setRateResHandler, getRateByResHandler, getRateByUserHandler } from '../Controllers/resController.js'

const resRoute = express.Router()

resRoute.post('/resLike/:resID/:userID' ,setLikeHandler)
resRoute.delete('/resUnlike/:resID/:userID', unLikeHandler)
resRoute.get('/getLikeByRes/:resID', getLikeByResHandler)
resRoute.get('/getLikeByUser/:userID', getLikeByUserHandler)
resRoute.post('/resRate/:resID/:userID', setRateResHandler)
resRoute.get('/getRateByRes/:resID', getRateByResHandler)
resRoute.get('/getRateByUser/:userID', getRateByUserHandler)

export default resRoute