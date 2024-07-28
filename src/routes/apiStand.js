import jwtAction from "../middleware/jwtAction";
import standController from "../controller/standController";

const initApiStand = (app) => {
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
    return app.use("/v1", router);
};

export default initApiStand;
