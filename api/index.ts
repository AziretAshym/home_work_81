import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const run = async () => {

    try {
        app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
    } catch (e) {
        console.error(e);
    }
};

run().catch(err => console.log(err));
