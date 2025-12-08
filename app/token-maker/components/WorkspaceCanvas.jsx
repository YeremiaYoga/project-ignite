export default function WorkspaceCanvas({
  canvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUpOrLeave,
  zoom,
  applyZoomFactor,
}) {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-slate-950">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-inner">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="block bg-transparent cursor-default w-[640px] h-[640px]"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        />
      </div>

      {/* ZOOM CONTROLS */}
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-200">
        <button
          type="button"
          onClick={() => applyZoomFactor(0.9)}
          className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-[11px]"
        >
          -
        </button>
        <div className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 text-[11px] min-w-[64px] text-center">
          {zoom.toFixed(2)}x
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
  );
}
