import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
import likeFeedbackService from "./likeFeedbackservice";
import dislikeFeedbackService from "./dislikeFeedbackService";

const handleGetOneFeedback = async (id) => {
    let feedback = await db.Feedback.findOne({
        where: { id: id },
    });

    return feedback;
};

const createFeedbackService = async (data) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllFeedbackService = async () => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitFeedbackService = async (page, pageSize) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteFeedbackService = async (id) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateLikeFeedbackService = async (feedbackId, userId) => {
    try {
        let feedback = await handleGetOneFeedback(feedbackId);

        if (!feedback) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = feedback.like;
        let countDislikeNew = feedback.disLike;

        let likeFeedback =
            await likeFeedbackService.handleGetLikeFeedbackService(
                +feedbackId,
                +userId
            );

        if (likeFeedback.errorCode) {
            let deleteLikeFeedback =
                await likeFeedbackService.handleDeleteLikeFeedback(
                    +feedbackId,
                    +userId
                );
            if (deleteLikeFeedback.errorCode) {
                return funcReturn("delete like feedback err", 1, []);
            }

            countLikeNew = countLikeNew - 1;
        } else {
            let checkDislikeExit =
                await dislikeFeedbackService.handleGetDisLikeFeedbackService(
                    +feedbackId,
                    +userId
                );

            if (checkDislikeExit.errorCode) {
                let deleteDislikeFeedback =
                    await dislikeFeedbackService.handleDeleteDislikeFeedback(
                        +feedbackId,
                        +userId
                    );

                if (deleteDislikeFeedback.errorCode) {
                    return funcReturn("delete dislike feedback err", 1, []);
                }
                countDislikeNew = countDislikeNew - 1;
            }

            countLikeNew = countLikeNew + 1;

            let createLikeFeedback =
                await likeFeedbackService.handleCreateLikeFeedback(
                    +feedbackId,
                    +userId
                );
            if (createLikeFeedback.errorCode) {
                return funcReturn("create like feedback err", 1, []);
            }
        }

        await db.Feedback.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: feedbackId } }
        );

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeFeedbackService = async (feedbackId, userId) => {
    try {
        let feedback = await handleGetOneFeedback(feedbackId);

        if (!feedback) {
            return funcReturn("feedback is not exits ", 1, []);
        }

        let countLikeNew = feedback.like;
        let countDislikeNew = feedback.disLike;

        let dislikeFeedback =
            await dislikeFeedbackService.handleGetDisLikeFeedbackService(
                +feedbackId,
                +userId
            );

        if (dislikeFeedback.errorCode) {
            let deleteDisLikeFeedback =
                await dislikeFeedbackService.handleDeleteDislikeFeedback(
                    +feedbackId,
                    +userId
                );
            if (deleteDisLikeFeedback.errorCode) {
                return funcReturn("delete dislike feedback err", 1, []);
            }

            countDislikeNew = countDislikeNew - 1;
        } else {
            let checkLikeExit =
                await likeFeedbackService.handleGetLikeFeedbackService(
                    +feedbackId,
                    +userId
                );

            if (checkLikeExit.errorCode) {
                let deleteLikeFeedback =
                    await likeFeedbackService.handleDeleteLikeFeedback(
                        +feedbackId,
                        +userId
                    );

                if (deleteLikeFeedback.errorCode) {
                    return funcReturn("delete like feedback err", 1, []);
                }
                countLikeNew = countLikeNew - 1;
            }

            countDislikeNew = countDislikeNew + 1;

            let createDislikeFeedback =
                await dislikeFeedbackService.handleCreateDislikeFeedback(
                    +feedbackId,
                    +userId
                );
            if (createDislikeFeedback.errorCode) {
                return funcReturn("create dislike feedback err", 1, []);
            }
        }

        await db.Feedback.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: feedbackId } }
        );

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createFeedbackService,
    getAllFeedbackService,
    getLimitFeedbackService,
    deleteFeedbackService,
    updateLikeFeedbackService,
    updateDisLikeFeedbackService,
};
