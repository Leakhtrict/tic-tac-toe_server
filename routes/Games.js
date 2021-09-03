const express = require("express");
const router = express.Router();
const { Games } = require("../models");

router.get("/", async (req, res) => {
    const listOfGames = await Games.findAll();
    res.json(listOfGames);
});

router.post("/createGame", async (req, res) => {
    const game = req.body;
    const createdGame = await Games.create(game);
    res.json(createdGame);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Games.destroy({ where: { id: id }});
    res.json("deleted game successfully");
});

module.exports = router;