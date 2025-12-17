"use client";

export default function LeftChapters({ chapters = [], side_notes = "" }) {
  return (
    <div className="space-y-4">
      {chapters.map((ch, idx) => (
        <section
          key={`ch-${idx}`}
          className="bg-[#0b1120] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm"
        >
          <header className="bg-[#121829] border-b border-slate-800 px-6 py-2.5">
            <h2 className="text-sm md:text-[15px] font-semibold text-[#f4b974]">
              {ch.title}
            </h2>
          </header>
          <div className="px-6 py-4">
            <p className="text-[13px] md:text-[14px] text-slate-200 whitespace-pre-line leading-relaxed">
              {ch.body}
            </p>
          </div>
        </section>
      ))}

      {side_notes && (
        <section className="bg-[#0b1120] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
          <header className="bg-[#121829] border-b border-slate-800 px-6 py-2.5">
            <h2 className="text-sm md:text-[15px] font-semibold text-[#f4b974]">
              Side Notes
            </h2>
          </header>

          <div className="px-6 py-4">
            <p className="text-[13px] md:text-[14px] text-slate-200 whitespace-pre-line leading-relaxed">
              {side_notes}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
