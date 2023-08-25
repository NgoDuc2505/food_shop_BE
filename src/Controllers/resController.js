import initModels from "../Models/init-models.js"
import sequelize from "../Models/index.js"
import { serverError, rejected, success } from '../Config/responseConfig.js'


const modal = initModels(sequelize)

const generateDateFormat = () => {
    const dateRecord = new Date().getTime()
    return new Date(dateRecord).toISOString().replace("T", " ").substring(0, 19);
}

export const checkUser = async (id)=>{
    const isUserExit = await modal.users.findAll({
        where:{
            user_id: id
        }
    })
    return isUserExit
}

const setLikeHandler = async (req, res) => {
    try {
        const { userID, resID } = req.params
        const results = await modal.like_res.findAll({
            where: {
                res_id: resID,
                user_id: userID
            }
        })
        if (results.length == 0) {
            await modal.like_res.create(
                { res_id: resID, user_id: userID, date_like: generateDateFormat() },
                {
                    fields: ['res_id', 'user_id', 'date_like']
                })
            res.status(200).json({
                success: true,
                data: { userID, resID },
                msg: "Success like restaurant!"
            })
        } else {
            res.status(400).json({
                success: false,
                data: { userID, resID },
                msg: "User liked this restaurant before ! Navigate to unlike API"
            })
        }
    } catch {
        serverError(res)
    }
}

const unLikeHandler = async (req, res) => {
    try {
        const { userID, resID } = req.params
        const currentLikeRecord = await modal.like_res.destroy({
            where: {
                res_id: resID,
                user_id: userID
            }
        })
        success(res, "Success unlike restaurant!", { userID, resID })
    } catch {
        serverError(res)
    }
}

const getLikeByResHandler = async (req, res) => {
    try {
        const { resID } = req.params
        const currentRes = await modal.like_res.findAll({
            where: {
                res_id: resID
            },
            include: [{ model: modal.users, as: "user", attributes: { exclude: ['deletedAt', 'facebook_app_id', 'password'] }, required: true }],
            attributes: { exclude: ['user_id'] },
        })
        success(res, `success get list like by restaurant has id:${resID}`, currentRes)
    } catch {
        serverError(res)
    }
}

const getLikeByUserHandler = async (req, res) => {
    try {
        const { userID } = req.params
        let isUserExit
        await checkUser(userID).then((rs)=>{isUserExit = rs}) 
        if(isUserExit.length > 0){
            const currentUserLikedRes = await modal.like_res.findAll({
                where: {
                    user_id: userID
                },
                include: [{ model: modal.restaurants, as: "re"}],
                attributes: { exclude: ['res_id'] }
            })
            success(res, `success get list by user who owned id:${userID} `, currentUserLikedRes)
        }else{
            rejected(res,400,"User is not exits",[])
        }
    } catch {
        serverError(res)
    }
}

const setRateResHandler = async (req, res) => {
    try {
        const { userID, resID } = req.params
        const { amount } = req.body
        const results = await modal.rate_res.findAll({
            where: {
                res_id: resID,
                user_id: userID
            }
        })
        if (results.length == 0) {
            await modal.rate_res.create(
                {
                    res_id: resID,
                    user_id: userID,
                    amount,
                    date_rate: generateDateFormat()
                },
                {
                    fields: ['res_id', 'user_id', 'amount', 'date_rate']
                }
            )
            success(res, `success rate res `, { userID, resID })
        } else {
            rejected(res, 400, "User rated this restaurant before", { userID, resID })
        }
    } catch {
        serverError(res)
    }
}

const getRateByResHandler = async (req, res) => {
    try {
        const { resID } = req.params
        const currentRes = await modal.rate_res.findAll({
            where: {
                res_id: resID
            },
            include: [{ model: modal.users, as: "user", attributes: { exclude: ['deletedAt', 'facebook_app_id', 'password'] }, required: true }],
            attributes: { exclude: ['user_id'] }
        })
        success(res, `success get list rate by restaurant has id:${resID}`, currentRes)
    } catch {
        serverError(res)
    }
}

const getRateByUserHandler = async (req, res) => {
    try {
        const { userID } = req.params
        let isUserExits
        await checkUser(userID).then((rs)=>{isUserExits = rs})
        if(isUserExits.length > 0){
            const currentUserLikedRes = await modal.rate_res.findAll({
                where:{
                    user_id: userID
                },
                attributes :{exclude: ['res_id']},
                include :[{model: modal.restaurants, as:"re"}]
            })
            success(res,`success get rate by user who owned id:${userID} `,currentUserLikedRes)
        }else{
            rejected(res,400,"User is not exits", [])
        }
    } catch {
        serverError(res)
    }
}


export { setLikeHandler, unLikeHandler, getLikeByResHandler, getLikeByUserHandler, setRateResHandler, getRateByResHandler, getRateByUserHandler }