import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
import match from "../models/match";
const { Op, where } = require("sequelize");
import likeCommentService from "./likeCommentService";
import dislikeCommentService from "./dislikeCommentService";

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

// const updateLikeCommentService = async (commentId, userId, isIncrease) => {
//     try {
//         let comment = await handleGetOneComment(commentId);

//         if (!comment) {
//             return funcReturn("comment is not exits ", 1, []);
//         }

//         let countLikeNew = comment.like;
//         let countDislikeNew = comment.disLike;

//         if (isIncrease) {
//             //check dislike is exit ? --true--> delete dislike
//             let check =
//                 await dislikeCommentService.handleGetDisLikeCommentService(
//                     +commentId,
//                     +userId
//                 );
//             if (check.errorCode) {
//                 let deleteDislike =
//                     await dislikeCommentService.handleDeleteDislikeComment(
//                         +commentId,
//                         +userId
//                     );

//                 if (deleteDislike.errorCode) {
//                     return funcReturn("not delete dislike", 1, []);
//                 }
//                 countDislikeNew = countDislikeNew - 1;
//             }

//             //create likeComment
//             let createLikeComment =
//                 await likeCommentService.handleCreateLikeComment(
//                     +commentId,
//                     +userId
//                 );

//             if (createLikeComment.errorCode) {
//                 return funcReturn("create faild", 1, []);
//             }

//             //update like
//             countLikeNew = comment.like + 1;
//         } else {
//             let deleteLikeComment =
//                 await likeCommentService.handleDeleteLikeComment(
//                     +commentId,
//                     +userId
//                 );

//             if (deleteLikeComment.errorCode) {
//                 return funcReturn("create faild", 1, []);
//             }

//             if (comment.like === 0) {
//                 countLikeNew = 0;
//             } else {
//                 countLikeNew = comment.like - 1;
//             }
//         }

//         await db.Comment.update(
//             {
//                 like: countLikeNew,
//                 disLike: countDislikeNew,
//             },
//             { where: { id: commentId } }
//         );

//         return funcReturn("update success", 0, []);
//     } catch (err) {
//         console.log(err);
//         return returnErrService();
//     }
// };

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

const updateDisLikeCommentService = async (commentId, userId, isIncrease) => {
    try {
        let comment = await handleGetOneComment(commentId);

        if (!comment) {
            return funcReturn("comment is not exits ", 1, []);
        }

        let countLikeNew = comment.like;
        let countDislikeNew = comment.disLike;

        if (isIncrease) {
            //check like is exit ? --true--> delete like
            let check = await likeCommentService.handleGetLikeCommentService(
                +commentId,
                +userId
            );
            if (check.errorCode) {
                let deleteLike =
                    await likeCommentService.handleDeleteLikeComment(
                        +commentId,
                        +userId
                    );

                if (deleteLike.errorCode) {
                    return funcReturn("not delete like", 1, []);
                }
                countLikeNew = countLikeNew - 1;
            }

            //create dislike
            let createDislikeComment =
                await dislikeCommentService.handleCreateDislikeComment(
                    +commentId,
                    +userId
                );

            if (createDislikeComment.errorCode) {
                return funcReturn("create faild", 1, []);
            }

            countDislikeNew = comment.disLike + 1;
        } else {
            let deleteDislikeComment =
                await dislikeCommentService.handleDeleteDislikeComment(
                    +commentId,
                    +userId
                );

            if (deleteDislikeComment.errorCode) {
                return funcReturn("create faild", 1, []);
            }

            if (comment.disLike === 0) {
                countDislikeNew = 0;
            } else {
                countDislikeNew = comment.disLike - 1;
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

module.exports = {
    createCommentService,
    getAllCommentService,
    getLimitCommentService,
    deleteCommentService,
    updateLikeCommentService,
    updateDisLikeCommentService,
};
