import userService from '../service/userServicec'

const getHomePage = (req, res) => {
    return res.render('homePage.ejs');
}

const createUserForm = (req, res) => {
    let { email, username, password } = req.body;
    userService.createUserService(email, username, password);
    res.send("Create successful")
}

module.exports = { getHomePage, createUserForm }