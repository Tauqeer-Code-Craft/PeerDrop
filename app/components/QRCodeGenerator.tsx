"use client";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface QRCodeGeneratorProps {
  baseUrl: string;
  slug: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ baseUrl, slug }) => {
  const [qrCodeValue, setQrCodeValue] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      const fullUrl = `${baseUrl}/${slug}`;
      setQrCodeValue(fullUrl);
    }
  }, [baseUrl, slug]);

  const handleCopy = async () => {
    if (qrCodeValue) {
      try {
        await navigator.clipboard.writeText(qrCodeValue);
        setCopied(true);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to copy link.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        Connect to This Session
      </h2>

      {qrCodeValue ? (
  <Card className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-6 p-4 shadow-sm border border-slate-200 bg-slate rounded-xl">
    {/* QR Code Section */}
    <div className="flex flex-col items-center justify-center flex-shrink-0">
      <QRCodeSVG
        className="rounded-lg"
        value={qrCodeValue}
        size={200}
        level="H"
        includeMargin={true}
      />
      <CardDescription className="text-sm text-slate-50 mt-2">
        Scan this QR code
      </CardDescription>
    </div>

    {/* Text + Copy Section */}
    <div className="flex flex-col gap-4 flex-1 w-full">
      <CardHeader className="p-0">
        <CardTitle className="text-lg text-slate-800">
          Or share the link below
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Button
          variant="outline"
          onClick={handleCopy}
          className="w-full justify-between text-sm font-mono text-black truncate"
          aria-label="Copy session link to clipboard"
        >
          <span className="truncate">{qrCodeValue}</span>
          <Copy className="h-4 w-4 ml-2 opacity-70" />
        </Button>
      </CardContent>
    </div>
  </Card>
) : (
  <p className="text-slate-500">Generating QR code...</p>
)}

    </div>
  );
};

export default QRCodeGenerator;
