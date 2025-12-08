"use client";

import { useEffect, useRef, useState } from "react";
import BorderList from "./components/BorderList"; 


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const CANVAS_SIZE = 512;
const PREVIEW_SIZE = 260;

const HANDLE_SIZE = 10;
const ROT_HANDLE_OFFSET = 30;

const BORDER_SCALE = 0.7;

const INNER_FACTOR = 1;

const MIN_ZOOM = 0.01;
const MAX_ZOOM = 100;
const DEFAULT_ZOOM = 1;

export default function IgniteTokenMaker() {
  const [borders, setBorders] = useState([]);
  const [loadingBorders, setLoadingBorders] = useState(false);
  const [borderError, setBorderError] = useState("");

  const [selectedBorder, setSelectedBorder] = useState({
    id: "none",
    name: "No Border",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageObj, setImageObj] = useState(null); 
  const [borderObj, setBorderObj] = useState(null);


  const [bgMode, setBgMode] = useState("color"); 
  const [bgColor, setBgColor] = useState("#020617"); 
  const [bgImageObj, setBgImageObj] = useState(null);

  const [fgZoom, setFgZoom] = useState(DEFAULT_ZOOM);
  const [fgOffset, setFgOffset] = useState({ x: 0, y: 0 });
  const [fgRotation, setFgRotation] = useState(0);

  const [bgZoom, setBgZoom] = useState(DEFAULT_ZOOM);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [bgRotation, setBgRotation] = useState(0);

  const [activeLayer, setActiveLayer] = useState("fg");

  const canvasRef = useRef(null); 
  const previewCanvasRef = useRef(null); 

  const dragStateRef = useRef({
    dragging: false,
    mode: null, 
    layer: "fg",
    startZoom: DEFAULT_ZOOM,
    startOffset: { x: 0, y: 0 },
    startRotation: 0,
    startDist: 0,
    startAngle: 0,
    startMouse: { x: 0, y: 0 },
  });

  const fgBoxRef = useRef(null); 
  const bgBoxRef = useRef(null); 

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
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const arr = Array.isArray(json.items) ? json.items : [];
        setBorders(arr);
        // default: no border aktif (sudah di state)
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
  //  LOAD FOREGROUND IMAGE
  // ===========================
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageFile(file);

    // reset transform foreground
    setFgOffset({ x: 0, y: 0 });
    setFgZoom(DEFAULT_ZOOM);
    setFgRotation(0);

    const img = new Image();
    img.onload = () => setImageObj(img);
    img.src = url;
  }

  // ===========================
  //  LOAD BACKGROUND IMAGE
  // ===========================
  function handleBgFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    // reset transform background
    setBgOffset({ x: 0, y: 0 });
    setBgZoom(DEFAULT_ZOOM);
    setBgRotation(0);

    const img = new Image();
    img.onload = () => {
      setBgImageObj(img);
      setBgMode("image");
      setActiveLayer("bg"); // langsung edit background dulu
    };
    img.src = url;
  }

  // ===========================
  //  LOAD BORDER IMAGE
  // ===========================
  useEffect(() => {
    if (!selectedBorder || selectedBorder.id === "none") {
      setBorderObj(null);
      return;
    }

    if (!selectedBorder.image_url) {
      setBorderObj(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setBorderObj(img);
    img.src = selectedBorder.image_url;
  }, [selectedBorder]);

  // ===========================
  //  DRAW GENERIC LAYER IMAGE
  // ===========================
  function drawLayerImage(
    ctx,
    { img, zoom, offset, rotation, boxRef, storeBox }
  ) {
    if (!img) {
      if (storeBox && boxRef) boxRef.current = null;
      return;
    }

    const size = CANVAS_SIZE;
    const cx = size / 2 + offset.x;
    const cy = size / 2 + offset.y;

    const baseScale = Math.max(size / img.width, size / img.height);
    const finalScale = baseScale * zoom;

    const drawW = img.width * finalScale;
    const drawH = img.height * finalScale;
    const drawX = cx - drawW / 2;
    const drawY = cy - drawH / 2;

    if (storeBox && boxRef) {
      boxRef.current = { cx, cy, x: drawX, y: drawY, w: drawW, h: drawH };
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(finalScale, finalScale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  // ===========================
  //  DRAW BORDER
  // ===========================
  function drawBorder(ctx) {
    if (!borderObj) return;
    const size = CANVAS_SIZE;

    const bw = size * BORDER_SCALE;
    const bh = size * BORDER_SCALE;
    const bx = size / 2 - bw / 2;
    const by = size / 2 - bh / 2;

    ctx.drawImage(borderObj, bx, by, bw, bh);
  }


  function renderWorkspace(ctx) {
    const size = CANVAS_SIZE;
    ctx.clearRect(0, 0, size, size);

    // ⬇️ background color full kotak
    ctx.fillStyle = bgColor || "#020617";
    ctx.fillRect(0, 0, size, size);

    // ⬇️ background image (kalau ada), TANPA CLIP
    if (bgMode === "image" && bgImageObj) {
      drawLayerImage(ctx, {
        img: bgImageObj,
        zoom: bgZoom,
        offset: bgOffset,
        rotation: bgRotation,
        boxRef: activeLayer === "bg" ? bgBoxRef : null,
        storeBox: true,
      });
    } else {
      // kalau layer bg aktif tapi tidak ada gambar, jangan gambar box
      if (activeLayer === "bg" && bgBoxRef.current) {
        bgBoxRef.current = null;
      }
    }

    // ⬇️ foreground image (main image), juga full kotak
    if (imageObj) {
      drawLayerImage(ctx, {
        img: imageObj,
        zoom: fgZoom,
        offset: fgOffset,
        rotation: fgRotation,
        boxRef: activeLayer === "fg" ? fgBoxRef : null,
        storeBox: true,
      });
    } else if (activeLayer === "fg" && fgBoxRef.current) {
      fgBoxRef.current = null;
    }

    // ⬇️ border selalu di atas semuanya
    drawBorder(ctx);

    // ⬇️ bounding box + handles untuk layer yang sedang diedit
    const box = activeLayer === "bg" ? bgBoxRef.current : fgBoxRef.current;

    if (box) {
      const { x, y, w, h, cx, cy } = box;
      const handles = getHandlePositions({ x, y, w, h, cx, cy });

      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "#38bdf8"; // sky-400
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);

      ctx.fillStyle = "#020617";
      ctx.strokeStyle = "#38bdf8";

      handles.forEach((pos) => {
        if (pos.type === "rotate") {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, HANDLE_SIZE / 2 + 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.rect(
            pos.x - HANDLE_SIZE / 2,
            pos.y - HANDLE_SIZE / 2,
            HANDLE_SIZE,
            HANDLE_SIZE
          );
          ctx.fill();
          ctx.stroke();
        }
      });

      ctx.restore();
    }
  }

  // ===========================
  //  RENDER TOKEN (PREVIEW & DL)
  // ===========================
  function renderTokenToCanvas(ctx) {
    const size = CANVAS_SIZE;
    ctx.clearRect(0, 0, size, size);

    const radius = (size * BORDER_SCALE * INNER_FACTOR) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    ctx.clip();

    // background color
    ctx.fillStyle = bgColor || "#020617";
    ctx.fillRect(0, 0, size, size);

    // background image
    if (bgMode === "image" && bgImageObj) {
      drawLayerImage(ctx, {
        img: bgImageObj,
        zoom: bgZoom,
        offset: bgOffset,
        rotation: bgRotation,
        boxRef: null,
        storeBox: false,
      });
    }

    // foreground
    if (imageObj) {
      drawLayerImage(ctx, {
        img: imageObj,
        zoom: fgZoom,
        offset: fgOffset,
        rotation: fgRotation,
        boxRef: null,
        storeBox: false,
      });
    }

    ctx.restore();
    drawBorder(ctx);
  }

  // ===========================
  //  EFFECT: redraw workspace & preview
  // ===========================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderWorkspace(ctx);

    const previewCanvas = previewCanvasRef.current;
    if (previewCanvas) {
      const pctx = previewCanvas.getContext("2d");
      if (pctx) {
        const tokenCanvas = document.createElement("canvas");
        tokenCanvas.width = CANVAS_SIZE;
        tokenCanvas.height = CANVAS_SIZE;
        const tctx = tokenCanvas.getContext("2d");
        if (tctx) {
          renderTokenToCanvas(tctx);
          pctx.clearRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);
          pctx.drawImage(
            tokenCanvas,
            0,
            0,
            CANVAS_SIZE,
            CANVAS_SIZE,
            0,
            0,
            PREVIEW_SIZE,
            PREVIEW_SIZE
          );
        }
      }
    }
  }, [
    imageObj,
    borderObj,
    bgMode,
    bgColor,
    bgImageObj,
    fgZoom,
    fgOffset,
    fgRotation,
    bgZoom,
    bgOffset,
    bgRotation,
    activeLayer,
  ]);

  // ===========================
  //  HANDLE POSITIONS / HIT TEST
  // ===========================
  function getHandlePositions(box) {
    if (!box) return [];
    const { x, y, w, h, cx, cy } = box;
    const midX = cx;
    const midY = cy;

    return [
      { type: "scale", id: "nw", x, y },
      { type: "scale", id: "n", x: midX, y },
      { type: "scale", id: "ne", x: x + w, y },
      { type: "scale", id: "e", x: x + w, y: midY },
      { type: "scale", id: "se", x: x + w, y: y + h },
      { type: "scale", id: "s", x: midX, y: y + h },
      { type: "scale", id: "sw", x, y: y + h },
      { type: "scale", id: "w", x, y: midY },
      { type: "rotate", id: "rotate", x: midX, y: y - ROT_HANDLE_OFFSET },
    ];
  }

  function hitTestHandle(px, py, box) {
    if (!box) return null;
    const handles = getHandlePositions(box);

    for (const h of handles) {
      if (h.type === "rotate") {
        const dx = px - h.x;
        const dy = py - h.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= HANDLE_SIZE) return h;
      } else {
        if (
          px >= h.x - HANDLE_SIZE &&
          px <= h.x + HANDLE_SIZE &&
          py >= h.y - HANDLE_SIZE &&
          py <= h.y + HANDLE_SIZE
        ) {
          return h;
        }
      }
    }
    return null;
  }

  // ===========================
  //  DRAG HANDLING (CSS→canvas)
  // ===========================
  function getMousePosInCanvas(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handleMouseDown(e) {
    const layer = activeLayer === "bg" ? "bg" : "fg";
    const box = layer === "bg" ? bgBoxRef.current : fgBoxRef.current;
    const hasImg = layer === "bg" ? !!bgImageObj : !!imageObj;

    if (!hasImg || !box) return;

    const { x: px, y: py } = getMousePosInCanvas(e);
    const handle = hitTestHandle(px, py, box);

    dragStateRef.current.dragging = true;
    dragStateRef.current.layer = layer;
    dragStateRef.current.startZoom = layer === "bg" ? bgZoom : fgZoom;
    dragStateRef.current.startOffset =
      layer === "bg" ? { ...bgOffset } : { ...fgOffset };
    dragStateRef.current.startRotation =
      layer === "bg" ? bgRotation : fgRotation;

    if (handle && handle.type === "rotate") {
      dragStateRef.current.mode = "rotate";
      const angle = Math.atan2(py - box.cx, px - box.cy);
      dragStateRef.current.startAngle =
        angle - dragStateRef.current.startRotation;
    } else if (handle && handle.type === "scale") {
      dragStateRef.current.mode = "scale";
      const dx = px - box.cx;
      const dy = py - box.cy;
      dragStateRef.current.startDist = Math.sqrt(dx * dx + dy * dy) || 1;
    } else {
      if (
        px >= box.x &&
        px <= box.x + box.w &&
        py >= box.y &&
        py <= box.y + box.h
      ) {
        dragStateRef.current.mode = "move";
        dragStateRef.current.startMouse = { x: px, y: py };
      } else {
        dragStateRef.current.mode = null;
        dragStateRef.current.dragging = false;
      }
    }
  }

  function handleMouseMove(e) {
    if (!dragStateRef.current.dragging) return;

    const { x: px, y: py } = getMousePosInCanvas(e);
    const mode = dragStateRef.current.mode;
    const layer = dragStateRef.current.layer;
    const box = layer === "bg" ? bgBoxRef.current : fgBoxRef.current;

    if (!box) return;

    if (mode === "move") {
      const startOffset = dragStateRef.current.startOffset;
      const startMouse = dragStateRef.current.startMouse;
      const dx = px - startMouse.x;
      const dy = py - startMouse.y;
      const newOffset = { x: startOffset.x + dx, y: startOffset.y + dy };

      if (layer === "bg") setBgOffset(newOffset);
      else setFgOffset(newOffset);
    } else if (mode === "scale") {
      const dx = px - box.cx;
      const dy = py - box.cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const factor = dist / (dragStateRef.current.startDist || 1);

      const raw = dragStateRef.current.startZoom * factor;
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, raw));

      if (layer === "bg") setBgZoom(clamped);
      else setFgZoom(clamped);
    } else if (mode === "rotate") {
      const angle = Math.atan2(py - box.cy, px - box.cx);
      const newRot = angle - dragStateRef.current.startAngle;

      if (layer === "bg") setBgRotation(newRot);
      else setFgRotation(newRot);
    }
  }

  function handleMouseUpOrLeave() {
    dragStateRef.current.dragging = false;
    dragStateRef.current.mode = null;
  }

  // ===========================
  //  ZOOM BUTTONS
  // ===========================
  function applyZoomFactor(factor) {
    if (activeLayer === "bg") {
      setBgZoom((current) => {
        const raw = current * factor;
        const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, raw));
        return parseFloat(clamped.toFixed(3));
      });
    } else {
      setFgZoom((current) => {
        const raw = current * factor;
        const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, raw));
        return parseFloat(clamped.toFixed(3));
      });
    }
  }

  const currentZoom = activeLayer === "bg" ? bgZoom : fgZoom;

  // ===========================
  //  DOWNLOAD PNG / WEBP
  // ===========================
  function downloadImage(type = "png") {
    if (!borderObj && !imageObj && !(bgMode === "image" && bgImageObj)) return;

    const tokenCanvas = document.createElement("canvas");
    tokenCanvas.width = CANVAS_SIZE;
    tokenCanvas.height = CANVAS_SIZE;
    const tctx = tokenCanvas.getContext("2d");
    if (!tctx) return;

    renderTokenToCanvas(tctx);

    const mime = type === "webp" ? "image/webp" : "image/png";
    const ext = type === "webp" ? "webp" : "png";

    tokenCanvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ignite-token.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      mime,
      type === "webp" ? 0.95 : undefined
    );
  }

  // helper label
  function borderLabel(border) {
    if (!border) return "Unnamed";
    if (border.id === "none") return "No Border";
    return border.name || "Border"; // tanpa "Premium"
  }

  // ===========================
  //  RENDER JSX
  // ===========================
  return (
    <div className="min-h-screen w-full text-slate-100 flex justify-center py-6">
      <div className="w-full max-w-6xl h-[90vh] bg-[#020617] border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between text-sm">
          <div className="font-semibold tracking-wide uppercase text-sky-600">
            Ignite Token Maker
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex-1 grid grid-cols-[220px_minmax(0,1fr)_260px] gap-0 h-full">
          {/* LEFT: BORDERS */}
          <BorderList
            borders={borders}
            loadingBorders={loadingBorders}
            borderError={borderError}
            selectedBorder={selectedBorder}
            onSelectBorder={setSelectedBorder}
            borderLabel={borderLabel}
          />

          {/* CENTER: CANVAS WORKSPACE */}
          <main className="h-full flex flex-col items-center justify-center bg-slate-950">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-inner">
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="block bg-transparent cursor-default w-[640px] h-[640px]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
              />
            </div>

            {/* ZOOM CONTROLS */}
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-200 select-none">
              <button
                type="button"
                onClick={() => applyZoomFactor(0.9)}
                className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-[11px]"
              >
                -
              </button>

              <div className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 text-[11px] min-w-[64px] text-center">
                {currentZoom.toFixed(2)}x
              </div>

              <button
                type="button"
                onClick={() => applyZoomFactor(1.1)}
                className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-[11px]"
              >
                +
              </button>
            </div>
          </main>

          {/* RIGHT: CONTROLS + PREVIEW */}
          <aside className="h-full bg-slate-950 border-l border-slate-800 flex flex-col">
            <div className="p-2 space-y-4 text-xs">
              {/* PREVIEW CARD */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 flex flex-col items-center gap-2">
                <div className="text-[11px] font-medium tracking-wide text-sky-600 uppercase">
                  Preview
                </div>
                <canvas
                  ref={previewCanvasRef}
                  width={PREVIEW_SIZE}
                  height={PREVIEW_SIZE}
                  className="w-64 h-64 rounded-xl"
                />
              </div>

              {/* BACKGROUND SETTINGS */}
              <div className="space-y-2">
                <div className="font-semibold text-sky-100 mb-1">
                  Background
                </div>

                {/* mode switch */}
                <div className="inline-flex rounded-md border border-slate-800 bg-slate-900 overflow-hidden text-[11px]">
                  <button
                    type="button"
                    onClick={() => setBgMode("color")}
                    className={`px-3 py-1 ${
                      bgMode === "color"
                        ? "bg-sky-500 text-slate-950"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    Color
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => setBgMode("image")}
                    className={`px-3 py-1 ${
                      bgMode === "image"
                        ? "bg-sky-500 text-slate-950"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    Image
                  </button> */}
                </div>

                {/* Color picker */}
                {bgMode === "color" && (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-slate-900 p-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-2 py-1 rounded-md border border-slate-700 bg-slate-900 text-[11px]"
                    />
                  </div>
                )}

                {/* Background image upload */}
                {/* {bgMode === "image" && (
                  <div className="space-y-1">
                    <label className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-sky-500 bg-slate-900 hover:bg-slate-800 cursor-pointer text-xs font-medium text-sky-100">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBgFileChange}
                      />
                      Upload Background Image
                    </label>
                    {!bgImageObj && (
                      <p className="text-[10px] text-slate-400">
                        Belum ada background image.
                      </p>
                    )}
                    {bgImageObj && (
                      <p className="text-[10px] text-slate-400">
                        Gunakan canvas & zoom untuk atur posisi background
                        (layer: Background).
                      </p>
                    )}
                  </div>
                )} */}
              </div>

              {/* LAYER SELECTION */}
              {/* <div>
                <div className="font-semibold text-sky-100 mb-1">
                  Edit Layer
                </div>
                <div className="inline-flex rounded-md border border-slate-800 bg-slate-900 overflow-hidden text-[11px]">
                  <button
                    type="button"
                    onClick={() => setActiveLayer("fg")}
                    className={`px-3 py-1 ${
                      activeLayer === "fg"
                        ? "bg-sky-500 text-slate-950"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    Foreground
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer("bg")}
                    disabled={bgMode !== "image" || !bgImageObj}
                    className={`px-3 py-1 ${
                      activeLayer === "bg"
                        ? "bg-sky-500 text-slate-950"
                        : "text-slate-300 hover:bg-slate-800"
                    } ${
                      bgMode !== "image" || !bgImageObj
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Background
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">
                  Layer aktif akan punya garis dan handle di canvas.
                </p>
              </div> */}

              {/* Upload Foreground */}
              <div>
                <div className="font-semibold text-sky-100 mb-1">
                  1. Foreground Image
                </div>
                <label className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-sky-500 bg-slate-900 hover:bg-slate-800 cursor-pointer text-xs font-medium text-sky-100">
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
                <div className="font-semibold text-sky-100 mb-1">
                  2. Selected Border
                </div>
                {selectedBorder && selectedBorder.id !== "none" ? (
                  <div className="flex items-center gap-2 text-[11px]">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
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
                    No border selected (default).
                  </div>
                )}
              </div>

              {/* DOWNLOAD */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-sky-100 uppercase">
                  Export Token
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => downloadImage("png")}
                    className="flex-1 px-3 py-2 rounded-md text-xs font-semibold tracking-wide bg-sky-500 hover:bg-sky-400 text-slate-950"
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadImage("webp")}
                    className="flex-1 px-3 py-2 rounded-md text-xs font-semibold tracking-wide bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  >
                    WEBP
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
