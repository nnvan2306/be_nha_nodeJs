import jwtAction from "../middleware/jwtAction";
import ratingController from "../controller/ratingController";

const initApiRating = (app) => {
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

    return app.use("/v1", router);
};

export default initApiRating;
