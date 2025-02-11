import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // ✅ Correctly create HTTP server

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes(io)); // ✅ Pass io for real-time updates

// ✅ WebSocket event handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
  });

  socket.on("newAttendee", (eventId) => {
    io.to(eventId).emit("updateAttendees");
    console.log(`New attendee added to event: ${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

// ✅ Corrected: Use `server.listen` instead of `app.listen`
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
