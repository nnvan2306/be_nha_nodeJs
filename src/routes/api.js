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
import stadiumController from "../controller/stadiumController";
import standController from "../controller/standController";
import {
    upload,
    uploadAvatar,
    uploadMatch,
    uploadStadium,
} from "../middleware/multer";

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

    //stadium
    router.post(
        "/create-stadium",
        uploadStadium.single("file"),
        stadiumController.handleCreateStadium
    );
    router.get("/get-stadium", stadiumController.handleGetStadium);
    router.delete("/delete-stadium", stadiumController.handleDeleteStadium);
    router.put(
        "/update-stadium",
        uploadStadium.single("file"),
        stadiumController.handleUpdateStadium
    );

    //stand
    router.post("/create-stand", standController.handleCreateStand);
    router.delete("/delete-stand", standController.handleDeleteStand);
    router.get("/get-stand", standController.handleGetStand);
    router.put("/update-stand", standController.handleUpdateStand);

    //calendar
    router.post("/create-calendar", calendarController.handleCreateCalendar);
    router.get("/get-calender", calendarController.handleGetCalendar);
    router.delete("/delete-calendar", calendarController.handleDeleteCalendar);
    router.put("/update-calendar", calendarController.handleUpdateCalendar);
    router.get(
        "/get-nearest-calendar",
        calendarController.handleGetNearestCalendar
    );

    // ticket
    router.post("/create-ticket", ticketController.handleCreateTicket);
    router.put("/update-ticket", ticketController.handleUpdateTicket);
    router.patch(
        "/update-booking-ticket",
        ticketController.handleUpdateBookingTicket
    );
    router.delete("/delete-ticket", ticketController.handleDeleteTicket);
    router.delete("/delete-all-ticket", ticketController.handleDeleteAllTicket);
    router.get("/get-ticket", ticketController.handleGetTicket);

    return app.use("/v1", router);
};

export default initApiRoutes;
