import express from "express";

const router = express.Router();

import homeController from '../controller/homeController'
/**
 * 
 * @param {*} app 
 */
const initWebRouters = (app) => {
    router.get('/', homeController.getHomePage)
    router.post('/createUser', homeController.createUserForm)

    return app.use('/', router);
}

export default initWebRouters;