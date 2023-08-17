import express from 'express'
import { getUserHandler, getUserByIdHandler, deleteUserHandler, createUserHandler, updateUserHandler, getUserByName} from '../Controllers/userController.js'

const userRoute = express.Router()

userRoute.get('/getUser', getUserHandler)
userRoute.get('/getUserDetail/:user_id', getUserByIdHandler)
userRoute.delete('/deleteUser/:user_id', deleteUserHandler)
userRoute.post('/createUser', createUserHandler)
userRoute.put('/updateUser/:user_id', updateUserHandler)
userRoute.get('/getUserByName/:name', getUserByName)


export default userRoute