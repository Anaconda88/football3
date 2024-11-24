import express from 'express';
import dotenv from 'dotenv';
import playersRoutes from './routes/players.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/players', playersRoutes);

// Connect to DB
mongoose
    .connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT);
        });
    })
    .catch((err) => console.log(err));
