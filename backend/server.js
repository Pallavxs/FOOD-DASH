import app from './src/index.js';
import connectToDb from '../backend/src/config/db.js';
import http from 'http';
import { initSocket } from './src/socket/socket.js';

connectToDb();

const server = http.createServer(app);
initSocket(server);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});