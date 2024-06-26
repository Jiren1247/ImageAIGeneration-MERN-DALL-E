import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
// react可以不写.js，但是node.js必须写.js
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

// api之前一定要加forth slash
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req, res) => {
    res.send('Hello from DALL-E!');
});

const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,'0.0.0.0', () => console.log('Server has started on port http://localhost:8080'));
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

startServer();