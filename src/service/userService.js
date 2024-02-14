import bcrypt from 'bcryptjs';
import express from 'express';
const salt = bcrypt.genSaltSync(10);
import db from '../models/index.js'

const mysql = require('mysql2/promise');
// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createUserService = async (email, username, password) => {
    let hashUserPassword = hashPassword(password);
    try {
        await db.User.create({
            email: email,
            username: username,
            password: hashUserPassword
        })
    } catch (e) {
        return e;
    }
}

const getAllUserService = async () => {
    // let results = await db.User.findAll({
    //     where: { id: 1 },
    //     attributes: ["email", "username"],
    //     include: { model: db.Group, attributes: ["name", "description"] },
    //     raw: true,
    //     nest: true
    // });
    // console.log(results)
    try {
        let results = await db.User.findAll();
        return results;
    } catch (e) {
        return e;
    }
}

const deleteUserService = async (id) => {
    try {
        await db.User.destroy({
            where: { id: id }
        })
    } catch (e) {
        return e;
    }
}

const getUserById = async (id) => {
    try {
        let results = await db.User.findOne({
            where: {
                id: id
            }
        })
        return results;
    } catch (e) {
        return e;
    }
}

const editUserById = async (id, email, username) => {
    try {
        await db.User.update(
            {
                email: email,
                username: username
            },
            {
                where: { id: id }
            })
    } catch (e) {
        return e;
    }
}
module.exports = { createUserService, getAllUserService, deleteUserService, getUserById, editUserById }    