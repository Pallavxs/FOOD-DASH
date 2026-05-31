// backend/src/socket/socket.js
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
    const { userId } = socket.handshake.query;
    if (userId) {
      socket.join(userId);
      console.log('User joined room:', userId);
    }

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => io;

export const emitOrderStatus = (orderId, status, userId) => {
  if (!io) return;
  if (!userId) return;
  io.to(userId).emit('order-status-updated', { orderId, status });
  console.log(`Emitted order-status-updated for order ${orderId} with status ${status} to user ${userId}`);
};