import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';
import connectDB from './db/db';
import cors from 'cors'; // Import cors

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use(
  cors({
    origin: '*', // Allow only your frontend origin
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  })
);


// Connect to DB
connectDB();

export default app;
