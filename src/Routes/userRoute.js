import express from 'express'
import { getUserHandler, getUserByIdHandler, deleteUserHandler, createUserHandler, updateUserHandler, getUserByName, facebookLoginHandler, loginHandler } from '../Controllers/userController.js'
//check token
import {verifyToken} from '../Config/jwtConfig.js'
const userRoute = express.Router()

userRoute.get('/getUser',(req,res,next)=>{
    const token = req.headers.token
    const isVerify = verifyToken(token)
    if(isVerify){
        isVerify.role == 'USER' ? next() : res.status(400).send("You're not permit to access!")
    }else{
        res.status(400).send("Invalid token or expired")
    }
} ,getUserHandler)
userRoute.get('/getUserDetail/:user_id', getUserByIdHandler)
userRoute.delete('/deleteUser/:user_id', deleteUserHandler)
userRoute.post('/createUser', createUserHandler)
userRoute.put('/updateUser/:user_id', updateUserHandler)
userRoute.get('/getUserByName/:name', getUserByName)
userRoute.get('/facebookLogin/:uID', facebookLoginHandler)
userRoute.post('/login', loginHandler)
export default userRoute