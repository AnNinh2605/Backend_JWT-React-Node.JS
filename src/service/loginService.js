import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const findEmail = async (email) => {
    let result = await db.User.findOne({
        where: {
            email: email
        }
    })
    if (result) {
        return true;
    }
    return false;
}
const findPhone = async (phone) => {
    let result = await db.User.findOne({
        where: {
            phone: phone
        }
    })
    if (result) {
        return true;
    }
    return false
}
const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const creatUser = async (userData) => {
    try {
        let checkEmail = await findEmail(userData.email);
        let checkPhone = await findPhone(userData.phone);
        if (checkEmail) {
            return ({
                EM: "Email is existing",
                EC: 2
            })
        }
        if (checkPhone) {
            return ({
                EM: "Phone number is existing",
                EC: 2
            })
        }
        else {
            let hashPass = hashPassword(userData.password);
            await db.User.create({
                email: userData.email,
                username: userData.username,
                password: hashPass,
                phone: userData.phone
            });

            return ( {
                EM: 'Create new user successfully',
                EC: 0
            })
        }
    } catch (e) {
        console.log("Error ", e)
        return ( {
            EM: 'Something wrong in server',
            EC: 5
        })
    }
}
module.exports = { creatUser }