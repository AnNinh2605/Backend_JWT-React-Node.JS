import express from "express";

const router = express.Router();

import apiController from '../controller/apiController'
import userApiController from '../controller/userApiController'
import groupApiController from '../controller/groupController'
import { checkUserCookie, checkUserPermision } from '../middleware/jwt'
/**
 * 
 * @param {*} app 
 */

const initApiRouters = (app) => {
    router.all('*', checkUserCookie, checkUserPermision);

    router.post('/register', apiController.postRegister)
    router.post('/login', apiController.postLogin)
    // api get user account
    router.get('/account', userApiController.getUserAccount)

    router.get('/user/read', userApiController.readUser)
    router.post('/user/create', userApiController.createUser)
    router.put('/user/edit', userApiController.editUser)
    router.delete('/user/delete/:id', userApiController.deleteUser)

    router.get('/group/read', groupApiController.readGroup)

    return app.use('/api/v1', router);
}

export default initApiRouters;