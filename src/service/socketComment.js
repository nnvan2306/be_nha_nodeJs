import { createCommentService } from "../service/commentService";

export const createCommentSocket = async (socket) => {
    socket.on("connected", (value) => {
        if (!value) return;

        socket.on("replycm", async (data) => {
            const comments = await createCommentService(data, "socket");
            socket.emit("reply_suc", comments);
        });
    });
};
