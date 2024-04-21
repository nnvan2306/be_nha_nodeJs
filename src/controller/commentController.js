import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import commentService from "../service/commentService";

class commentController {
    async handleCreateComment(req, res) {
        try {
            let data = req.body;

            console.log(data);

            if (!data.content || !data.matchId || !data.userId) {
                return res.status(404).json(returnInfoEmpty());
            }

            console.log("create data");

            let dataBuider = {
                ...data,
                matchId: +data.matchId,
                userId: +data.userId,
            };

            console.log(dataBuider);

            let fetch = await commentService.createCommentService(dataBuider);

            console.log(fetch);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetComment(req, res) {
        try {
            let comments;
            if (!req.query.page || !req.query.pageSize || !req.query.matchId) {
                comments = await commentService.getAllCommentService();
            } else {
                comments = await commentService.getLimitCommentService(
                    +req.query.page,
                    +req.query.pageSize,
                    +req.query.matchId
                );
            }

            return res
                .status(comments.errorCode === 0 ? 200 : 500)
                .json(
                    funcReturn(
                        comments.message,
                        comments.errorCode,
                        comments.data
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteComment(req, res) {
        try {
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleLikeComment(req, res) {
        try {
            if (!req.body.commentId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await commentService.updateLikeCommentService(
                +req.body.commentId,
                +req.body.isIncrease
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDislikeComment(req, res) {
        try {
            if (!req.body.commentId) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await commentService.updateDisLikeCommentService(
                +req.body.commentId,
                +req.body.isIncrease
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

module.exports = new commentController();
