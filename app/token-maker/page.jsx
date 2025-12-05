"use client";

import { useEffect, useRef, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const CANVAS_SIZE = 512; // workspace size

export default function IgniteTokenMaker() {
  const [borders, setBorders] = useState([]);
  const [loadingBorders, setLoadingBorders] = useState(false);
  const [borderError, setBorderError] = useState("");

  const [selectedBorder, setSelectedBorder] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  const [borderObj, setBorderObj] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const dragStateRef = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  // ===========================
  //  LOAD TOKEN BORDERS
  // ===========================
  useEffect(() => {
    async function fetchBorders() {
      try {
        setLoadingBorders(true);
        setBorderError("");

        const res = await fetch(`${API_BASE}/ignite/token-borders`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        // Make sure your controller returns: res.json({ items: data })
        const arr = Array.isArray(json.items) ? json.items : [];
        setBorders(arr);

        if (arr.length > 0) {
          setSelectedBorder(arr[0]);
        }
      } catch (err) {
        console.error("❌ Failed to load token borders:", err);
        setBorderError("Failed to load token borders");
      } finally {
        setLoadingBorders(false);
      }
    }

    fetchBorders();
  }, []);

  // ===========================
  //  LOAD IMAGE UPLOAD
  // ===========================
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageFile(file);
    setImageUrl(url);
    setOffset({ x: 0, y: 0 });
    setZoom(1);

    const img = new Image();
    img.onload = () => {
      setImageObj(img);
    };
    img.src = url;
  }

  // ===========================
  //  LOAD BORDER IMAGE
  // ===========================
  useEffect(() => {
    if (!selectedBorder || !selectedBorder.image_url) {
      setBorderObj(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // allow toDataURL if the host allows it
    img.onload = () => {
      setBorderObj(img);
    };
    img.src = selectedBorder.image_url;
  }, [selectedBorder]);

  // ===========================
  //  RENDER CANVAS
  // ===========================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // clear
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // background checkerboard
    const size = 16;
    for (let y = 0; y < CANVAS_SIZE; y += size) {
      for (let x = 0; x < CANVAS_SIZE; x += size) {
        const isDark = ((x / size + y / size) | 0) % 2 === 0;
        ctx.fillStyle = isDark ? "#262626" : "#1f2933";
        ctx.fillRect(x, y, size, size);
      }
    }

    // draw base image
    if (imageObj) {
      const img = imageObj;
      const baseScale = Math.max(
        CANVAS_SIZE / img.width,
        CANVAS_SIZE / img.height
      );
      const finalScale = baseScale * zoom;

      const drawW = img.width * finalScale;
      const drawH = img.height * finalScale;

      const centerX = CANVAS_SIZE / 2 + offset.x;
      const centerY = CANVAS_SIZE / 2 + offset.y;

      const drawX = centerX - drawW / 2;
      const drawY = centerY - drawH / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // draw border on top
    if (borderObj) {
      ctx.drawImage(borderObj, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }, [imageObj, borderObj, zoom, offset]);

  // ===========================
  //  DRAG HANDLING
  // ===========================
  function handleMouseDown(e) {
    if (!imageObj) return;
    const rect = canvasRef.current.getBoundingClientRect();
    dragStateRef.current.dragging = true;
    dragStateRef.current.lastX = e.clientX - rect.left;
    dragStateRef.current.lastY = e.clientY - rect.top;
  }

  function handleMouseMove(e) {
    if (!dragStateRef.current.dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - dragStateRef.current.lastX;
    const dy = y - dragStateRef.current.lastY;

    dragStateRef.current.lastX = x;
    dragStateRef.current.lastY = y;

    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  }

  function handleMouseUpOrLeave() {
    dragStateRef.current.dragging = false;
  }

  // ===========================
  //  DOWNLOAD
  // ===========================
  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ignite-token.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  // helper label
  function borderLabel(border) {
    if (!border) return "Unnamed";
    if (border.is_paid) return `${border.name || "Border"} (Premium)`;
    return border.name || "Border";
  }

  return (
    <div className="min-h-screen w-full bg-[#1b1a17] text-slate-100 flex justify-center py-6">
      <div className="w-full max-w-6xl h-[90vh] bg-[#2a2620] border border-[#3b3428] rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-[#3b3428] flex items-center justify-between text-sm">
          <div className="font-semibold tracking-wide uppercase text-amber-300">
            Ignite Token Maker
          </div>
         
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex-1 grid grid-cols-[220px_minmax(0,1fr)_260px] gap-0 h-full">
          {/* LEFT: BORDER LIST */}
          <aside className="h-full bg-[#221f1b] border-r border-[#3b3428] flex flex-col">
            <div className="px-3 py-2 text-xs font-semibold tracking-wide text-amber-200 border-b border-[#3b3428]">
              Borders
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
              {loadingBorders && (
                <div className="text-[11px] text-slate-300">
                  Loading borders...
                </div>
              )}

              {borderError && (
                <div className="text-[11px] text-red-300">{borderError}</div>
              )}

              {!loadingBorders &&
                !borderError &&
                borders.map((b) => {
                  const active = selectedBorder?.id === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBorder(b)}
                      className={`w-full flex items-center gap-2 px-1 py-1 rounded-md border text-left text-[11px] transition
                        ${
                          active
                            ? "border-amber-400 bg-[#3b3224]"
                            : "border-[#3b3428] bg-[#191713] hover:bg-[#262118]"
                        }`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-black/60 border border-[#4b4334] shrink-0 flex items-center justify-center">
                        {b.image_url ? (
                          <img
                            src={b.image_url}
                            alt={b.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-slate-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-[11px]">
                          {borderLabel(b)}
                        </div>
                        {b.description && (
                          <div className="truncate text-[10px] text-slate-400">
                            {b.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}

              {!loadingBorders &&
                !borderError &&
                borders.length === 0 && (
                  <div className="text-[11px] text-slate-300">
                    No token borders yet.
                  </div>
                )}
            </div>
          </aside>

          {/* CENTER: CANVAS WORKSPACE */}
          <main className="h-full flex flex-col items-center justify-center bg-[#2b2822]">
            <div className="bg-[#1d1a16] border border-[#3b3428] rounded-xl p-3 shadow-inner">
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="block bg-transparent cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
              />
            </div>

            {/* <div className="mt-3 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-100/80">Zoom</span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-40"
                />
                <span className="w-10 text-right">
                  {zoom.toFixed(2)}x
                </span>
              </div>
            </div> */}
          </main>

          <aside className="h-full bg-[#221f1b] border-l border-[#3b3428] flex flex-col">
            <div className="px-3 py-2 text-xs font-semibold tracking-wide text-amber-200 border-b border-[#3b3428]">
              Controls
            </div>

            <div className="p-3 space-y-3 text-xs">
              {/* Upload */}
              <div>
                <div className="font-semibold text-amber-100 mb-1">
                  1. Choose Image
                </div>
                <label className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-amber-500 bg-[#2d261b] hover:bg-[#3a2f1d] cursor-pointer text-xs font-medium text-amber-100">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  Upload Image
                </label>
                {imageFile && (
                  <div className="mt-1 text-[11px] text-slate-300 truncate">
                    {imageFile.name}
                  </div>
                )}
              </div>

              {/* Border Info */}
              <div>
                <div className="font-semibold text-amber-100 mb-1">
                  2. Selected Border
                </div>
                {selectedBorder ? (
                  <div className="flex items-center gap-2 text-[11px]">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-black/60 border border-[#4b4334] shrink-0">
                      {selectedBorder.image_url && (
                        <img
                          src={selectedBorder.image_url}
                          alt={selectedBorder.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">
                        {borderLabel(selectedBorder)}
                      </div>
                      {selectedBorder.description && (
                        <div className="truncate text-slate-400">
                          {selectedBorder.description}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400">
                    No border selected.
                  </div>
                )}
              </div>


              {/* Download */}
              <div className="pt-2 border-t border-[#3b3428]">
                <button
                  type="button"
                //   onClick={handleDownload}
                  disabled={!imageObj || !borderObj}
                  className={`w-full px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wide
                    ${
                      imageObj && borderObj
                        ? "bg-emerald-500 hover:bg-emerald-400 text-[#111827]"
                        : "bg-slate-600 text-slate-300 cursor-not-allowed"
                    }`}
                >
                  Download PNG
                </button>
                {!imageObj && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Please upload an image first.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
