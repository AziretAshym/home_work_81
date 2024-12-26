import express from "express";


const linksRouter = express.Router();

const generateShortUrl = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortLink = '';
    for (let i = 0; i < 6; i++) {
        shortLink += chars[Math.floor(Math.random() * chars.length)];
    }
    return shortLink;
};


import Link from "../models/Link";

linksRouter.post("/", async (req, res, next) => {
    const { originalLink } = req.body;

    if (!originalLink) {
        res.status(400).send({ message: "Missing required field: originalLink" });
    }

    const shortLink = generateShortUrl();

    try {
        const newLink = new Link({ originalLink, shortLink });
        await newLink.save();

        res.send(newLink);
    } catch (error) {
        next(error);
    }
});


linksRouter.get("/:shortLink", async (req, res, next) => {

});

export default linksRouter;
