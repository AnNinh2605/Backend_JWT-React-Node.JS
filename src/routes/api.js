import express from "express";

const router = express.Router();

import apiController from '../controller/apiController'
/**
 * 
 * @param {*} app 
 */
const initApiRouters = (app) => {
    router.get('/getApi', apiController.getApi)
    router.post('/register', apiController.postRegister)

    return app.use('/api/v1', router);
}

export default initApiRouters;