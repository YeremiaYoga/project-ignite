// RichTextEditor.jsx
"use client";
import { useEffect, useRef } from "react";

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write here...",
  rows = 12,
}) {
  const ref = useRef(null);

  // Sinkronkan prop value -> isi editor (saat memuat / reset)
  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (cmd) => {
    document.execCommand(cmd, false, null);
    // trigger onInput manual agar value terbaru terkirim
    if (ref.current) onChange?.(ref.current.innerHTML);
  };

  const handleInput = () => {
    if (ref.current) onChange?.(ref.current.innerHTML);
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-700">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className="px-2 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600"
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="px-2 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600 italic"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("underline")}
          className="px-2 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600 underline"
          title="Underline"
        >
          U
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("strikeThrough")}
          className="px-2 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600 line-through"
          title="Strikethrough"
        >
          S
        </button>
      </div>

      {/* Editor */}
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        className="p-3 outline-none text-sm text-gray-100 min-h-[2.5rem] whitespace-pre-wrap"
        style={{ minHeight: rows * 20 }}
        data-placeholder={placeholder}
        // Placeholder ala contentEditable
        onFocus={(e) => {
          e.currentTarget.classList.add("has-content");
        }}
        onBlur={(e) => {
          if (!e.currentTarget.textContent?.trim()) {
            e.currentTarget.classList.remove("has-content");
          }
        }}
      />
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af; /* gray-400 */
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
