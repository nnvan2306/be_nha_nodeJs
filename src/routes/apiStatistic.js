import jwtAction from "../middleware/jwtAction";
import statisticController from "../controller/statisticController";

const initApiStatistic = (app) => {
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

    return app.use("/v1", router);
};

export default initApiStatistic;
