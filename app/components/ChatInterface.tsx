'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Send, Video, Smile } from "lucide-react";

interface Message {
  from: "me" | "them";
  text: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "them", text: "Hey there! How are you doing today?" },
    { from: "me", text: "I'm great, just working on some code. You?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input.trim() }]);
    setInput("");
  };

  return (
    
      <div className="w-full max-w-md h-[600px] flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-slate-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-300 bg-white/60 backdrop-blur">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/user-avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-xs text-slate-600">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
            <Video className="w-5 h-5 text-slate-700" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-slate-50 to-slate-200">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[75%] ${
                  msg.from === "me"
                    ? "bg-slate-700 text-white rounded-br-none"
                    : "bg-white border border-slate-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="border-t border-slate-300 p-3 flex items-center gap-2 bg-white/60 backdrop-blur">
          <Button variant="ghost" size="icon">
            <Smile className="w-5 h-5 text-slate-700" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5 text-slate-700" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white text-slate-800 border-slate-300"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-slate-700 text-white hover:bg-slate-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
  );
}
