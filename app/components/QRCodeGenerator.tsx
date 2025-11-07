"use client";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"

interface QRCodeGeneratorProps {
  baseUrl: string;
  slug: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ baseUrl, slug }) => {
  const [qrCodeValue, setQrCodeValue] = useState<string>("");
  const [copy,setCopy] = useState<boolean>(false)

  useEffect(() => {
    if (slug) {
      const fullUrl = `${baseUrl}/session/${slug}`;
      setQrCodeValue(fullUrl);
    }
  }, [baseUrl, slug]);

  const handlecopy = async ()=> {
    if (qrCodeValue) {
        try {

            await navigator.clipboard.writeText(qrCodeValue)
            setCopy(true)
            toast("Link Copied") 

        } catch (error) {
            console.error(error)
        }
    }
  } 

  return (
    <div className="qr-code-generator flex flex-col justify-center items-center overflow-hidden p-4">
      <h2 className="text-xl font-semibold mb-4">Scan the QR Code to Connect</h2>
      {qrCodeValue ? (
        <>
          <Card className="mb-4 w-full max-w-xs items-center justify-center ">
           
          <QRCodeSVG value={qrCodeValue} size={256} level="H" />

          <CardDescription>OR</CardDescription>
          <CardTitle>
            <Button variant="outline" className="w-full" aria-label="Copy session link to clipboard" onClick={handlecopy}>
                {qrCodeValue}
            </Button>

            
          </CardTitle>
          </Card>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
