import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
import match from "../models/match";
const { Op, where } = require("sequelize");

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
                { model: db.Feedback, include: [{ model: db.User }] },
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

const deleteCommentService = async (id) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateLikeCommentService = async (commentId, isIncrease) => {
    try {
        let comment = await handleGetOneComment(commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = comment.like;
        if (isIncrease) {
            countLikeNew = comment.like + 1;
        } else {
            if (comment.like === 0) {
                countLikeNew = 0;
            } else {
                countLikeNew = comment.like - 1;
            }
        }
        await db.Comment.update(
            {
                like: countLikeNew,
            },
            { where: { id: commentId } }
        );

        return funcReturn("update success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeCommentService = async (commentId, isIncrease) => {
    try {
        let comment = await handleGetOneComment(commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countDislikeNew = comment.disLike;
        if (isIncrease) {
            countDislikeNew = comment.disLike + 1;
        } else {
            if (comment.disLike === 0) {
                countDislikeNew = 0;
            } else {
                countDislikeNew = comment.disLike - 1;
            }
        }
        await db.Comment.update(
            {
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

module.exports = {
    createCommentService,
    getAllCommentService,
    getLimitCommentService,
    deleteCommentService,
    updateLikeCommentService,
    updateDisLikeCommentService,
};
