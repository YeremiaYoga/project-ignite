export default function RightPanel({
  previewCanvasRef,
  imageFile,
  onFileChange,
  selectedBorder,
  borderLabel,
  imageObj,
  borderObj, // masih dikirim kalau mau dipakai nanti
  onDownload,
}) {
  const isNone = !selectedBorder || selectedBorder.id === "none";
  const canDownload = !!imageObj; // boleh download walau tanpa border

  return (
    <aside className="h-full bg-slate-950 border-l border-slate-800 flex flex-col">
      <div className="p-2 space-y-4 text-xs">
        {/* PREVIEW CARD */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 flex flex-col items-center gap-2">
          <div className="text-[11px] font-medium tracking-wide text-sky-600 uppercase">
            Preview
          </div>
          <canvas
            ref={previewCanvasRef}
            width={260}
            height={260}
            className="w-64 h-64 rounded-xl"
          />
        </div>
        {/* Border Info */}
        <div>
          <div className="font-semibold text-sky-100 mb-1">
            1. Selected Border
          </div>

          {isNone ? (
            <div className="flex items-center gap-2 text-[11px]">
              <div className="w-8 h-8 rounded-full border border-dashed border-slate-500 shrink-0 flex items-center justify-center text-[9px] text-slate-400">
                none
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate">No Border</div>
                <div className="truncate text-slate-400">
                  Plain circle without frame
                </div>
              </div>
            </div>
          ) : selectedBorder ? (
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
                <div className="truncate">{borderLabel(selectedBorder)}</div>
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
        {/* Upload */}
        <div>
          <div className="font-semibold text-sky-100 mb-1">2. Choose Image</div>
          <label className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-sky-500 bg-slate-900 hover:bg-slate-800 cursor-pointer text-xs font-medium text-sky-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            Upload Image
          </label>
          {imageFile && (
            <div className="mt-1 text-[11px] text-slate-300 truncate">
              {imageFile.name}
            </div>
          )}
        </div>

        {/* Download */}

        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[11px] font-semibold text-sky-100 uppercase">
            Download Token
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onDownload("png")}
              disabled={!imageObj || !borderObj}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold tracking-wide
        ${
          imageObj && borderObj
            ? "bg-sky-500 hover:bg-sky-400 text-slate-200"
            : "bg-slate-700 text-slate-300 cursor-not-allowed"
        }`}
            >
              PNG
            </button>

            <button
              type="button"
              onClick={() => onDownload("webp")}
              disabled={!imageObj || !borderObj}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold tracking-wide
        ${
          imageObj && borderObj
            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-200"
            : "bg-slate-700 text-slate-300 cursor-not-allowed"
        }`}
            >
              WEBP
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
