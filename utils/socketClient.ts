import {io,Socket} from "socket.io-client";

let socket: Socket;

export const initSocket = (): Socket => {
    if (!socket) {
        socket = io({
            path: "/api/socket",
        });
    }
    return socket;
}