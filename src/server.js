import express from "express";
import testConnection from "./config/connectDb";
import initApiRoutes from "./routes/api";
import configCors from "./config/configCors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
require("dotenv").config();
//test create socket
const http = require("http");
const server = http.createServer(app);

const app = express();
const PORT = process.env.PORT || 8081;

// config cors
configCors(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection
testConnection();

//config cookie-parser
app.use(cookieParser());

//public /images
app.use("/v1/images", express.static(__dirname + "/public/logoTeams"));
app.use("/v1/images", express.static(__dirname + "/public/avatarPlayers"));
app.use("/v1/images", express.static(__dirname + "/public/nhaImages"));
app.use("/v1/videos", express.static(__dirname + "/public/matchs"));
app.use("/v1/images", express.static(__dirname + "/public/stadiums"));

//init API routes
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("backend is running on post :", PORT);
});
