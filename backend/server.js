const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
// app.use(express.json());


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

let emergencies = [];

/* WebSocket connection */
io.on("connection", (socket) => {
    console.log("Dashboard connected");

    // send existing emergencies
    socket.emit("initialData", emergencies);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

/* API to receive emergency */
app.post("/emergency", (req, res) => {

    const emergency = req.body;

    console.log("Emergency received:", emergency);

    emergencies.push(emergency);

    // broadcast to dashboards
    io.emit("newEmergency", emergency);

    res.json({
        status: "received"
    });
});

/* simple health route */
app.get("/", (req, res) => {
    res.send("Emergency server running");
});

const PORT = 5001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});