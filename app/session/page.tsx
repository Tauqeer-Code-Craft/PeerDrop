"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { initSocket } from "@/utils/socketClient";
import QRCodeGenerator from "@/app/components/QRCodeGenerator"; // ✅ import your QR component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SessionHome() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();

  const createSession = async () => {
    const id = nanoid(8);
    setSessionId(id);
    const socket = initSocket();
    socket.emit("create-session", id);
  };

  const joinSession = (id: string) => {
    router.push(`/session/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-800 text-slate-800 flex flex-col items-center px-6 py-10">
        {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">PeerDrop</h1>
        <p className="text-slate-500">Fast, private file sharing via WebRTC</p>
      </header>

        <CardContent className="flex flex-col items-center gap-4">
          {!sessionId ? (
            <Button
              className="w-full"
              onClick={createSession}
            >
              Create Session
            </Button>
          ) : (
            <>
              {/* ✅ Use your new QR Generator component */}
              <QRCodeGenerator baseUrl={window.location.origin} slug={sessionId} />

              <Button
                className="w-full bg-slate-600 text-white hover:bg-slate-700"
                onClick={() => joinSession(sessionId)}
              >
                Go to Session
              </Button>
            </>
          )}
        </CardContent>
    </div>
  );
}
