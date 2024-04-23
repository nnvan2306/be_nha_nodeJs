import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import feedbackService from "../service/feedbackService";

class feedbackController {
    async handleCreateFeedback(req, res) {
        try {
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetFeedback(req, res) {
        try {
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteFeedback(req, res) {
        try {
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleLikeFeedback(req, res) {
        try {
            if (!req.body.feedbackId || !req.body.userId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await feedbackService.updateLikeFeedbackService(
                +req.body.feedbackId,
                +req.body.userId
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDislikeFeedback(req, res) {
        try {
            if (!req.body.feedbackId || !req.body.userId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await feedbackService.updateDisLikeFeedbackService(
                +req.body.feedbackId,
                +req.body.userId
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new feedbackController();
