import db from '../models/index'
const createUserService = async (data) => {
    try {
        await db.User.create({
            email: data.email,
            username: data.username,
            password: data.password,
            phone: data.phone
        });
        return ({
            EM: "Create user successfull",
            EC: 0,
            DT: ''
        })
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}

const readUserService = async () => {
    try {
        let results = await db.User.findAll(
            {
                attributes: ["id", "email", "username", "phone", "address", "sex"],
                include: [{ model: db.Group, attributes: ["name"] }]
            }
        );
        if (results) {
            return ({
                EM: "Get all user successfull",
                EC: 0,
                DT: results
            })
        }
        else {
            return ({
                EM: "Get all user successfull",
                EC: 0,
                DT: []
            })
        };
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
            include: [{ model: db.Group, attributes: ["name"] }]
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRow : count,
            totalPages : totalPages,
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

const editUserService = async (data) => {
    try {
        let findUser = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (findUser) {
            let results = await db.update(
                {
                    // email: data.email,
                    // username: data.username,
                    // password: data.password,
                    // phone: data.phone
                },
                {
                    where: { id: id }
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

const deleteUserService = async (id) => {
    try {
        let results = await db.User.destroy({
            where: {
                id: id
            }
        })
        if (results) {
            return ({
                EM: "Delete user successfull",
                EC: 0,
                DT: ''
            })
        }
        console.log("check results", results);
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 6
        })
    }
}

module.exports = {
    createUserService,
    readUserService,
    readUserPaginationService,
    editUserService,
    deleteUserService
}