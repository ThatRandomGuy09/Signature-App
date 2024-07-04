"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import ColorPicker from "./ColorPicker";

const SignaturePad: React.FC = () => {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [penColor, setPenColor] = useState<string>("black");
  const [fileName, setFileName] = useState<string>("signature");
  const [fileType, setFileType] = useState<string>("pdf");
  const [quality, setQuality] = useState<number>(1);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const clear = () => {
    sigPadRef.current?.clear();
  };

  const save = () => {
    setShowOptions(true);
  };

  const download = () => {
    if (sigPadRef.current) {
      const canvas = sigPadRef.current.getCanvas();
      const scaleFactor = quality === 1 ? 1 : quality === 0.5 ? 0.5 : 0.25;
      const width = canvas.width * scaleFactor;
      const height = canvas.height * scaleFactor;

      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;

      const ctx = offscreenCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(canvas, 0, 0, width, height);
        const imgData = offscreenCanvas.toDataURL(`image/${fileType}`, quality);

        if (fileType === "pdf") {
          const pdfWidth = 210; // A4 width in mm
          const pdfHeight = (height * pdfWidth) / width; // Maintain aspect ratio
          const pdf = new jsPDF({
            orientation: width > height ? "landscape" : "portrait",
            unit: "mm",
            format: [pdfWidth, pdfHeight],
          });
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${fileName}.pdf`);
        } else {
          const link = document.createElement("a");
          link.href = imgData;
          link.download = `${fileName}.${fileType}`;
          link.click();
        }
      }

      setShowOptions(false);
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

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-5 p-5 border border-gray-300 rounded shadow-lg bg-white"
          >
            <div className="mb-4">
              <label className="block mb-2">
                File Name:
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="ml-2 p-1 border border-gray-400 rounded"
                />
              </label>

              <label className="block mb-2">
                File Type:
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="ml-2 p-1 border border-gray-400 rounded"
                >
                  <option value="pdf">PDF</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                </select>
              </label>

              <label className="block mb-2">
                Quality:
                <select
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="ml-2 p-1 border border-gray-400 rounded"
                >
                  <option value="0.1">Low</option>
                  <option value="0.5">Medium</option>
                  <option value="1">High</option>
                </select>
              </label>
            </div>

            <button
              onClick={download}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Download
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignaturePad;
