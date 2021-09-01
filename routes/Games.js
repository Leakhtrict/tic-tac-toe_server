const express = require("express");
const router = express.Router();
const { Games } = require("../models");

router.get("/", async (req, res) => {
    const listOfGames = await Games.findAll();
    res.json(listOfGames);
});

router.post("/createGame", async (req, res) => {
    const game = req.body;
    await Games.create(game);
    res.json(game);
});

router.delete("/deleteGame", async (req, res) => {
    await Games.destroy({ where: { id: req.body.id }});
    res.json("deleted game successfully");
});

module.exports = router;