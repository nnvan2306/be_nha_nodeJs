import jwtAction from "../middleware/jwtAction";
import playerController from "../controller/playerController";
import { uploadAvatar } from "../middleware/multer";

const initApiPlayer = (app) => {
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

    return app.use("/v1", router);
};

export default initApiPlayer;
