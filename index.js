const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const db = require('./models');

const gameRouter = require('./routes/Games');
app.use('/games', gameRouter);
const tagRouter = require('./routes/Tags');
app.use('/tags', tagRouter);

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log("Server is OK!");
    });

    io.on("connection", socket => {
        console.log("User " + socket.id + " connected");

        socket.on("joinRoom", (room) => {
            const players = io.sockets.adapter.rooms.get(room);
            const numPlayers = players ? players.size : 0;
            if(numPlayers === 0){
                socket.join(room);
                socket.emit("created");
                console.log("User " + socket.id + " Joined Room: " + room);
            } else if(numPlayers === 1){
                socket.join(room);
                socket.emit("joined");
                console.log("User " + socket.id + " Joined Room: " + room);
                io.sockets.in(room).emit('ready');
            } else{
                socket.emit('full');
            }
        });

        socket.on("startGame", (data) => {
            socket.broadcast.emit("emitStartGame", data);
        });
        
        socket.on("sendTurn", (data) => {
            socket.broadcast.emit("emitSendTurn", data);
        });


        socket.on("disconnect", () => {
            console.log("User " + socket.id + " disconnected");
        });
    });
});