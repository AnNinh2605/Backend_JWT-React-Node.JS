import db from '../models/index'
const findGroupRole = async (groupId) => {
    try {
        let results = await db.Group.findOne({
            where: {
                id: groupId,
            },
            attributes: ["id", "name", "description"],
            include: [{
                model: db.Role,
                attributes: ["id", "url"],
                through: { attributes: [] }
            }],
        });
        return results ? results : {}
    } catch (e) {
        console.log("Error ", e)
        return ({
            EM: 'Something wrong in database',
            EC: 5
        })
    }
}
module.exports = { findGroupRole }