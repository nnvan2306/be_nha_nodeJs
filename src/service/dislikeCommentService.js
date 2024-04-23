import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";

const handleGetDisLikeCommentService = async (commentId, userId) => {
    try {
        let dislike = await db.DislikeComment.findOne({
            where: {
                commentId: commentId,
                userId: userId,
            },
        });

        if (dislike) {
            return funcReturn("exit", 1, []);
        }

        return funcReturn("not exit ", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleCreateDislikeComment = async (commentId, userId) => {
    try {
        await db.DislikeComment.create({
            commentId: commentId,
            userId: userId,
        });

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteDislikeComment = async (commentId, userId) => {
    try {
        await db.DislikeComment.destroy({
            where: { commentId: commentId, userId: userId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleDeleteDislikeCommentByCommentId = async (commentId) => {
    try {
        await db.DislikeComment.destroy({
            where: { commentId: commentId },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    handleCreateDislikeComment,
    handleDeleteDislikeComment,
    handleGetDisLikeCommentService,
    handleDeleteDislikeCommentByCommentId,
};
