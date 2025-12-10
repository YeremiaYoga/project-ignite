"use client";

export default function RightPanel({
  previewCanvasRef,
  bgMode,
  setBgMode,
  bgColor,
  setBgColor,
  bgImageObj,
  handleBgFileChange,
  activeLayer,
  setActiveLayer,
  imageFile,
  handleFileChange,
  selectedBorder,
  borderLabel,
  downloadImage,
}) {
  return (
    <aside className="h-full bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
      <div className="p-2 sm:p-3 space-y-3 sm:space-y-4 text-[11px] sm:text-xs">
        {/* PREVIEW CARD */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 flex flex-col items-center gap-2">
          <div className="text-[10px] sm:text-[11px] font-medium tracking-wide text-sky-600 uppercase">
            Preview
          </div>
          <canvas
            ref={previewCanvasRef}
            width={260}
            height={260}
            className="w-34 h-34 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-xl"
          />
        </div>

        {/* BACKGROUND SETTINGS */}
        <div className="space-y-2">
          <div className="font-semibold text-sky-100 mb-1">Background</div>

          <div className="inline-flex rounded-md border border-slate-800 bg-slate-900 overflow-hidden text-[10px] sm:text-[11px]">
            <button
              type="button"
              onClick={() => setBgMode("color")}
              className={`px-2 sm:px-3 py-1 ${
                bgMode === "color"
                  ? "bg-sky-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Color
            </button>
            <button
              type="button"
              onClick={() => setBgMode("image")}
              className={`px-2 sm:px-3 py-1 ${
                bgMode === "image"
                  ? "bg-sky-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Image
            </button>
          </div>

          {bgMode === "color" && (
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-slate-700 bg-slate-900 p-0"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 px-2 py-1 rounded-md border border-slate-700 bg-slate-900 text-[10px] sm:text-[11px]"
              />
            </div>
          )}

          {bgMode === "image" && (
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
              {!bgImageObj ? (
                <p className="text-[10px] text-slate-400">
                  No background image added.
                </p>
              ) : (
                <p className="text-[10px] text-slate-400">
                  Adjust background using canvas & zoom (Background Layer).
                </p>
              )}
            </div>
          )}
        </div>

        {/* LAYER SELECTION */}
        <div>
          <div className="font-semibold text-sky-100 mb-1">Edit Layer</div>
          <div className="inline-flex rounded-md border border-slate-800 bg-slate-900 overflow-hidden text-[10px] sm:text-[11px]">
            <button
              type="button"
              onClick={() => setActiveLayer("fg")}
              className={`px-2 sm:px-3 py-1 ${
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
              className={`px-2 sm:px-3 py-1 ${
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
          <p className="mt-1 text-[9px] sm:text-[10px] text-slate-500">
            The active layer will show outlines and handles on the canvas.
          </p>
        </div>

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
            <div className="mt-1 text-[10px] sm:text-[11px] text-slate-300 truncate">
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
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                {selectedBorder.image_url && (
                  <img
                    src={selectedBorder.image_url}
                    alt={selectedBorder.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate">{borderLabel(selectedBorder)}</div>
                {selectedBorder.description && (
                  <div className="truncate text-slate-400">
                    {selectedBorder.description}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-[10px] sm:text-[11px] text-slate-400">
              No border selected (default).
            </div>
          )}
        </div>

        {/* DOWNLOAD */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] sm:text-[11px] font-semibold text-sky-100 uppercase">
            Export Token
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
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
  );
}
