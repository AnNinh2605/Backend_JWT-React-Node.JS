import roleService from '../service/roleService'
const createRole = async (req, res) => {
    try {
        let results = await roleService.createRoleService(req.body);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT
        })
    } catch (e) {
        return res.status(200).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}

const readRole = async (req, res) => {
    try {
        let results = await roleService.readRoleService();
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

// const editRole = async (req, res) => {
//     try {
//         let results = await roleService.editUserService(req.body.id);
//         return res.status(200).json({
//             EM: results.EM,
//             EC: results.EC,
//             DT: results.DT
//         })
//     } catch (e) {
//         return res.status(500).json({
//             EM: 'Something wrong in server',
//             EC: 5,
//             DT: ''
//         })
//     }
// }

const deleteRole = async (req, res) => {
    try {
        let results = await roleService.deleteRoleService(req.body.id);
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
const roleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let results = await roleService.roleByGroupService(id);
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
    createRole,
    // editRole,
    readRole,
    deleteRole,
    roleByGroup
}