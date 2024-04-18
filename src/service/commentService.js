import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
const { Op } = require("sequelize");

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

const getLimitCommentService = async (page, pageSize) => {
    try {
        let offset = (page - 1) * pageSize;
        let { count, rows } = await db.Comment.findAndCountAll({
            offset: offset,
            limit: pageSize,
            include: [{ model: db.User }, { model: db.Feedback }],
        });

        let data = {
            items: rows,
            meta: {
                currentPage: page,
                totalIteams: count,
                totalPages: Math.ceil(count / pageSize),
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

const updateLikeCommentService = async (id) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeCommentService = async (id) => {
    try {
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
