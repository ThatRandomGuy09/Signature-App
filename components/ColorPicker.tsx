import React from "react";

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <label htmlFor="penColor" className="mb-2 text-lg font-semibold">
        Pen Color
      </label>
      <input
        type="color"
        id="penColor"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-10 h-10 border-none cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;
