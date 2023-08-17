import initModels from '../Models/init-models.js'
import sequelize from '../Models/index.js'
import fs from 'fs'
import { Op } from 'sequelize'

const modal = initModels(sequelize)

const getFoodDetailHandler = (req,res)=>{
    const idFood = req.params.idFood
    res.send('This is food that have an id: ' + idFood)
}

const getAllFoodHandler = (req,res)=>{
    res.send('This is a list of food')
}

const uploadFoodIMgHanler = async (req,res)=>{
    try{
        const { foodId } = req.params
        const currentFood = await modal.food.findOne({
            where:{
                food_id: foodId
            }
        })
        // console.log(currentFood)
        if(currentFood != null){
            const updatedFoodData = {
                ...currentFood,
                image: req.file.filename
            }
            await modal.food.update(updatedFoodData,{where: {food_id: foodId}})
            res.status(200).json({
                success: true,
                data: {...currentFood},
                msg: "Post image successful!"
            })
        }else{
            fs.unlink(process.cwd() + `/public/img/${req.file.filename}`,(err)=>{console.log(err)})
            res.status(400).send("Can not find food")
        }
    }catch{
        res.send("BE ERROR 500")
    }
}

export { getAllFoodHandler, getFoodDetailHandler, uploadFoodIMgHanler }