import express from "express";
import morgan from "morgan"
import { AppDataSource } from "./data-source";
import authRoutes from './routes/auth'
import subRoutes from './routes/subs'
import postRoutes from './routes/posts'
import voteRoutes from './routes/votes'
import userRoutes from './routes/users'
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

const app = express();
const origin = process.env.ORIGIN;

app.use(cors({
    origin,
    credentials: true 
}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static("public"))

dotenv.config();

app.get("/", (_,res) => res.send("running"));
app.use("/api/auth", authRoutes)
app.use("/api/subs", subRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/votes", voteRoutes)
app.use("/api/users", userRoutes)

let port = 5000;
app.listen(port, async () => {
    console.log(`server running at ${process.env.ORIGIN}`)

    AppDataSource.initialize().then(async () => {
    console.log("databse initialized")
    }).catch(error => console.log(error))
})