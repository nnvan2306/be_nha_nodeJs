import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
import likeFeedbackService from "./likeFeedbackservice";
import dislikeFeedbackService from "./dislikeFeedbackService";
import { where } from "sequelize";

const handleGetOneFeedback = async (id) => {
    let feedback = await db.Feedback.findOne({
        where: { id: id },
    });

    return feedback;
};

const createFeedbackService = async (content, commentId, userId) => {
    console.log(content, commentId, userId);
    try {
        await db.Feedback.create({
            like: 0,
            disLike: 0,
            content: content,
            commentId: commentId,
            userId: userId,
        });

        return funcReturn("create success", 0, []);
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

const deleteFeedbackService = async (feedbackId) => {
    try {
        await db.Feedback.destroy({
            where: { id: feedbackId },
        });

        await likeFeedbackService.handleDeleteLikeFeedbackById(+feedbackId);
        await dislikeFeedbackService.handleDeleteDislikeFeedbackById(
            +feedbackId
        );

        return funcReturn("delete successfully", 0, []);
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

export const deleteFeedbackByCommentId = async (commentId) => {
    try {
        await db.Feedback.destroy({
            where: {
                commentId: commentId,
            },
        });

        return funcReturn("delete success", 0, []);
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
