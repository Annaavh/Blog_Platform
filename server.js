import express from "express";
import blogRoutes from "./routes/blogRoutes.js";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";

dotenv.config();
connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/blogs", blogRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})