import bcrypt from 'bcryptjs';
import e from 'express';
const salt = bcrypt.genSaltSync(10);

const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createUserService = (email, username, password) => {
    let hashUserPassword = hashPassword(password);
    connection.query(
        `INSERT INTO users (email, username, password) VALUES(?, ?, ?)`, [email, username, hashUserPassword],
        function (err, results) {

        }
    );
}

const getAllUserService = () => {
    connection.query(
        `SELECT * FROM users`,
        function (err, results, fields) {
            if (err) {
                console.log("Error", err)
            }
            console.log("Check result ", results);
        }
    );
}
module.exports = { createUserService, getAllUserService }    