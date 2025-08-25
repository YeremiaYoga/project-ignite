"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function FeatList({ feats }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-4 gap-2 px-2 py-2 text-[10px] sm:text-sm text-gray-200 bg-gray-700 sticky top-0 z-10 text-center">
        <div>Name</div>
        <div>Notes</div>
        <div>Tags</div>
        <div>Action</div>
      </div>

      <div className="divide-y divide-gray-700">
        {/* {feats.map((feat, idx) => (
          <FeatRow key={idx} feat={feat} />
        ))} */}
        {feats.length > 0 && <FeatRow feat={feats[0]} />}
      </div>
    </div>
  );
}

function FeatRow({ feat }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative text-gray-100 bg-gray-800 border-b border-gray-700">
      <div className="grid grid-cols-4 gap-2 items-center px-3 py-2 text-xs sm:text-sm">
        <div>
          <h2 className="font-semibold">{feat.name}</h2>
          <p className="text-[10px] text-gray-400 italic">{feat.source}</p>
        </div>
        <div className="text-center text-gray-300">{feat.notes || "—"}</div>
        <div className="text-center text-gray-300">
          {feat.tags && feat.tags.length > 0 ? feat.tags.join(", ") : "—"}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-full bg-orange-500 text-white hover:bg-orange-600"
          >
            {expanded ? <Minus size={12} /> : <Plus size={12} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 py-3 bg-gray-900 text-sm space-y-3">
          {feat.summary && (
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="text-orange-400 font-semibold">
                {feat.summary}
              </span>
              <span className="text-gray-300 italic">{feat.feat}</span>
            </div>
          )}

          {feat.prerequisite && (
            <p className="italic text-gray-300">
              <span className="font-semibold">Prerequisite: </span>
              {feat.prerequisite}
            </p>
          )}

          <div className="text-gray-200 leading-relaxed">
            {Array.isArray(feat.description) ? (
              feat.description.map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))
            ) : (
              <p>{feat.description}</p>
            )}
          </div>

          {feat.repeatable && (
            <p className="text-orange-300 italic">
              Repeatable: This feat can be taken more than once.
            </p>
          )}

          {feat.tags && (
            <div>
              <span className="font-semibold">Tags: </span>
              {feat.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded mr-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="pt-2">
            <Link href={`/feats/${feat.name.replace(/\s+/g, "_")}`}>
              <button className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-xs">
                View Details Page
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
