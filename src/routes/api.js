import express from "express";

const router = express.Router();

import apiController from '../controller/apiController'
import userApiController from '../controller/userApiController'
import groupApiController from '../controller/groupController'
import roleApiController from '../controller/roleController'
import { checkUserCookie, checkUserPermision } from '../middleware/jwt'
/**
 * 
 * @param {*} app 
 */

const initApiRouters = (app) => {
    router.all('*', checkUserCookie, checkUserPermision);
    // entry route
    router.post('/register', apiController.postRegister)
    router.post('/login', apiController.postLogin)
    router.post('/logout', apiController.postLogout)
    // get user account route
    router.get('/account', userApiController.getUserAccount)
    // user route
    router.get('/user/read', userApiController.readUser)
    router.post('/user/create', userApiController.createUser)
    router.put('/user/edit', userApiController.editUser)
    router.delete('/user/delete/:id', userApiController.deleteUser)
    // role route
    router.post('/role/create', roleApiController.createRole)
    router.get('/role/read', roleApiController.readRole)
    // router.put('/role/edit', roleApiController.editRole)
    router.delete('/role/delete', roleApiController.deleteRole)
    // role by group 
    router.get('/role/by-group/:groupId', roleApiController.roleByGroup)
    router.post('/role/assign-by-group', roleApiController.assignRoleByGroup)
    // group route
    router.get('/group/read', groupApiController.readGroup)

    return app.use('/api/v1', router);
}

export default initApiRouters;