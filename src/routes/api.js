import express from "express";

const router = express.Router();

import apiController from '../controller/apiController'
import userApiController from '../controller/userApiController'
import groupApiController from '../controller/groupController'
import { checkUserCookie } from '../middleware/jwt'
/**
 * 
 * @param {*} app 
 */

const testMiddleware = (req, res, next) => {
    if (true) {

    }
    next();
}
const initApiRouters = (app) => {
    router.post('/register', apiController.postRegister)
    router.post('/login', apiController.postLogin)

    router.post('/user/create', userApiController.createUser)
    router.get('/user/read', checkUserCookie, userApiController.readUser)
    router.put('/user/edit', userApiController.editUser)
    router.delete('/user/delete/:id', userApiController.deleteUser)

    router.get('/group/read', groupApiController.readGroup)

    return app.use('/api/v1', router);
}

export default initApiRouters;