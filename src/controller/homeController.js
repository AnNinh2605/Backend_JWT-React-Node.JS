import userService from '../service/userServicec'

const getHomePage = async (req, res) => {
    let results = await userService.getAllUserService();
    return res.render('homePage.ejs', { results });
}

const createUserForm = async (req, res) => {
    let { email, username, password } = req.body;
    await userService.createUserService(email, username, password);
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    let id = req.params.id;
    await userService.deleteUserService(id);
    res.redirect('/');
}
// render view edit user confirm
const postEditUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let results = {};
    if (user && user.length >0 ){
        results = user[0];
    }
    res.render('editUser.ejs', { results });
}

const postConfirmEditUser = async (req, res) => {
    let { id, email, username } = req.body;
    await userService.editUserById(id, email, username);
    res.redirect('/');
}

module.exports = { getHomePage, createUserForm, postDeleteUser, postEditUser, postConfirmEditUser }