"use client";

export default function WorkspaceCanvas({
  canvasRef,
  currentZoom,
  applyZoomFactor,
  handleMouseDown,
  handleMouseMove,
  handleMouseUpOrLeave,
}) {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-slate-950 py-4 md:py-0">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 sm:p-3 shadow-inner">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="block bg-transparent cursor-default w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[640px] md:h-[640px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        />
      </div>

      {/* ZOOM CONTROLS */}
      <div className="mt-3 sm:mt-4 flex items-center gap-3 text-[11px] sm:text-xs text-slate-200 select-none">
        <button
          type="button"
          onClick={() => applyZoomFactor(0.9)}
          className="px-2 sm:px-3 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800"
        >
          -
        </button>

        <div className="px-2 sm:px-3 py-1 rounded-md border border-slate-700 bg-slate-900 min-w-[56px] sm:min-w-[64px] text-center">
          {currentZoom.toFixed(2)}x
        </div>

        <button
          type="button"
          onClick={() => applyZoomFactor(1.1)}
          className="px-2 sm:px-3 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800"
        >
          +
        </button>
      </div>
    </main>
  );
}
