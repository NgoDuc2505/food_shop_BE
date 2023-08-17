import initModels from '../Models/init-models.js'
import sequelize from '../Models/index.js'
import { Op } from 'sequelize'


const modal = initModels(sequelize)


const getUserHandler = async (req, res) => {
    try {
        let data = await modal.users.findAll()
        res.send(data)
    } catch {
        res.send('BE Error 500')
    }
}

const getUserByIdHandler = async (req, res) => {
    const id = req.params.user_id
    try {
        let data = await modal.users.findAll({
            where: {
                user_id: id,
            }
        })
        res.send(data)
    } catch {
        res.send('BE Error 500')
    }
}

const deleteUserHandler = async (req, res) => {
    const id = req.params.user_id
    try {
        await modal.users.destroy({
            where: {
                user_id: id
            }
        })
        res.send({
            message: "Xoa thanh cong"
        })
    } catch {
        res.send('BE Error 500')
    }
}

const createUserHandler = async (req, res) => {
    const { full_name, email, password } = req.body
    try {
        const data = await modal.users.findAll({
            where: {
                email: email
            }
        })
        if (data.length === 0) {
            const createData = await modal.users.create(
                { full_name, email, password },
                { fields: ["full_name", "email", "password"] }
            )
            res.status(201).json({
                success: true,
                data: {
                    ...createData
                },
                msg: `${createData.full_name} has been successfully created.`
            })
        } else {
            res.send("Trung email roi!!")
        }
    } catch (error) {
        res.send(`BE Error 500 : ${error.errors[0].message ? error.errors[0].message : ''}`)
    }
}

const updateUserHandler = async (req, res) => {
    const { user_id } = req.params
    try {
        let currentUser = await modal.users.findOne({
            where: {
                user_id: user_id
            }
        })
        const checkEmail = await modal.users.findAll({
            where: {
                email: req.body.email
            }
        })
        if (checkEmail.length === 0) {
            const newData = { ...currentUser.dataValues, ...req.body }
            await modal.users.update(newData, {
                where: {
                    user_id: user_id
                }
            })
            res.status(200).json({
                success: true,
                data: { ...newData },
                msg: "Update completely"
            })

        } else if (checkEmail[0].user_id != user_id) {
            res.status(400).json({
                success: false,
                data: { id: "undefined" },
                msg: "Error!"
            })

        } else if (checkEmail[0].user_id == user_id) {
            const newData = { ...currentUser.dataValues, ...req.body }
            await modal.users.update(newData, {
                where: {
                    user_id: user_id
                }
            })
            res.status(200).json({
                success: true,
                data: { ...newData },
                msg: "Update completely"
            })
        }

    } catch {
        res.send("BE ERROR 500")
    }
}

const getUserByName = async (req, res) => {
    const { name } = req.params
    try {
        const data = await modal.users.findAll({
            where: {
                full_name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        res.status(200).json({
            success: true,
            data,
            msg: "Completely"
        })
    } catch {
        req.status(500).send("BE Error 500")
    }
}

export { getUserHandler, getUserByIdHandler, deleteUserHandler, createUserHandler, updateUserHandler, getUserByName }