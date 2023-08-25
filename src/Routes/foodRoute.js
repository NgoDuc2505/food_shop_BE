import express from 'express'
import { getAllFoodHandler, getFoodDetailHandler, uploadFoodIMgHanler, getFoodListlHandler } from '../Controllers/foodController.js'
//multer
import multer from "multer"
const storage = multer.diskStorage({
    destination: `${process.cwd()}/public/img`,
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "_" + file.originalname)
    }
})
const upload =multer({storage,})


const foodRoute = express.Router()
foodRoute.get('/getFoodDetail/:idFood', getFoodDetailHandler)

foodRoute.get('/getAllFood', getAllFoodHandler)

foodRoute.post('/uploadFood/:foodId',upload.single("file") ,uploadFoodIMgHanler)
foodRoute.get('/getListFoodByPage/:pageSize/:pageIndex', getFoodListlHandler)

export default foodRoute