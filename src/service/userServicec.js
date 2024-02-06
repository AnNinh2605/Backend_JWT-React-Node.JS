import bcrypt from 'bcryptjs';
import express from 'express';
const salt = bcrypt.genSaltSync(10);

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
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`INSERT INTO users (email, username, password) VALUE(?,?,?)`, [email, username, hashUserPassword]);
        return rows;
    } catch (e) {
        return e;
    }
}

const getAllUserService = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        return e;
    }
}

const deleteUserService = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return rows;
    } catch (e) {
        return e;
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows;
    } catch (e) {
        return e;
    }
}

const editUserById = async (id, email, username) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt' });
    try {
        const [rows, fields] = await connection.execute(`UPDATE users SET email = ?, username = ?  WHERE id = ?`, [email, username, id]);
    } catch (e) {
        return e;
    }
}
module.exports = { createUserService, getAllUserService, deleteUserService, getUserById, editUserById }    