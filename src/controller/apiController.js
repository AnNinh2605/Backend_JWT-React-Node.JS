import loginService from '../service/loginService';
const getApi = (req, res) => {
    res.status(200).json({
        message: "apicheck",
        date: "check data"
    })
}
const postRegister = async (req, res) => {
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
        let data = await loginService.creatUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    }
}
module.exports = { getApi, postRegister }