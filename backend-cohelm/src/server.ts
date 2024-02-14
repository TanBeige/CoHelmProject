import createError, { HttpError } from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { process_function } from "./functions/process_function";

const app: Application = express();
const server = createServer(app);

// Create websocket
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

app.get('/', (req: Request, res: Response) => {
    res.send('Server root. Welcome!');
});

// Setup route for WebSocket connections
const processRoute = io.of("/api/process");
processRoute.on("connection", (socket) => {
    console.log(`User connected to /api/process: ${socket.id}`);

    // Once 'start_process' is sent from the client, begin process function
    socket.on("start_process", async (data) => {
        await process_function(socket, data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected from /api/process: ${socket.id}`);
    });
});


app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(err.status || 500).send({ error: err.message });
});

export { server, io };