import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
import match from "../models/match";
const { Op, where } = require("sequelize");
import likeCommentService from "./likeCommentService";
import dislikeCommentService from "./dislikeCommentService";
import feedbackService from "./feedbackService";

const handleGetOneComment = async (id) => {
    let comment = await db.Comment.findOne({
        where: { id: id },
    });

    return comment;
};

const createCommentService = async (data) => {
    try {
        await db.Comment.create({
            content: data.content,
            like: 0,
            disLike: 0,
            matchId: data.matchId,
            userId: data.userId,
        });

        return funcReturn("create comment successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllCommentService = async () => {
    try {
        let comments = await db.Comment.findAll({
            include: [{ model: db.User }, { model: db.Feedback }],
        });

        return funcReturn("all comment", 0, comments);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitCommentService = async (page, pageSize, matchId) => {
    try {
        // let offset = (page - 1) * pageSize;

        // let { count, rows } = await db.Comment.findAndCountAll({
        //     where: { matchId: matchId },
        //     include: [{ model: db.User }, { model: db.Feedback }],
        //     offset: offset,
        //     limit: pageSize,
        // });

        // let data = {
        //     items: rows,
        //     meta: {
        //         currentPage: page,
        //         totalIteams: count,
        //         totalPages: Math.ceil(count / pageSize),
        //     },
        // };

        let start = (page - 1) * pageSize;
        let comments = await db.Comment.findAll({
            where: { matchId: matchId },
            include: [
                { model: db.User },
                {
                    model: db.Feedback,
                    include: [
                        { model: db.User },
                        { model: db.LikeFeedback },
                        { model: db.DislikeFeedback },
                    ],
                },
                { model: db.LikeComment },
                { model: db.DislikeComment },
            ],
        });

        let data = {
            items: comments.filter(
                (item, index) => index >= start && index < start + pageSize
            ),
            meta: {
                currentPage: page,
                totalIteams: comments.length,
                totalPages: Math.ceil(comments.length / pageSize),
            },
        };

        return funcReturn("comments", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateLikeCommentService = async (commentId, userId) => {
    try {
        let comment = await handleGetOneComment(commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = comment.like;
        let countDislikeNew = comment.disLike;

        let likeComment = await likeCommentService.handleGetLikeCommentService(
            +commentId,
            +userId
        );

        if (likeComment.errorCode) {
            let deleteLikeComment =
                await likeCommentService.handleDeleteLikeComment(
                    +commentId,
                    +userId
                );
            if (deleteLikeComment.errorCode) {
                return funcReturn("delete likeComment err", 1, []);
            }

            countLikeNew = countLikeNew - 1;
        } else {
            let checkDislikeExit =
                await dislikeCommentService.handleGetDisLikeCommentService(
                    +commentId,
                    +userId
                );

            if (checkDislikeExit.errorCode) {
                let deleteDislikeComment =
                    await dislikeCommentService.handleDeleteDislikeComment(
                        +commentId,
                        +userId
                    );

                if (deleteDislikeComment.errorCode) {
                    return funcReturn("delete dislike comment err", 1, []);
                }
                countDislikeNew = countDislikeNew - 1;
            }

            countLikeNew = countLikeNew + 1;

            let createLikeComment =
                await likeCommentService.handleCreateLikeComment(
                    commentId,
                    userId
                );
            if (createLikeComment.errorCode) {
                return funcReturn("create like comment err", 1, []);
            }
        }

        await db.Comment.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: commentId } }
        );

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeCommentService = async (commentId, userId) => {
    try {
        let comment = await handleGetOneComment(commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = comment.like;
        let countDislikeNew = comment.disLike;

        let dislikeComment =
            await dislikeCommentService.handleGetDisLikeCommentService(
                +commentId,
                +userId
            );

        if (dislikeComment.errorCode) {
            let deleteDisLikeComment =
                await dislikeCommentService.handleDeleteDislikeComment(
                    +commentId,
                    +userId
                );
            if (deleteDisLikeComment.errorCode) {
                return funcReturn("delete dislike Comment err", 1, []);
            }

            countDislikeNew = countDislikeNew - 1;
        } else {
            let checkLikeExit =
                await likeCommentService.handleGetLikeCommentService(
                    +commentId,
                    +userId
                );

            if (checkLikeExit.errorCode) {
                let deleteLikeComment =
                    await likeCommentService.handleDeleteLikeComment(
                        +commentId,
                        +userId
                    );

                if (deleteLikeComment.errorCode) {
                    return funcReturn("delete like comment err", 1, []);
                }
                countLikeNew = countLikeNew - 1;
            }

            countDislikeNew = countDislikeNew + 1;

            let createDislikeComment =
                await dislikeCommentService.handleCreateDislikeComment(
                    +commentId,
                    +userId
                );
            if (createDislikeComment.errorCode) {
                return funcReturn("create dislike comment err", 1, []);
            }
        }

        await db.Comment.update(
            {
                like: countLikeNew,
                disLike: countDislikeNew,
            },
            { where: { id: commentId } }
        );

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteCommentService = async (commentId) => {
    try {
        await db.Comment.destroy({
            where: { id: commentId },
        });

        await likeCommentService.handleDeleteLikeCommentByCommentId(+commentId);
        await dislikeCommentService.handleDeleteDislikeCommentByCommentId(
            +commentId
        );

        await feedbackService.deleteFeedbackByCommentId(+commentId);

        return funcReturn("delete successfully", 1, 0);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createCommentService,
    getAllCommentService,
    getLimitCommentService,
    deleteCommentService,
    updateLikeCommentService,
    updateDisLikeCommentService,
};
