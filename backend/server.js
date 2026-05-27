import app from './src/index.js';
import connectToDb from '../backend/src/config/db.js';

connectToDb();

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});