import express from "express";
import userController from "../controller/userController";
import seasonController from "../controller/seasonController";
import teamController from "../controller/teamController";
import ratingController from "../controller/ratingController";
import playerController from "../controller/playerController";
import statisticController from "../controller/statisticController";
import matchController from "../controller/matchController";
import scoredController from "../controller/scoredController";
import calendarController from "../controller/calendarController";
import ticketController from "../controller/ticketController";
import { upload, uploadAvatar, uploadMatch } from "../middleware/multer";

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
        playerController.handleCreatePlayer
    );
    router.get("/get-player", playerController.handleGetPlayers);
    router.delete("/delete-player", playerController.handleDeletePlayer);
    router.put(
        "/update-player",
        uploadAvatar.single("file"),
        playerController.handleUpdatePlayer
    );
    router.get("/search-player", playerController.handleSearchPlayer);
    router.get("/get-player-active", playerController.handleGetPlayerActive);
    router.get("/get-one-player", playerController.handleGetOnePlayer);
    router.get(
        "/get-player-season",
        playerController.handleGetPlayerDetailSeason
    );

    //Statistic
    router.post("/create-statistic", statisticController.handleCreateStatistic);
    router.get(
        "/get-statistic-player",
        statisticController.handleGetStatisticPlayer
    );
    router.put("/update-statistic", statisticController.handleUpdateStatistic);
    router.delete("/delete-statistic", statisticController.deleteStatistic);
    router.get(
        "/get-statistic-season",
        statisticController.handleGetStatisticSeason
    );

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

    //calendar
    router.post("/create-calendar", calendarController.handleCreateCalendar);
    router.get("/get-calender", calendarController.handleGetCalendar);
    router.delete("/delete-calendar", calendarController.handleDeleteCalendar);
    router.put("/update-calendar", calendarController.handleUpdateCalendar);

    // ticket
    router.post("/create-ticket", ticketController.handleCreateTicket);

    return app.use("/v1", router);
};

export default initApiRoutes;
