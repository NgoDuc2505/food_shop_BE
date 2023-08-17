import initModels from "../Models/init-models.js"
import sequelize from "../Models/index.js"

const modal = initModels(sequelize)

const generateDateFormat = () => {
    const dateRecord = new Date().getTime()
    return new Date(dateRecord).toISOString().replace("T", " ").substring(0, 19);
}

const handleFindUser = async (table,compareValue) =>{
    const result = await table.findAll({
        where: {
            user_id : compareValue
        }
    })
    return result
}

const handleFindRes = async (table,compareValue) =>{
    const result = await table.findAll({
        where: {
            res_id : compareValue
        }
    })
    return result
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
                { fields: ['res_id', 'user_id', 'date_like'] 
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
        res.status(500).send("BE ERROR 500")
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
        res.status(200).json({
            success: true,
            data: { userID, resID },
            msg: "Success unlike restaurant!"
        })
    } catch {
        res.status(500).send("BE ERROR 500")
    }
}

const getLikeByResHandler = async (req, res) => {
    try {
        const { resID } = req.params
        const currentRes = await handleFindRes(modal.like_res, resID)
        res.status(200).json({
            success: true,
            data: currentRes,
            msg: `success get list like by restaurant has id:${resID}`
        })
    } catch {
        res.status(500).send("BE ERROR 500")
    }
}

const getLikeByUserHandler = async (req, res) => {
    try {
        const { userID } = req.params
        const currentUserLikedRes = await handleFindUser(modal.like_res, userID)
        res.status(200).json({
            success: true,
            data: currentUserLikedRes,
            msg: `success get list by user who owned id:${userID} `
        })
    } catch {
        res.status(500).send("BE ERROR 500")
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
            res.status(200).json({
                success: true,
                data: { userID, resID },
                msg: `success rate res `
            })
        } else {
            res.status(400).json({
                success: false,
                data: { userID, resID },
                msg: "User rated this restaurant before"
            })
        }
    } catch {
        res.status(500).send("BE ERROR 500")
    }
}

const getRateByResHandler = async (req, res) => {
    try {
        const { resID } = req.params
        const currentRes = await handleFindRes(modal.rate_res, resID)
        res.status(200).json({
            success: true,
            data: currentRes,
            msg: `success get list rate by restaurant has id:${resID}`
        })
    } catch {
        res.status(500).send("BE ERROR 500")
    }
}

const getRateByUserHandler = async (req, res) => {
    try {
        const { userID } = req.params
        const currentUserLikedRes = await handleFindUser(modal.rate_res, userID)
        res.status(200).json({
            success: true,
            data: currentUserLikedRes,
            msg: `success get rate by user who owned id:${userID} `
        })
    } catch {
        res.status(500).send("BE ERROR 500")
    }
}


export { setLikeHandler, unLikeHandler, getLikeByResHandler, getLikeByUserHandler, setRateResHandler, getRateByResHandler, getRateByUserHandler }