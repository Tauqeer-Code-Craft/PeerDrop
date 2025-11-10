"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { initSocket } from "@/app/utils/socketClient";
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <Card className="p-6 w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">🔗 WebRTC File Sharing</CardTitle>
        </CardHeader>

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
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => joinSession(sessionId)}
              >
                Go to Session
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
