import groupService from '../service/groupService'
const readGroup = async(req, res) => {
    try {
        let results = await groupService.readGroupService();
        if (results) {
            return res.status(200).json({
                EM: results.EM,
                EC: results.EC,
                DT: results.DT
            })
        }
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}

module.exports = { readGroup }