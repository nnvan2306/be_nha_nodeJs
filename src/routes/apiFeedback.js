import feedbackController from "../controller/feedbackController";

const initApiFeedback = (app) => {
    router.post("/create-feedback", feedbackController.handleCreateFeedback);
    router.get("/get-feedback", feedbackController.handleGetFeedback);
    router.delete("/delete-feedback", feedbackController.handleDeleteFeedback);
    router.patch("/like-feedback", feedbackController.handleLikeFeedback);
    router.patch("/dislike-feedback", feedbackController.handleDislikeFeedback);

    return app.use("/v1", router);
};

export default initApiFeedback;
