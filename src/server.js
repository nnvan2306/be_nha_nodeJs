import express from "express";
import testConnection from "./config/connectDb";
import initApiRoutes from "./routes/api";
import configCors from "./config/configCors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createCommentSocket } from "./service/socketComment";
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 8081;

// config cors
configCors(app);

//connect socket
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
});

io.on("connect", (socket) => {
    createCommentSocket(socket);
});

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
app.use("/v1/images", express.static(__dirname + "/public/avatarUsers"));

//init API routes
initApiRoutes(app);

http.listen(PORT, () => {
    console.log("backend is running on post :", PORT);
});
