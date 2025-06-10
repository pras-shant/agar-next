import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';
import connectDB from './db/db';
import cors from 'cors'; // Import cors

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type,Authorization', 
  })
);
app.use('/api/users', userRoutes);


connectDB();

export default app;
