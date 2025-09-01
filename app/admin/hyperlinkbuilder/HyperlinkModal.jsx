"use client";

import { X } from "lucide-react";

export default function HyperlinkModal({
  type = "form",
  title,
  keyValue,
  linkValue,
  onKeyChange,
  onLinkChange,
  onSave,
  onConfirm,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {type === "form" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={keyValue}
              onChange={(e) => onKeyChange?.(e.target.value)}
              placeholder="Key"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
            <input
              type="text"
              value={linkValue}
              onChange={(e) => onLinkChange?.(e.target.value)}
              placeholder="Link"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
            <button
              onClick={onSave}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">{linkValue}</p>
            <div className="flex gap-3">
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
