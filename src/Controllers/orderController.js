import { serverError, rejected, success } from '../Config/responseConfig.js'
import initModels from "../Models/init-models.js"
import sequelize from "../Models/index.js"
import {checkUser} from './resController.js'


const modal = initModels(sequelize)

const orderPostHandler = async (req, res) => {
    try{
        const { userID, foodID } = req.params
        let isUserExit
        await checkUser(userID).then((rs)=>{isUserExit= rs})
        if(isUserExit.length > 0){
            const { amount,code,arr_sub_id, } = req.body
            const data = {
                user_id: +userID,
                food_id: +foodID,
                amount,
                code,
                arr_sub_id,
            }
            await modal.orders.create({...data},{fields: ['user_id','food_id','amount','code','arr_sub_id']})
            success(res, "Order successful",data)
        }else{
            rejected(res,400,"User is not exits",[])
        }
    }catch{
        serverError(res)
    }
}

export { orderPostHandler }