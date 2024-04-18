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
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDislikeFeedback(req, res) {
        try {
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new feedbackController();
