import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ['/register', '/login', '/logout'];

const createJWT = (payload) => {
    let key = process.env.JWT_KEY;
    try {
        let token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return token;
    } catch (error) {
        console.log(error)
    }
}

const verifyToken = (token) => {
    let key = process.env.JWT_KEY;
    let decoded = null;
    try {
        let check = jwt.verify(token, key)
        decoded = check;
    } catch (err) {
        console.log(err)
    }
    return decoded;
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkUserCookie = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let userCookie = req.cookies;
    let tokenFromHeader = extractToken(req);
    if ((userCookie && userCookie.cookie) || tokenFromHeader) {
        let token = userCookie && userCookie.cookie ? userCookie.cookie: tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded; //set cookie for the next request
            req.token = token; // reset token
            next();
        }
        else {
            return res.status(401).json({
                EC: -4,
                DT: '',
                EM: "Not authenticated the user"
            })
        }
    }
    else {
        return res.status(401).json({
            EC: -4,
            DT: '',
            EM: "Not authenticated the user"
        })
    }
}

const checkUserPermision = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    if (req.user) {
        let groupRole = req.user.groupRole.Roles;
        let currentUrl = req.path;
        if (!groupRole || groupRole.length < 0) {
            return res.status(403).json({
                EC: -4,
                DT: '',
                EM: "You do not have permission to access this resources"
            })
        }
        let canAccess = groupRole.some(item => item.url === currentUrl);
        if (canAccess) {
            next();
        }
        else {
            return res.status(403).json({
                EC: -4,
                DT: '',
                EM: "You do not have permission to access this resources"
            })
        }
    }
    else {
        return res.status(401).json({
            EC: -4,
            DT: '',
            EM: "Not authenticated the user"
        })
    }
}
module.exports = { createJWT, verifyToken, checkUserCookie, checkUserPermision } 