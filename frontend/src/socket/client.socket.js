import { io } from 'socket.io-client';

export const socket = io('http://10.75.179.116:3000', {
    transports: ['websocket'],
    autoConnect: false,
});