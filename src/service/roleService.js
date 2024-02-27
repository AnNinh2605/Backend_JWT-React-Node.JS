import db from '../models/index'

const createRoleService = async (role) => {
    try {
        //check if user has this route
        let currentRole = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persist = role.filter(({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2));
        if (persist.length === 0) {
            //if all route is existing
            return {
                EM: 'Route is existing',
                EC: 1,
                DT: []
            }
        }
        else {
            await db.Role.bulkCreate(persist);
            return {
                EM: `Create successful ${persist.length} new role`,
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}

const readRoleService = async () => {
    try {
        let allRole = await db.Role.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        return {
            EM: 'Get all role successful',
            EC: 0,
            DT: allRole
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}

const readUserPaginationService = async (page, limit) => {
    let offset = (page - 1) * limit;
    try {
        let { count, rows } = await db.User.findAndCountAll({
            limit: limit,
            offset: offset,
            attributes: ["id", "email", "username", "phone", "address", "sex"],
            include: [{ model: db.Group, attributes: ["name", "id"] }],
            order: [
                ['id', 'DESC'],
            ]
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRow: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: "Get all user and paginate successfull",
            EC: 0,
            DT: data
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}

const editRoleService = async (data) => {
    try {
        let findUser = await db.Role.findOne({
            where: {
                id: data.id,
            },
            raw: true
        })
        if (findUser) {
            await db.User.update(
                {
                    username: data.username,
                    address: data.address,
                    sex: data.sex,
                    groupId: data.group
                },
                {
                    where: { id: data.id }
                }
            )
            return ({
                EM: 'Update successfull',
                EC: 0
            })
        }
        else {
            return ({
                EM: 'User did not found',
                EC: 6
            })
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}

const deleteRoleService = async (id) => {
    try {
        let results = await db.Role.destroy({
            where: {
                id: id
            }
        })
        if (results) {
            return ({
                EM: "Delete role successfull",
                EC: 0,
                DT: ''
            })
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}
const roleByGroupService = async (groupId) => {
    try {
        let results = await db.Group.findOne({
            where: {
                id: groupId
            },
            include: {
                model: db.Role,
                attributes: ["id", "url"],
                through: { attributes: [] }
            }
        })
        if (results) {
            return ({
                EM: "Get role by group successful",
                EC: 0,
                DT: results
            })
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}
const assignRoleByGroupService = async (data) => {
    try {
        // delete all role
        await db.Group_Role.destroy({
            where: {
                groupId: +data.groupId
            }
        })
        // assign all new role
        let results = await db.Group_Role.bulkCreate(data.groupRoles)
        if (results) {
            return ({
                EM: "Assign new role successful",
                EC: 0,
                DT: []
            })
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}
module.exports = {
    createRoleService,
    readRoleService,
    editRoleService,
    deleteRoleService,
    roleByGroupService,
    assignRoleByGroupService
}