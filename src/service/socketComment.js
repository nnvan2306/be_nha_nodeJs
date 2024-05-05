import {
    createCommentService,
    updateLikeCommentService,
    updateDisLikeCommentService,
    deleteCommentService,
} from "../service/commentService";

export const createCommentSocket = async (socket) => {
    socket.on("connected", (value) => {
        if (!value) return;

        socket.on("createComment", async (data) => {
            const comments = await createCommentService(data, "socket");
            socket.emit("reply_suc", comments);
        });

        socket.on("deleteComment", async (data) => {
            const comments = await deleteCommentService(data, "socket");
            socket.emit("deleteCommentSuccess", comments);
        });

        socket.on("likeComment", async (data) => {
            const likeComment = await updateLikeCommentService(data, "socket");
            socket.emit("likeCommentSuccess", likeComment);
        });

        socket.on("dislikeComment", async (data) => {
            const likeComment = await updateDisLikeCommentService(
                data,
                "socket"
            );
            socket.emit("dislikeCommentSuccess", likeComment);
        });
    });
};
