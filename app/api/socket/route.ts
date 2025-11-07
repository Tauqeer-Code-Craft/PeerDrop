import { NextRequest } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

const ioMap = new WeakMap<HTTPServer,SocketIOServer>();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function GET(req: NextRequest) {
    const res: any = req.nextUrl;
    
    if(!res.socket.server.io){
        console.log("Starting Socket.io server...");
        const io = new SocketIOServer(res.socket.server,{
            path: "/api/socket",
        });

        io.on("connection",(socket)=>{
            console.log("A user connected", socket.id);

            socket.on("create-session",(sessionId)=>{
                socket.join(sessionId);
                console.log(`Session ${sessionId} created`);
            });

            socket.on("join-session",(sessionId)=>{
                socket.join(sessionId);
                socket.to(sessionId).emit("peer-joined",socket.id);
                console.log(`User joined session : ${sessionId}`);
            });

            socket.on("offer",(data)=>{
                socket.to(data.sessionId).emit("offer",data);
            });

            socket.on("answer",(data)=>{
                socket.to(data.sessionId).emit("answer",data);
            });

            socket.on("ice-candidate",(data)=>{
                socket.to(data.sessionId).emit("ice-candidate",data)
            });
            
            res.socket.server.io = io;

        })

    } else {
        console.log("scoket.io already running");
        
    }

    return new Response("Socket server running");
}