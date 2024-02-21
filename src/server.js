import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
import configCORS from "./controller/configCORS";
import 'dotenv/config'
import cookieParser from 'cookie-parser';


// import connection from "./config/databaseConnection";
const app = express();

// bodyParse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//fix CORS error
configCORS(app);
// config cookies parse
app.use(cookieParser())


configViewEngine(app);
initWebRouters(app);
initApiRouters(app);
const PORT = process.env.PORT || 8002;

app.use((req, res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})