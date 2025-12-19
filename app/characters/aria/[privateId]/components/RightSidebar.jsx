"use client";

export default function RightSidebar({
  name,
  type,
  role,
  portrait_url,
  token_url,
  activeImageTab,
  setActiveImageTab,
  // activeInfoTab,
  // setActiveInfoTab,
  renderBioProfileTable,
  renderBlocks,
  renderRelationshipBlocks,
  renderDetailsProfileTable,
  renderMetaData,
  renderAbilityScoresSection,
  renderIncumbencySection,
  renderCombatProfileTable,
  bioDataWithoutFactions,
  combinedRelationshipData,
  detailsDataWithoutProfile,
  combatDataWithoutProfile,
  personality_data,
}) {
  return (
    <aside className="lg:col-span-1">
      <div className="lg:sticky lg:top-24">
        <div className="bg-[#0b1120] border border-slate-800 rounded-lg overflow-hidden shadow-lg">
          {/* HEADER CARD */}
          <div className="bg-gradient-to-b from-[#151a2b] to-[#0b1120] border-b border-slate-800 px-4 py-3 text-center">
            <div className="text-[11px] text-slate-400 mb-1 uppercase tracking-[0.2em]">
              {type || "NPC"}
            </div>
            <div className="text-2xl text-[#f7ce8a] leading-tight">{name}</div>
            {role && <div className="text-xs text-[#f4b974] mt-1">{role}</div>}
          </div>

          {/* PORTRAIT / TOKEN TABS */}
          <div className="flex border-b border-slate-800 bg-[#050816]">
            <button
              className={
                activeImageTab === "portrait"
                  ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                  : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
              }
              onClick={() => setActiveImageTab("portrait")}
            >
              Portrait
            </button>
            <div className="w-px bg-slate-800" />
            <button
              className={
                activeImageTab === "token"
                  ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                  : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
              }
              onClick={() => setActiveImageTab("token")}
            >
              Token
            </button>
          </div>

          {/* IMAGE CONTENT */}
          <div className="p-4 bg-[#050816]">
            <div className="bg-[#0b1120] rounded-lg border border-slate-800/80 p-1 shadow-inner">
              {activeImageTab === "portrait" && portrait_url && (
                <img
                  src={portrait_url}
                  alt={name}
                  className="w-full rounded-md border border-slate-900 object-cover"
                />
              )}
              {activeImageTab === "token" && token_url && (
                <img
                  src={token_url}
                  alt={`${name} token`}
                  className="w-full rounded-md border border-slate-900 object-cover"
                />
              )}
            </div>
          </div>

          {/* ALL INFO SECTIONS (NO TABS) */}
          <div className="border-t border-slate-800 bg-[#050816]">
            <div className="p-5 space-y-6 bg-[#050816]">
              {/* BIO */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  Bio
                </h3>
                {renderBioProfileTable()}
                {renderBlocks(bioDataWithoutFactions)}
              </section>

              {/* RELATIONSHIP */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  Relationship
                </h3>
                {renderRelationshipBlocks(combinedRelationshipData)}
              </section>

              {/* DETAILS */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  Details
                </h3>
                {renderDetailsProfileTable()}
                {renderBlocks(detailsDataWithoutProfile)}
              </section>

              {/* COMBAT */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  Combat
                </h3>
                {renderAbilityScoresSection()}
                {renderIncumbencySection()}
                {renderCombatProfileTable()}
                {renderBlocks(combatDataWithoutProfile)}
              </section>

              {/* PERSONALITY */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  Personality
                </h3>
                {renderBlocks(personality_data)}
              </section>

              {/* META-DATA */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  Meta-Data
                </h3>
                {renderMetaData()}
              </section>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
