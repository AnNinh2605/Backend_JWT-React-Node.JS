import loginService from '../service/loginService';

const getApi = (req, res) => {
    res.status(200).json({
        message: "apicheck",
        date: "check data"
    })
}
const postRegister = async (req, res) => {
    try {
        let { email, username, password, phone } = req.body;
        if (!email || !username || !password || !phone) {
            return res.status(200).json({
                EM: 'Missing required parameter',
                EC: '1',
                DT: ''
            })
        }
        if (password && password.length < 8) {
            return res.status(200).json({
                EM: 'Password must have at least 8 letters',
                EC: '1',
                DT: ''
            })
        }
        else {
            let data = await loginService.creatUseService(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: ''
            })
        }
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}

const postLogin = async (req, res) => {
    try {
        let data = await loginService.loginService(req.body);
        if (data && data.DT.access_token){
            // set cookies
            res.cookie("cookie", data.DT.access_token, { httpOnly: true, maxAge: 3600000 })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(200).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}
module.exports = { getApi, postRegister, postLogin }