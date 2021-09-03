const express = require("express");
const router = express.Router();
const { Tags } = require("../models");

router.get("/", async (req, res) => {
    const listOfTags = await Tags.findAll();
    res.json(listOfTags);
});

router.post("/addTags", (req, res) => {
    const selectedTags = req.body;
    selectedTags.map( async (val) => {
        if(val.__isNew__){
            await Tags.create({ tagName: val.label, count: 1 })
        } else{
            await Tags.increment({ count: 1 }, { where: { tagName: val.label } })
        }
    });
    res.json("added tags successfully");
});

router.post("/removeTags", (req, res) => {
    const selectedTags = req.body;
    selectedTags.map( async (val) => {
        await Tags.increment({ count: -1 }, { where: { tagName: val } })
    });
    res.json("removed tags successfully");
});

module.exports = router;