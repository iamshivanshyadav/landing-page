// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import formRoutes from './routes/form.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// CORS middleware setup
app.use(cors({
    origin: [process.env.BASE_URL],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
}));
// Routes
app.use('/api/form', formRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
