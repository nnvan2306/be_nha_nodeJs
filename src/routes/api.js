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
import billController from "../controller/billController";
import emailController from "../controller/emailController";
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
    router.post("/logout", userController.handleLogout);
    router.post("/check-role-admin", jwtAction.handleCheckRoleAdmin);

    //
    //
    // season
    router.post(
        "/create-season",
        jwtAction.handleCheckToken,
        seasonController.handleCreateSeason
    );
    router.get("/get-season", seasonController.handleGetLimitSeasons);
    router.delete(
        "/delete-season",
        jwtAction.handleCheckToken,
        seasonController.handleDeleteSeason
    );
    router.put(
        "/update-season",
        jwtAction.handleCheckToken,
        seasonController.handleUpdateSeason
    );

    //
    //
    //team
    router.post(
        "/create-team",
        jwtAction.handleCheckToken,
        upload.single("file"),
        teamController.handleCreateTeam
    );
    router.get("/get-team", teamController.handleGetTeam);
    router.delete(
        "/delete-team",
        jwtAction.handleCheckToken,
        teamController.handleDeleteTeam
    );
    router.put(
        "/update-team",
        jwtAction.handleCheckToken,
        upload.single("file"),
        teamController.handleUpdateTeam
    );
    router.post(
        "/search-team",
        jwtAction.handleCheckToken,
        teamController.handleSearchTeam
    );

    //
    //
    // player
    router.post(
        "/create-player",
        jwtAction.handleCheckToken,
        uploadAvatar.single("file"),
        playerController.handleCreatePlayer
    );
    router.get("/get-player", playerController.handleGetPlayers);
    router.delete(
        "/delete-player",
        jwtAction.handleCheckToken,
        playerController.handleDeletePlayer
    );
    router.put(
        "/update-player",
        jwtAction.handleCheckToken,
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

    //
    //
    //Statistic
    router.post(
        "/create-statistic",
        jwtAction.handleCheckToken,
        statisticController.handleCreateStatistic
    );
    router.get(
        "/get-statistic-player",
        statisticController.handleGetStatisticPlayer
    );
    router.put(
        "/update-statistic",
        jwtAction.handleCheckToken,
        statisticController.handleUpdateStatistic
    );
    router.delete(
        "/delete-statistic",
        jwtAction.handleCheckToken,
        statisticController.deleteStatistic
    );
    router.get(
        "/get-statistic-season",
        statisticController.handleGetStatisticSeason
    );

    //
    //
    // rating
    router.post(
        "/create-rating",
        jwtAction.handleCheckToken,
        ratingController.handleCreateRating
    );
    router.get("/get-rating", ratingController.handleGetRating);
    router.delete(
        "/delete-rating",
        jwtAction.handleCheckToken,
        ratingController.handleDeleteRating
    );
    router.put(
        "/update-rating",
        jwtAction.handleCheckToken,
        ratingController.handleUpdateRating
    );

    //
    //
    // match
    router.post(
        "/create-match",
        jwtAction.handleCheckToken,
        uploadMatch.single("file"),
        matchController.handleCreateMatch
    );
    router.get("/get-match", matchController.handleGetMatch);
    router.delete(
        "/delete-match",
        jwtAction.handleCheckToken,
        matchController.handleDeleteMatch
    );
    router.put(
        "/update-match",
        jwtAction.handleCheckToken,
        uploadMatch.single("file"),
        matchController.handleUpdateMatch
    );
    router.get("/search-match", matchController.handleSearchMatch);
    router.get("/get-match-by-id", matchController.handleGetMAtchById);

    //
    //
    //scored
    router.get("/get-scored", scoredController.handleGetScored);
    router.delete(
        "/delete-scored",
        jwtAction.handleCheckToken,
        scoredController.handleDeleteScored
    );
    router.post(
        "/create-scored",
        jwtAction.handleCheckToken,
        scoredController.handleCreateScored
    );
    router.put(
        "/update-scored",
        jwtAction.handleCheckToken,
        scoredController.handleUpdateScored
    );

    //
    //
    //stadium
    router.post(
        "/create-stadium",
        jwtAction.handleCheckToken,
        uploadStadium.single("file"),
        stadiumController.handleCreateStadium
    );
    router.get("/get-stadium", stadiumController.handleGetStadium);
    router.delete(
        "/delete-stadium",
        jwtAction.handleCheckToken,
        stadiumController.handleDeleteStadium
    );
    router.put(
        "/update-stadium",
        jwtAction.handleCheckToken,
        uploadStadium.single("file"),
        stadiumController.handleUpdateStadium
    );

    //
    //
    //stand
    router.post(
        "/create-stand",
        jwtAction.handleCheckToken,
        standController.handleCreateStand
    );
    router.delete(
        "/delete-stand",
        jwtAction.handleCheckToken,
        standController.handleDeleteStand
    );
    router.get("/get-stand", standController.handleGetStand);
    router.put(
        "/update-stand",
        jwtAction.handleCheckToken,
        standController.handleUpdateStand
    );

    //
    //
    //calendar
    router.post(
        "/create-calendar",
        jwtAction.handleCheckToken,
        calendarController.handleCreateCalendar
    );
    router.get("/get-calender", calendarController.handleGetCalendar);
    router.delete(
        "/delete-calendar",
        jwtAction.handleCheckToken,
        calendarController.handleDeleteCalendar
    );
    router.put(
        "/update-calendar",
        jwtAction.handleCheckToken,
        calendarController.handleUpdateCalendar
    );
    router.get(
        "/get-nearest-calendar",
        calendarController.handleGetNearestCalendar
    );

    //
    //
    // ticket
    router.post(
        "/create-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleCreateTicket
    );
    router.put(
        "/update-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleUpdateTicket
    );
    router.patch(
        "/update-booking-ticket",
        ticketController.handleUpdateBookingTicket
    );
    router.delete(
        "/delete-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleDeleteTicket
    );
    router.delete(
        "/delete-all-ticket",
        jwtAction.handleCheckToken,
        ticketController.handleDeleteAllTicket
    );
    router.get("/get-ticket", ticketController.handleGetTicket);
    router.get("/get-one-ticket", ticketController.handleGetOneTicket);

    //
    //
    // bill
    router.post("/create-bill", billController.handleCreateBill);
    router.delete("/delete-bill", billController.handleDeleteBill);
    router.get("/get-bill", billController.handleGetBill);
    router.patch(
        "/update-active-bill",
        jwtAction.handleCheckToken,
        billController.handleUpdateActiveBill
    );

    //
    //
    //send email
    router.post("/send-email", emailController.handleSendEmail);

    return app.use("/v1", router);
};

export default initApiRoutes;
