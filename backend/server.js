import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import { connectSupabase } from "./config/db.js";
import { errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;
connectSupabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("Server is Ready!!"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
