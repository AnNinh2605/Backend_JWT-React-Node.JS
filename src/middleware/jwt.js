import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
    let key = process.env.JWT_KEY;
    try {
        let token = jwt.sign(payload, key);
        return token;
    } catch (error) {
        console.log(error)
    }
}

const verifyToken = (token) => {
    let key = process.env.JWT_KEY;
    let data = null;
    try {
        let checkToken = jwt.verify(token, key)
        data = checkToken;
        return data;
    } catch (err) {
        console.log(err)
    }
}

const checkUserCookie = (req, res, next) => {
    let userCookie = req.cookies;
    if (userCookie && userCookie.cookie) {
        console.log("my cookes", userCookie.cookie);
        // next();
    }
    else {
        return res.status(401).json({
            EC: -4,
            DT: '',
            EM: "Not authenticated the user"
        })
    }
}

module.exports = { createJWT, verifyToken, checkUserCookie } 