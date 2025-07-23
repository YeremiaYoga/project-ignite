"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleSection({ title, children, level }) {
  const [open, setOpen] = useState(true);
  const HeadingTag = `h2`;

  return (
    <section>
      <div
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={() => setOpen(!open)}
      >
        <HeadingTag className="text-blue-300 font-semibold text-xl md:text-2xl">
          Level {level}: {title}
        </HeadingTag>
        {open ? (
          <ChevronUp className="text-blue-300" />
        ) : (
          <ChevronDown className="text-blue-300" />
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}
