import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import 'dotenv/config'
const bodyParser = require('body-parser');

const app = express();

// bodyParse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRouters(app);
const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})