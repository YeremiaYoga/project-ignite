"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Table,
  Type,
  Link2,
  X,
  FileText,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function RichTextAdvanced({
  value = "",
  onChange,
  placeholder = "Write something...",
  rows = 12,

  // ✅ NEW
  gdoc = false,
}) {
  const ref = useRef(null);
  const [heading, setHeading] = useState("p");
  const [isFocused, setIsFocused] = useState(false);

  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    unorderedList: false,
    orderedList: false,
  });

  // ✅ NEW - GDoc modal state
  const [gdocOpen, setGdocOpen] = useState(false);
  const [gdocUrl, setGdocUrl] = useState("");
  const [gdocLoading, setGdocLoading] = useState(false);
  const [gdocError, setGdocError] = useState("");

  // ✅ Sinkronisasi data dari DB
  useEffect(() => {
    if (ref.current && typeof value === "string") {
      if (ref.current.innerHTML !== value) {
        ref.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const exec = (cmd, val = null) => {
    if (!isFocused) return;
    document.execCommand(cmd, false, val);
    if (ref.current) onChange?.(ref.current.innerHTML);
    updateActiveStates();
  };

  const insertTable = () => {
    if (!isFocused) return;
    const rowInput = prompt("Number of rows:", 3);
    if (rowInput === null) return;
    const colInput = prompt("Number of columns:", 3);
    if (colInput === null) return;

    const r = parseInt(rowInput);
    const c = parseInt(colInput);
    if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) return;

    const withHeader = confirm("Include header row?");
    let html = `
      <table style="
        border-collapse: collapse;
        width: 100%;
        text-align: left;
        margin: 0.75rem 0;
        font-size: 0.9rem;
        color: #e5e7eb;
      ">
    `;

    if (withHeader) {
      html += "<thead><tr>";
      for (let j = 0; j < c; j++) {
        html += `
          <th style="
            border: 1px solid #4b5563;
            background-color: #374151;
            color: #f9fafb;
            padding: 6px 8px;
            font-weight: 600;
          ">Header</th>
        `;
      }
      html += "</tr></thead>";
    }

    html += "<tbody>";
    for (let i = 0; i < r; i++) {
      html += "<tr>";
      for (let j = 0; j < c; j++) {
        html += `
          <td style="
            border: 1px solid #4b5563;
            padding: 6px 8px;
            min-width: 80px;
            background-color: #1f2937;
          ">...</td>
        `;
      }
      html += "</tr>";
    }
    html += "</tbody></table><br/>";

    document.execCommand("insertHTML", false, html.trim());
    onChange?.(ref.current?.innerHTML);
  };

  const updateActiveStates = () => {
    if (!isFocused) return;
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
      justifyFull: document.queryCommandState("justifyFull"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  const handleHeadingChange = (e) => {
    const tag = e.target.value;
    setHeading(tag);

    if (!isFocused) ref.current?.focus();
    document.execCommand("formatBlock", false, `<${tag}>`);

    if (ref.current) onChange?.(ref.current.innerHTML);
    updateActiveStates();
  };

  useEffect(() => {
    const listener = () => updateActiveStates();
    document.addEventListener("selectionchange", listener);
    document.execCommand("defaultParagraphSeparator", false, "p");
    return () => document.removeEventListener("selectionchange", listener);
  }, []);

  const handleInput = () => {
    if (ref.current) onChange?.(ref.current.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();

    if (!ref.current) return;
    if (!isFocused) ref.current.focus();

    const clipboard = e.clipboardData || window.clipboardData;
    const text = clipboard.getData("text/plain") || "";

    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const blocks = escaped
      .split(/\n{2,}/)
      .map((b) => b.replace(/\n/g, "<br/>"));
    const html = blocks.map((b) => `<p>${b || "<br/>"}</p>`).join("");

    document.execCommand("insertHTML", false, html);

    onChange?.(ref.current.innerHTML);
    updateActiveStates();
  };

  // ✅ NEW - GDoc import
  const handleImportGdoc = async () => {
    try {
      setGdocLoading(true);
      setGdocError("");

      const res = await fetch(`${API_BASE}/api/gdocs/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: gdocUrl }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed to import Google Doc");
      }

      // set editor html
      if (ref.current) {
        ref.current.innerHTML = json.html || "";
      }
      onChange?.(json.html || "");

      setGdocOpen(false);
      setGdocUrl("");
    } catch (e) {
      setGdocError(
        e?.message ||
          "Import failed. Make sure the doc is public/published and the link is correct."
      );
    } finally {
      setGdocLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 text-gray-100">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-700">
        <div className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
          <Type size={12} />
          <select
            value={heading}
            onChange={handleHeadingChange}
            className="bg-gray-800 text-gray-100 text-xs rounded px-1 py-0.5 outline-none appearance-none"
            title="Heading Style"
          >
            <option value="p">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>
        </div>

        {/* Text style */}
        <ToolbarButton icon={<Bold size={12} />} title="Bold" active={active.bold} onClick={() => exec("bold")} />
        <ToolbarButton icon={<Italic size={12} />} title="Italic" active={active.italic} onClick={() => exec("italic")} />
        <ToolbarButton icon={<Underline size={12} />} title="Underline" active={active.underline} onClick={() => exec("underline")} />
        <ToolbarButton icon={<Strikethrough size={12} />} title="Strikethrough" active={active.strikeThrough} onClick={() => exec("strikeThrough")} />

        {/* Alignment */}
        <ToolbarButton icon={<AlignLeft size={12} />} title="Align Left" active={active.justifyLeft} onClick={() => exec("justifyLeft")} />
        <ToolbarButton icon={<AlignCenter size={12} />} title="Align Center" active={active.justifyCenter} onClick={() => exec("justifyCenter")} />
        <ToolbarButton icon={<AlignRight size={12} />} title="Align Right" active={active.justifyRight} onClick={() => exec("justifyRight")} />
        <ToolbarButton icon={<AlignJustify size={12} />} title="Justify" active={active.justifyFull} onClick={() => exec("justifyFull")} />

        {/* Lists */}
        <ToolbarButton icon={<List size={12} />} title="Bullet List" active={active.unorderedList} onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton icon={<ListOrdered size={12} />} title="Numbered List" active={active.orderedList} onClick={() => exec("insertOrderedList")} />

        {/* Table */}
        <ToolbarButton icon={<Table size={12} />} title="Insert Table" onClick={insertTable} />

        {/* ✅ NEW - GDoc button (conditional) */}
        {gdoc && (
          <button
            type="button"
            onClick={() => {
              setGdocError("");
              setGdocOpen(true);
            }}
            className="ml-auto flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500"
            title="Import from Google Doc"
          >
            <FileText size={14} />
            GDoc
          </button>
        )}
      </div>

      {/* Editable area */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInput={handleInput}
        onPaste={handlePaste}
        className="p-3 outline-none text-gray-100 leading-relaxed text-xs"
        style={{ minHeight: rows * 20, lineHeight: "1.6" }}
        data-placeholder={placeholder}
      />

      {/* ✅ NEW - GDoc Modal */}
      {gdocOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => !gdocLoading && setGdocOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-xl border border-gray-700 bg-gray-900 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Link2 size={16} className="text-emerald-400" />
                <p className="text-sm font-semibold">Import from Google Doc (Public)</p>
              </div>

              <button
                type="button"
                onClick={() => !gdocLoading && setGdocOpen(false)}
                className="p-2 rounded hover:bg-gray-800"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-300 mb-3">
              Paste a <b>public/published</b> Google Doc link or fileId. Private docs require Google login (later upgrade).
            </p>

            <input
              value={gdocUrl}
              onChange={(e) => setGdocUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/FILE_ID/edit"
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-emerald-500"
            />

            {gdocError && (
              <div className="mt-2 rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-xs text-red-200">
                {gdocError}
                <div className="text-[11px] text-gray-300 mt-1">
                  Tip: set doc to <b>Anyone with the link (Viewer)</b> or <b>Publish to web</b>.
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => !gdocLoading && setGdocOpen(false)}
                className="rounded-lg bg-gray-800 hover:bg-gray-700 px-3 py-2 text-xs font-semibold"
                disabled={gdocLoading}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleImportGdoc}
                disabled={!gdocUrl || gdocLoading}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 px-3 py-2 text-xs font-semibold"
              >
                {gdocLoading ? "Converting..." : "Convert"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scoped global CSS */}
      <style jsx global>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contenteditable] {
          font-family: inherit;
          font-size: 12px;
          line-height: 1.6;
          color: #f3f4f6;
        }

        [contenteditable] h1 {
          font-size: 26px;
          font-weight: 700;
          margin: 0.75rem 0;
        }

        [contenteditable] h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 0.6rem 0;
        }

        [contenteditable] h3 {
          font-size: 21px;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        [contenteditable] h4 {
          font-size: 18px;
          font-weight: 500;
          margin: 0.4rem 0;
        }

        [contenteditable] h5 {
          font-size: 15px;
          font-weight: 500;
          margin: 0.3rem 0;
        }

        [contenteditable] h6 {
          font-size: 12px;
          font-weight: 500;
          margin: 0.3rem 0;
        }

        [contenteditable] p {
          margin: 0.4rem 0;
        }

        [contenteditable] ul {
          list-style-type: disc;
          margin: 0.5rem 0 0.5rem 1.5rem;
          padding-left: 1rem;
        }

        [contenteditable] ol {
          list-style-type: decimal;
          margin: 0.5rem 0 0.5rem 1.5rem;
          padding-left: 1rem;
        }

        [contenteditable] li {
          margin: 0.2rem 0;
        }

        [contenteditable] table {
          border-collapse: collapse;
          border: 1px solid gray;
          margin-top: 4px;
        }

        [contenteditable] td {
          border: 1px solid gray;
          padding: 6px;
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({ icon, title, onClick, active }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`p-2 rounded transition-colors ${
        active
          ? "bg-blue-600 shadow-md shadow-blue-400"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      {icon}
    </button>
  );
}
