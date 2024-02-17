import express from "express";

const router = express.Router();

import apiController from '../controller/apiController'
import userAPIController from '../controller/userApiController'
/**
 * 
 * @param {*} app 
 */
const initApiRouters = (app) => {
    router.get('/getApi', apiController.getApi)
    router.post('/register', apiController.postRegister)
    router.post('/login', apiController.postLogin)

    router.post('/user/create', userAPIController.createUser)
    router.get('/user/read', userAPIController.readUser)
    router.put('/user/edit', userAPIController.editUser)
    router.delete('/user/delete/:id', userAPIController.deleteUser)

    return app.use('/api/v1', router);
}

export default initApiRouters;