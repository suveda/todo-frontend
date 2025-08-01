"use client";

import React from "react";
import Trash from "./trash";

interface TaskCardProps {
  id: string | number;
  title: string;
  color: string;
  completed: boolean;
  onToggle: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onEdit: (id: string | number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  color,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) => (
  <div
    className="w-full bg-[#1A1A1A] p-4 rounded-lg flex justify-between items-center cursor-pointer"
    onClick={() => onEdit(id)}
    tabIndex={0}
    role="button"
  >
    
    <div className="flex items-center gap-4">
      <button
        onClick={e => {
          e.stopPropagation();
          onToggle(id);
        }}
        className="w-6 h-6 flex items-center justify-center rounded-full"
        style={{
          border: completed ? "none" : `2px solid ${color}`,
          backgroundColor: completed ? color : "transparent",
          transition: "all 0.2s",
        }}
        tabIndex={0}
        aria-label={completed ? "Mark incomplete" : "Mark complete"}
      >
        {completed ? (
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10.5l4 4 6-7"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>
      <span
        className={`text-sm ${
          completed ? "line-through text-[#52525B]" : "text-white"
        }`}
      >
        {title}
      </span>
    </div>
  
    <button
      onClick={e => {
        e.stopPropagation();
        onDelete(id);
      }}
      className="text-[#808080] hover:text-red-400"
      type="button"
      tabIndex={0}
    >
      <Trash />
    </button>
  </div>
);

export default TaskCard;
