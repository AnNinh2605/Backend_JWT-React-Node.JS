import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const Sequelize = require('sequelize');
require("dotenv").config();
const Op = Sequelize.Op;

import { findGroupRole } from './JWTService'
import { createJWT } from '../middleware/jwt'

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
const decryptPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword); // true
}

const creatUseService = async (userData) => {
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
                phone: userData.phone,
                groupId: 4
            });

            return ({
                EM: 'Create new user successfully',
                EC: 0
            })
        }
    } catch (e) {
        console.log("Error ", e)
        return ({
            EM: 'Something wrong in server',
            EC: 5
        })
    }
}

const loginService = async (userData) => {
    try {
        let results = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: userData.value },
                    { phone: userData.value }
                ]
            },
            raw: true
        })
        if (results) {
            let dataPassword = results.password;
            let checkMatchPassword = decryptPassword(userData.password, dataPassword)
            if (checkMatchPassword === true) {
                let groupRole = await findGroupRole(results.groupId);
                let payload = {
                    email: results.email,
                    groupRole,
                    expiresIn: process.env.JWT_EXPIRES_IN
                };
                let token = createJWT(payload)
                return ({
                    EM: 'Login successfully',
                    EC: '0',
                    DT: {
                        access_token: token,
                        groupRole
                    }
                })
            }
            else {
                return ({
                    EM: 'Email/phone or password is wrong',
                    EC: 3
                })
            }
        }
        else {
            console.log("not found user with password/ phone: ", userData.value);
            return ({
                EM: 'Email or phone is not existing',
                EC: 3
            })
        }
    } catch (e) {
        console.log("Error ", e)
        return ({
            EM: 'Something wrong in database',
            EC: 5
        })
    }
}
module.exports = { creatUseService, loginService, findEmail, findPhone, hashPassword }