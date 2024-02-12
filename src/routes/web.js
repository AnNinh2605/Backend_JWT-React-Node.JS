import express from "express";

const router = express.Router();

import homeController from '../controller/homeController'
import apiController from '../controller/apiController'
/**
 * 
 * @param {*} app 
 */
const initWebRouters = (app) => {
    router.get('/', homeController.getHomePage)
    router.post('/createUser', homeController.createUserForm)
    router.post('/deleteUser/:id', homeController.postDeleteUser)
    router.post('/editUser/:id', homeController.postEditUser)
    router.post('/postConfirmEditUser', homeController.postConfirmEditUser)

    router.get('/getApi', apiController.getApi)

    return app.use('/', router);
}

export default initWebRouters;