import express from "express";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";

dotenv.config();
connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/blogs", blogRoutes)
app.use("/api/users",userRoutes)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})