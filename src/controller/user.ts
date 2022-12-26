import { Request, Response } from "express"
import { UserModel } from "../models/user"
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const validateRequest = (request: Request, actionType: string) => {

    const data = request.body;
    return actionType === 'create' ? (
        data.username &&
        data.password &&
        (data.username as string).trim() &&
        (data.password as string).trim()
    ) :(
        (data.username || data.password) &&
        ((data.username as string).trim() || (data.password as string).trim())
    )

}

const hashPassword = async (pass: string, salt: number = 7) => {

    const saltValue = await bcrypt.genSalt(salt)
    return await bcrypt.hash(pass, saltValue)
}

export const tokenGenerate = (tokenData: Record<string, unknown>) => {

    return jwt.sign({
        name: tokenData.username,
        access: ['add', 'edit', 'update', 'delete']

    }, 'no secret')
}

class User {


    async loginUser(req: Request, res: Response) {
        try {

            const findUser: any = await UserModel.findAll({
                where: {
                    username: { $eq: req.body.username }
                }
            })

            if (findUser.length === 0) return res.status(401).send({ message: 'Invalid username or password' })

            console.log(findUser[0])

            const isValid = await bcrypt.compare(req.body.password, String(findUser[0].password).trim())
            if(!isValid) return res.status(403).send({ message: 'Invalid password' })

            const token = tokenGenerate(findUser[0])
            
            res.header('access-token', token).status(200).send({
                message: 'Successfull logged-in'
            })

        } catch (error) {
            res.send({
                message: error
            })
        }



    }

    async getAllUser(req: Request, res: Response) {
        try {

            const response = await UserModel.findAll({
                limit: Number(req.query.limit),
                offset: Number(req.query.offset)
            })

            res.status(200).send({
                count: response.length,
                data: response
            })

        } catch (error) {
            res.status(500).send({
                message: error
            })
        }

    }

    async getOneUser(req: Request, res: Response) {
        try {

            const response = await UserModel.findAll({
                where: {
                    userId: { $eq: +req.params.id }
                }
            })

            if (response.length === 0) return res.status(201).send({ message: 'No data found' })

            res.status(200).send({
                data: response
            })

        } catch (error) {
            res.status(500).send({
                message: error
            })
        }


    }

    async createUser(req: Request, res: Response) {
        try {

            if (!validateRequest(req, 'create')) { return res.status(401).send({ message: 'send correct request data' }) }

            const findUser = await UserModel.findAll({
                where: {
                    username: { $eq: req.body.username }
                }
            })

            if (findUser.length > 0) { return res.send({ message: 'User already exists' }) }

            req.body.password = await hashPassword(req.body.password, 7)

            console.log(req.body.password)

            const response = await UserModel.create({ ...req.body })

            res.status(200).send({
                data: response
            })
        } catch (error) {
            console.log('error', error)
            res.status(500).send({
                message: error
            })
        }



    }

    async updateUser(req: Request, res: Response) {
        try {

            if (!validateRequest(req, 'update')) { return res.status(401).send({ message: 'send correct request data' }) }

            const findUser = await UserModel.findAll({
                where: {
                    userId: { $eq: +req.params.id }
                }
            })

            if (findUser.length === 0) { return res.send({ message: 'User does not exists' }) }

            if(req.body.password) req.body.password = hashPassword(req.body.password, 7)

            await UserModel.update({ ...req.body }, {
                where: {
                    userId: { $eq: +req.params.id }
                }
            })

            res.status(200).send({
                message: 'User data updated successfull'
            })
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }


    }

    async deleteUser(req: Request, res: Response) {
        try {
            await UserModel.destroy({
                where: {
                    userId: { $eq: +req.params.id }
                }
            })

            res.status(200).send(
                {
                    message: 'User deleted successfull'
                }
            )

        } catch (error) {
            res.status(500).send({
                message: error
            })
        }

    }
}

export default new User()