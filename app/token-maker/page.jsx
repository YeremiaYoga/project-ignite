"use client";

import { useEffect, useRef, useState } from "react";
import BorderList from "./components/BorderList";
import WorkspaceCanvas from "./components/WorkspaceCanvas";
import RightPanel from "./components/RightPanel";

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

export default function IgniteTokenMakerPage() {
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
      } catch (err) {
        console.error("❌ Failed to load token borders:", err);
        setBorderError("Failed to load token borders");
      } finally {
        setLoadingBorders(false);
      }
    }

    fetchBorders();
  }, []);


  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageFile(file);

    setFgOffset({ x: 0, y: 0 });
    setFgZoom(DEFAULT_ZOOM);
    setFgRotation(0);

    const img = new Image();
    img.onload = () => setImageObj(img);
    img.src = url;
  }


  function handleBgFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setBgOffset({ x: 0, y: 0 });
    setBgZoom(DEFAULT_ZOOM);
    setBgRotation(0);

    const img = new Image();
    img.onload = () => {
      setBgImageObj(img);
      setBgMode("image");
      setActiveLayer("bg");
    };
    img.src = url;
  }


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


  function drawBorder(ctx, scale = BORDER_SCALE) {
    if (!borderObj) return;
    const size = CANVAS_SIZE;

    const bw = size * scale;
    const bh = size * scale;
    const bx = (size - bw) / 2;
    const by = (size - bh) / 2;

    ctx.drawImage(borderObj, bx, by, bw, bh);
  }

  function renderWorkspace(ctx) {
    const size = CANVAS_SIZE;
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = bgColor || "#020617";
    ctx.fillRect(0, 0, size, size);

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
      if (activeLayer === "bg" && bgBoxRef.current) {
        bgBoxRef.current = null;
      }
    }

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

    drawBorder(ctx);

    const box = activeLayer === "bg" ? bgBoxRef.current : fgBoxRef.current;

    if (box) {
      const { x, y, w, h, cx, cy } = box;
      const handles = getHandlePositions({ x, y, w, h, cx, cy });

      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "#38bdf8";
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


  function renderTokenToCanvas(ctx, { withClip = true } = {}) {
    const size = CANVAS_SIZE;
    ctx.clearRect(0, 0, size, size);

    const radius = (size * BORDER_SCALE * INNER_FACTOR) / 2;

    if (withClip) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
      ctx.clip();
    }

    ctx.fillStyle = bgColor || "#020617";
    ctx.fillRect(0, 0, size, size);

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

    if (withClip) {
      ctx.restore();
    }

    drawBorder(ctx);
  }


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
          renderTokenToCanvas(tctx, { withClip: true });

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


  function downloadImage(type = "png") {
    if (!borderObj && !imageObj && !(bgMode === "image" && bgImageObj)) return;

    const previewCanvas = document.createElement("canvas");
    previewCanvas.width = CANVAS_SIZE;
    previewCanvas.height = CANVAS_SIZE;
    const pctx = previewCanvas.getContext("2d");
    if (!pctx) return;

    renderTokenToCanvas(pctx);

    const outCanvas = document.createElement("canvas");
    outCanvas.width = CANVAS_SIZE;
    outCanvas.height = CANVAS_SIZE;
    const octx = outCanvas.getContext("2d");
    if (!octx) return;

    octx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const scale = 1 / BORDER_SCALE;

    octx.save();
    octx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    octx.scale(scale, scale);
    octx.drawImage(
      previewCanvas,
      -CANVAS_SIZE / 2,
      -CANVAS_SIZE / 2,
      CANVAS_SIZE,
      CANVAS_SIZE
    );
    octx.restore();

    const mime = type === "webp" ? "image/webp" : "image/png";
    const ext = type === "webp" ? "webp" : "png";

    outCanvas.toBlob(
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

  function borderLabel(border) {
    if (!border) return "Unnamed";
    if (border.id === "none") return "No Border";
    return border.name || "Border";
  }

  // ===========================
  //  RENDER JSX (LAYOUT RESPONSIVE)
  // ===========================
  return (
    <div className="min-h-screen w-full text-slate-100 flex justify-center py-4 px-2 sm:py-6">
      <div className="w-full max-w-6xl h-auto md:h-[90vh] bg-[#020617] border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-800 flex items-center justify-between text-xs sm:text-sm">
          <div className="font-semibold tracking-wide uppercase text-sky-600">
            Ignite Token Maker
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex-1 grid grid-cols-1 md:[grid-template-columns:220px_minmax(0,1fr)_260px] gap-2 md:gap-0 h-full">
          {/* LEFT: BORDERS */}
          <div className="border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950 md:bg-transparent max-h-[260px] md:max-h-none overflow-y-auto">
            <BorderList
              borders={borders}
              loadingBorders={loadingBorders}
              borderError={borderError}
              selectedBorder={selectedBorder}
              onSelectBorder={setSelectedBorder}
              borderLabel={borderLabel}
            />
          </div>

          {/* CENTER: CANVAS WORKSPACE */}
          <WorkspaceCanvas
            canvasRef={canvasRef}
            currentZoom={currentZoom}
            applyZoomFactor={applyZoomFactor}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUpOrLeave={handleMouseUpOrLeave}
          />

          {/* RIGHT: CONTROLS + PREVIEW */}
          <RightPanel
            previewCanvasRef={previewCanvasRef}
            bgMode={bgMode}
            setBgMode={setBgMode}
            bgColor={bgColor}
            setBgColor={setBgColor}
            bgImageObj={bgImageObj}
            handleBgFileChange={handleBgFileChange}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
            imageFile={imageFile}
            handleFileChange={handleFileChange}
            selectedBorder={selectedBorder}
            borderLabel={borderLabel}
            downloadImage={downloadImage}
          />
        </div>
      </div>
    </div>
  );
}
