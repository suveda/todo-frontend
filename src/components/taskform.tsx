"use client";
import React, { useState, useEffect } from "react";

export interface TaskFormProps {
  initialTitle?: string;
  initialColor?: string;
  onSubmit: (title: string, color: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
  submitIcon?: React.ReactNode;
}

const COLORS = [
  { name: "Red", value: "#FF3B30" },
  { name: "Orange", value: "#FF9500" },
  { name: "Yellow", value: "#FFCC00" },
  { name: "Green", value: "#34C759" },
  { name: "Blue", value: "#007AFF" },
  { name: "Indigo", value: "#5856D6"},
  { name: "Purple", value: "#AF52DE" },
  { name: "Pink", value: "#FF2D55" },
  { name: "Brown", value: "#A2845E" },
];

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = "",
  initialColor = COLORS[0].value,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  submitIcon,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setTitle(initialTitle);
    setColor(initialColor);
  }, [initialTitle, initialColor]);

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault();
        if (title.trim()) onSubmit(title.trim(), color);
      }}
    >
      
      <div className="flex flex-col gap-1">
        <label className="text-base font-semibold mb-1 text-[#4EA8DE]" htmlFor="task-title">
          Title 
        </label>
        <input
          id="task-title"
          className="h-[44px] rounded-lg bg-[#18181B] border border-[#333] px-4 text-white focus:outline-none text-base"
          placeholder="Ex. Brush your teeth"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      
      <div className="flex flex-col gap-1">
        <label className="text-base font-semibold mb-2 text-[#4EA8DE]">
          Color
        </label>
        <div className="flex gap-3 mt-0">
          {COLORS.map(opt => (
            <button
              type="button"
              key={opt.value}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-150 ${color === opt.value ? "border-white" : "border-transparent"} ring-offset-2`}
              style={{ backgroundColor: opt.value }}
              aria-label={opt.name}
              onClick={() => setColor(opt.value)}
            >
              {color === opt.value && (
                <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                  <path d="M5 11l3.5 3.5L15 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      
      <div className="flex gap-3 justify-end mb-4">
        
        <button
          type="submit"
          className="w-full h-[52px] px-6 bg-[#1E6F9F] hover:bg-[#155a7a] text-white font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
        >
          {submitLabel}
          {submitIcon}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
