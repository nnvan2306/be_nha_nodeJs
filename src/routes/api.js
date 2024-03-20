import express from "express";
import userController from "../controller/userController";
import seasonController from "../controller/seasonController";
import teamController from "../controller/teamController";
import ratingController from "../controller/ratingController";
import {
    deletePlayer,
    handleCreatePlayer,
    handleGetPlayerActive,
    handleGetOnePlayer,
    handleGetPlayers,
    handleSearchPlayer,
    handleUpdatePlayer,
} from "../controller/playerController";
import { upload, uploadAvatar, uploadMatch } from "../middleware/multer";
import {
    deleteStatistic,
    handleCreateStatistic,
    handleGetStatisticPlayer,
    handleUpdateStatistic,
    handleGetStatisticSeason,
} from "../controller/statisticController";
import matchController from "../controller/matchController";
import scoredController from "../controller/scoredController";
import jwtAction from "../middleware/jwtAction";
import scored from "../models/scored";

const router = express.Router();

const initApiRoutes = (app) => {
    // router.all("*", jwtAction.handleCheckToken);

    router.get("/refresh-token", userController.handleRefreshToken);
    router.post("/register", userController.handleRegister);
    router.post("/login", userController.handleLogin);

    // season
    router.post("/create-season", seasonController.handleCreateSeason);
    router.get("/get-season", seasonController.handleGetLimitSeasons);
    router.delete("/delete-season", seasonController.handleDeleteSeason);
    router.put("/update-season", seasonController.handleUpdateSeason);

    //team
    router.post(
        "/create-team",
        upload.single("file"),
        teamController.handleCreateTeam
    );
    router.get("/get-team", teamController.handleGetTeam);
    router.delete("/delete-team", teamController.handleDeleteTeam);
    router.put(
        "/update-team",
        upload.single("file"),
        teamController.handleUpdateTeam
    );
    router.post("/search-team", teamController.handleSearchTeam);

    // player
    router.post(
        "/create-player",
        uploadAvatar.single("file"),
        handleCreatePlayer
    );
    router.get("/get-player", handleGetPlayers);
    router.delete("/delete-player", deletePlayer);
    router.put(
        "/update-player",
        uploadAvatar.single("file"),
        handleUpdatePlayer
    );
    router.get("/search-player", handleSearchPlayer);
    router.get("/get-player-active", handleGetPlayerActive);
    router.get("/get-one-player", handleGetOnePlayer);

    //Statistic
    router.post("/create-statistic", handleCreateStatistic);
    router.get("/get-statistic-player", handleGetStatisticPlayer);
    router.put("/update-statistic", handleUpdateStatistic);
    router.delete("/delete-statistic", deleteStatistic);
    router.get("/get-statistic-season", handleGetStatisticSeason);

    // rating
    router.post("/create-rating", ratingController.handleCreateRating);
    router.get("/get-rating", ratingController.handleGetRating);
    router.delete("/delete-rating", ratingController.handleDeleteRating);
    router.put("/update-rating", ratingController.handleUpdateRating);

    // match
    // router.get("/get-match", handleGetMatch);
    router.post(
        "/create-match",
        uploadMatch.single("file"),
        matchController.handleCreateMatch
    );
    router.get("/get-match", matchController.handleGetMatch);
    router.delete("/delete-match", matchController.handleDeleteMatch);
    router.put(
        "/update-match",
        uploadMatch.single("file"),
        matchController.handleUpdateMatch
    );
    router.get("/search-match", matchController.handleSearchMatch);
    router.get("/get-match-by-id", matchController.handleGetMAtchById);

    //scored
    router.get("/get-scored", scoredController.handleGetScored);
    router.delete("/delete-scored", scoredController.handleDeleteScored);
    router.post("/create-scored", scoredController.handleCreateScored);
    router.put("/update-scored", scoredController.handleUpdateScored);

    return app.use("/v1", router);
};

export default initApiRoutes;
