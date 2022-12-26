import newUser from '../controller/user'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token:string = req.headers['access-token'] as string 

        if(!token) return res.status(401).send({ message: 'Unauthorized user'})
        if(jwt.verify(token, 'no secret')) next()
        
    } catch (error) {

        res.send({
            message: error
        })
    }

}

export function appRoutes(app: any) {
    const route = app.Router()

    route.post('/api/create-user', newUser.createUser)
    route.post('/api/login-user', newUser.loginUser)

    route.get('/api/list-users', validateToken, newUser.getAllUser).get('/api/user/:id', validateToken, newUser.getOneUser)
    route.put('/api/update-user/:id', validateToken,newUser.updateUser)
    route.delete('/api/delete-user/:id', validateToken, newUser.deleteUser)

    return route
}