import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket Disconnected:", socket.id);
        });
    });

    return io;
};

export const getIO = () => io;