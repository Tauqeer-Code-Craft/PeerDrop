"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Users, File, Link2 } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-800 text-slate-800 flex flex-col items-center px-6 py-10">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">PeerDrop</h1>
        <p className="text-slate-500">Fast, private file sharing via WebRTC</p>
      </header>

      {/* Session Card */}
     

      {/* File Drop Zone */}
      <div className="w-full max-w-2xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>

      {/* Progress Bar */}
      
    </main>


  );
}
