
//fulfilled
const success = (res, msg, content) => {
    return res.status(200).json({
        statusCode: 200,
        content,
        msg,
        date: new Date()
    })
}

//reject 400, 401, 402
const rejected = (res, statusCode, msg, content) =>{
    return res.status(400).json({
        statusCode,
        content,
        msg,
        date: new Date()
    })
}

//server error 500
const serverError = (res, msg ="BE ERROR 500") =>{
    return res.status(500).json({
        statusCode: 500,
        content: "",
        msg,
        date: new Date()
    })
}

export {serverError, rejected, success}