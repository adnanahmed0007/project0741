import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import router from './routes/Routes1.js';
import "./controllers/corn.js";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const url1 = process.env.MONGO_URI;
app.use(express.json());
app.use("/api", router)

try {
    const connect = await mongoose.connect(url1)
        .then(() => {
            app.listen(port, () => {
                console.log(` we are on port ${port}`)
            })

        })
        .catch((e) => {
            console.log(e)

        }
        )
}
catch (e) {
    console.log(e)
}