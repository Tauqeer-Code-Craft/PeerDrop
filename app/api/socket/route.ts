// app/api/socket/route.ts
import { NextResponse } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";

export const runtime = "nodejs"; // 👈 Forces Node.js runtime

let io: SocketIOServer | undefined;

export async function GET() {
  // If the server hasn't been initialized yet, create it
  if (!io) {
    console.log("🔌 Starting Socket.io server...");

    // You can't access req.socket directly here, so we attach to globalThis
    const { Server } = await import("http");
    const httpServer = new Server();

    io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("create-session", (sessionId) => {
        socket.join(sessionId);
        console.log(`Session ${sessionId} created`);
      });

      socket.on("join-session", (sessionId) => {
        socket.join(sessionId);
        socket.to(sessionId).emit("peer-joined", socket.id);
      });

      socket.on("offer", (data) => {
        socket.to(data.sessionId).emit("offer", data);
      });

      socket.on("answer", (data) => {
        socket.to(data.sessionId).emit("answer", data);
      });

      socket.on("ice-candidate", (data) => {
        socket.to(data.sessionId).emit("ice-candidate", data);
      });
    });
  } else {
    console.log("♻️ Socket.io already running");
  }

  return NextResponse.json({ message: "Socket.io server active" });
}
