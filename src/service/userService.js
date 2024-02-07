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
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows;
    } catch (e) {
        return e;
    }
}

const deleteUserService = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`DELETE FROM user WHERE id = ?`, [id]);
        return rows;
    } catch (e) {
        return e;
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM user WHERE id = ?`, [id]);
        return rows;
    } catch (e) {
        return e;
    }
}

const editUserById = async (id, email, username) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`UPDATE user SET email = ?, username = ?  WHERE id = ?`, [email, username, id]);
    } catch (e) {
        return e;
    }
}
module.exports = { createUserService, getAllUserService, deleteUserService, getUserById, editUserById }    