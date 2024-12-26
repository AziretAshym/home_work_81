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
        res.status(400).send({ message: "OriginalLink required!" });
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
    const { shortLink } = req.params;

    try {
        const link = await Link.findOne({ shortLink });
        if (!link) {
            res.status(404).send({ message: "Link not found" });
        } else {
            res.status(301).redirect(link.originalUrl);
        }
    } catch (error) {
        next(error);
    }
});

export default linksRouter;
