const getApi = (req, res) => {
    res.status(200).json({
        message: "apicheck",
        date: "check data"
    })
}
module.exports = { getApi }