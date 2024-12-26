import mongoose from "mongoose";
import {ILink} from "../types";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    originalLink: {
        type: String,
        required: true,
    },
    shortLink: {
        type: String,
        required: true,
        unique: true,
    },
});

const Link = mongoose.model<ILink>("Link", LinkSchema);
export default Link;
