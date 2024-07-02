"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import ColorPicker from "./ColorPicker";

const availableFonts = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Courier New",
];

const SignaturePad: React.FC = () => {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [penColor, setPenColor] = useState<string>("black");

  const clear = () => {
    sigPadRef.current?.clear();
  };

  const save = () => {
    if (sigPadRef.current) {
      const canvas = sigPadRef.current.getCanvas();
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("signature.pdf");
      clear();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h2 className="text-2xl font-bold mb-4">Save your Signature</h2>

      <ColorPicker color={penColor} onColorChange={setPenColor} />
      <SignatureCanvas
        ref={sigPadRef}
        penColor={penColor}
        canvasProps={{ className: "border-2 border-black w-80 h-60" }}
      />
      <div className="mt-5 flex gap-3">
        <button
          onClick={clear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
        >
          Save & Download
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
