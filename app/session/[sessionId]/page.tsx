"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { initSocket } from "@/app/utils/socketClient";

export default function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const socketRef = useRef<any>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [connected, setConnected] = useState(false);

  // Detect if this user is the creator or the joiner
  const isCreator = useRef<boolean>(false);

  useEffect(() => {
    const socket = initSocket();
    socketRef.current = socket;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });
    pcRef.current = pc;

    // Send ICE candidates to the other peer
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          sessionId,
        });
      }
    };

    // Data channel for file transfer
    const dataChannel = pc.createDataChannel("fileTransfer");
    dataChannel.onopen = () => {
      console.log("✅ DataChannel open");
      setConnected(true);
    };
    dataChannel.onclose = () => console.log("❌ DataChannel closed");

    socket.emit("join-session", sessionId);

    // If another peer joins the room, creator sends an offer
    socket.on("peer-joined", async () => {
      console.log("📡 Another peer joined. Creating offer...");
      isCreator.current = true;

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("offer", { offer, sessionId });
    });

    // Handle offer from creator
    socket.on("offer", async ({ offer }) => {
      console.log("📨 Received offer, creating answer...");
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { answer, sessionId });
    });

    // Handle answer from joiner
    socket.on("answer", async ({ answer }) => {
      console.log("📨 Received answer, setting remote description...");
      await pc.setRemoteDescription(answer);
    });

    // Handle ICE candidates
    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await pc.addIceCandidate(candidate);
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    });

    return () => {
      socket.disconnect();
      pc.close();
    };
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1 className="text-2xl font-bold">Session: {sessionId}</h1>
      {connected ? (
        <p className="text-green-600 font-medium">✅ Connected to peer!</p>
      ) : (
        <p className="text-gray-500">Waiting for peer connection...</p>
      )}
    </div>
  );
}
