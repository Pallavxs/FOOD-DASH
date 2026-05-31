// src/services/socketService.js
import { io } from 'socket.io-client';
import { logout } from '../redux/slices/authSlice';
import store from '../redux/store'; // adjust path if needed

let socket = null;

export const initSocket = (userId) => {
  if (socket) return socket;
  const SERVER_URL = 'http://192.168.1.5:3000';
  socket = io(SERVER_URL, {
    query: { userId },
    transports: ['websocket'],
    reconnectionAttempts: 5,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;

  }
};

export const onOrderStatusUpdated = (callback) => {
  if (!socket) return;
  socket.off('order-status-updated'); // ensure single listener
  socket.on('order-status-updated', callback);
};

export default initSocket;
