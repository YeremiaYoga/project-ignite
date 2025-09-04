"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function FactionDetailPage() {
  const { factionName } = useParams();
  const [faction, setFaction] = useState(null);

  useEffect(() => {
    if (!factionName) return;
    fetch(`/api/factions/getByName?name=${factionName}`)
      .then((res) => res.json())
      .then((data) => setFaction(data))
      .catch((err) => console.error("Error fetching faction:", err));
  }, [factionName]);

  if (!faction) return <p className="text-center text-white">Loading...</p>;

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto text-gray-200">
      <h1 className="text-xl md:text-3xl font-bold mb-4">
        {faction.faction_name}
      </h1>

      <div className="grid grid-cols-10 md:grid-cols-3 gap-2">
        <div className="md:col-span-2 col-span-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Description</h2>
          <p className="leading-relaxed whitespace-pre-line mb-6 text-[10px] md:text-base">
            {faction.main_philosophy}
          </p>

          <h2 className="text-sm font-semibold mb-2 md:text-xl">Primary</h2>
          <p className="leading-relaxed mb-6 text-[10px] md:text-base">
            {faction.primary}
          </p>

          <h2 className="text-sm font-semibold mb-2 md:text-xl">
            General Base
          </h2>
          <p className="leading-relaxed mb-6 text-[10px] md:text-base">
            {faction.general_base}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {faction.allies?.length > 0 && (
              <div>
                <h2 className="text-sm md:text-lg font-semibold mb-2">
                  Allies
                </h2>
                <ul className="list-disc list-inside text-[10px] md:text-base text-gray-300">
                  {faction.allies.map((ally, i) => (
                    <li key={i}>{ally}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-sm  md:text-lg font-semibold mb-2">
                Enemies
              </h2>
              <ul className="list-disc list-inside text-[10px] md:text-base text-gray-300">
                {faction.enemies.map((enemy, i) => (
                  <li key={i}>{enemy}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm md:text-lg font-semibold mb-2">
                Sub Groups
              </h2>
              <ul className="list-disc list-inside text-[10px] md:text-base text-gray-300">
                {faction.sub_group.map((sg, i) => (
                  <li key={i}>{sg}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm  md:text-lg font-semibold mb-2">
                Off-shots
              </h2>
              <ul className="list-disc list-inside text-[10px] md:text-base text-gray-300">
                {faction.off_shot.map((os, i) => (
                  <li key={i}>{os}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm  md:text-lg font-semibold mb-2">
                Notable Members
              </h2>
              <ul className="list-disc list-inside text-[10px] md:text-base text-gray-300">
                {faction.notable_members.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm  md:text-lg font-semibold mb-2">
                Influence
              </h2>
              <ul className="list-disc list-inside text-[10px] md:text-base text-gray-300">
                {faction.influence.map((inf, i) => (
                  <li key={i}>{inf}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="bg-gray-900 border border-gray-700 rounded-xl p-4 h-fit md:col-span-1 col-span-4">
          <h2 className="md:text-lg font-bold border-b border-gray-700 pb-2 mb-4 text-sm">
            Faction Overview
          </h2>
          <div className="flex justify-center">
            {faction.logo && (
              <div className="w-32 h-32 relative mb-4 ">
                <Image
                  src={`/${faction.logo}`}
                  alt={`${faction.faction_name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <dl className="grid grid-cols-5 gap-x-4 gap-y-2 text-[8px] md:text-sm">
            <dt className="font-semibold col-span-2 text-right">Group Type</dt>
            <dd className="col-span-3 break-words">{faction.group_type}</dd>

            <dt className="font-semibold col-span-2 text-right">
              Legal Standing
            </dt>
            <dd className="col-span-3 break-words">{faction.legal_standing}</dd>

            <dt className="font-semibold col-span-2 text-right">Ownership</dt>
            <dd className="col-span-3 break-words">{faction.ownership}</dd>

            <dt className="font-semibold col-span-2 text-right">Alignment</dt>
            <dd className="col-span-3 break-words">
              {faction.alignment_long} ({faction.alignment})
            </dd>

            <dt className="font-semibold col-span-2 text-right">Symbol</dt>
            <dd className="col-span-3 break-words">{faction.symbol}</dd>

            <dt className="font-semibold col-span-2 text-right">Ranks</dt>
            <dd className="col-span-3 whitespace-pre-line break-words">
              {faction.ranks.join("\n")}
            </dd>

            <dt className="font-semibold col-span-2 text-right">Founder</dt>
            <dd className="col-span-3 break-words">{faction.founder}</dd>

            <dt className="font-semibold col-span-2 text-right">
              Current Leader
            </dt>
            <dd className="col-span-3 break-words">{faction.current_leader}</dd>

            <dt className="font-semibold col-span-2 text-right">Main Base</dt>
            <dd className="col-span-3 break-words">{faction.main_base}</dd>

            <dt className="font-semibold col-span-2 text-right">
              Founding Date
            </dt>
            <dd className="col-span-3 break-words">{faction.founding_date}</dd>

            <dt className="font-semibold col-span-2 text-right">Membership</dt>
            <dd className="col-span-3 break-words">{faction.membership}</dd>
          </dl>
        </aside>
      </div>
    </main>
  );
}
