import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateJWT = (payload) =>{
    let token = null
    const key = process.env.SECRET_KEY
    try{
       token = jwt.sign(payload,key,{expiresIn: "10m"})
    }catch(err){
        console.log(err)
    }
    return token
}

const verifyToken = (token) =>{
    let isVerify = null
    const key = process.env.SECRET_KEY
    try{
        isVerify = jwt.verify(token,key)
    }catch(error){
        console.log(error)
    }
    return isVerify
}

export { generateJWT, verifyToken }