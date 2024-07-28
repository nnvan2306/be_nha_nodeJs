import emailController from "../controller/emailController";

const initApiEmail = (app) => {
    router.post("/send-email", emailController.handleSendEmail);

    return app.use("/v1", router);
};

export default initApiEmail;
