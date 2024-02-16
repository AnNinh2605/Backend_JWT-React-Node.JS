import userApiService from '../service/userApiService'
const createUser = async (req, res) => {
    try {
        let results = await userApiService.createUserService(req.body);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}
const readUser = async (req, res) => {
    try {
        let results = await userApiService.readUserService();
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}
const editUser = async (req, res) => {
    try {
        let results = await userApiService.editUserService(req.body);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        let results = await userApiService.deleteUserService(req.body.id);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}

module.exports = {
    createUser,
    readUser,
    editUser,
    deleteUser,
}