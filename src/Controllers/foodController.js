import initModels from '../Models/init-models.js'
import sequelize from '../Models/index.js'
import fs from 'fs'
import compressImages from "compress-images"
// import {serverError, reject, success} from "../Config/responseConfig.js"

const modal = initModels(sequelize)

const getFoodDetailHandler = (req, res) => {
    const idFood = req.params.idFood
    res.send('This is food that have an id: ' + idFood)
}

const getAllFoodHandler = (req, res) => {
    res.send('This is a list of food')
}

const uploadFoodIMgHanler = async (req, res) => {

    try {
        const { foodId } = req.params
        const currentFood = await modal.food.findOne({
            where: {
                food_id: foodId
            }
        })
        if (currentFood != null) {
            await compressImages(`${process.cwd()}/public/img/${req.file.filename}`,
                `./public/file/`,
                { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                function (error, completed, statistic) {
                    console.log("-------------");
                    console.log(error);
                    console.log(completed);
                    console.log(statistic);
                    console.log("-------------");
                    fs.unlink(process.cwd() + `/public/img/${req.file.filename}`, (err) => { console.log(err) })
                }
            );
            const updatedFoodData = {
                ...currentFood,
                image: req.file.filename
            }
            await modal.food.update(updatedFoodData, { where: { food_id: foodId } })
            res.status(200).json({
                success: true,
                data: req.file.filename,
                msg: "Post image successful!"
            })
        } else {
            fs.unlink(process.cwd() + `/public/img/${req.file.filename}`, (err) => { console.log(err) })
            res.status(400).send("Can not find food")
        }
    } catch {
        res.send("BE ERROR 500")
    }
}
const getFoodListlHandler = async (req, res) => {
    try {
        const { pageSize, pageIndex } = req.params
        const index = (pageIndex - 1) * pageSize
        const listFood = await modal.food.findAll({
            limit: +pageSize,
            offset: index
        })
        res.status(200).send(listFood)
    } catch {
        res.send("BE ERROR 500")
    }
}

export { getAllFoodHandler, getFoodDetailHandler, uploadFoodIMgHanler, getFoodListlHandler }