import db from '../models/index'

const readGroupService = async () => {
    try {
        let results = await db.Group.findAll({
            order: [
                ['name', 'ASC'],
            ]
        });
        if (results) {
            return ({
                EM: "Get all group successfull",
                EC: 0,
                DT: results
            })
        }
    } catch (error) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}
module.exports = { readGroupService }