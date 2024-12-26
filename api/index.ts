import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import linksRouter from "./routes/links";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/urls', linksRouter);

const run = async () => {

    try {
        await mongoose.connect("mongodb://localhost/URLs");

        app.listen(port, () => {
            console.log(`Server started on port http://localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
    }

    process.on('exit', () => {
        mongoDb.disconnect();
    })
};

run().catch(err => console.log(err));
