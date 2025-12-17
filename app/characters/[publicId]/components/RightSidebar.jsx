"use client";

export default function RightSidebar({
  name,
  type,
  role,
  portrait_url,
  token_url,
  activeImageTab,
  setActiveImageTab,
  activeInfoTab,
  setActiveInfoTab,
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

          {/* INFO TABS */}
          <div className="border-t border-slate-800 bg-[#050816]">
            <div className="flex border-b border-slate-800">
              {["Bio", "Relationship", "Details"].map((t) => {
                const isActive = activeInfoTab === t;
                return (
                  <button
                    key={t}
                    className={
                      isActive
                        ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                        : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
                    }
                    onClick={() => setActiveInfoTab(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="flex border-b border-slate-800">
              {["Combat", "Personality", "Meta-Data"].map((t) => {
                const isActive = activeInfoTab === t;
                return (
                  <button
                    key={t}
                    className={
                      isActive
                        ? "flex-1 px-3 py-2.5 text-xs md:text-sm font-medium bg-[#151a2b] text-[#f7ce8a]"
                        : "flex-1 px-3 py-2.5 text-xs md:text-sm text-slate-400 hover:text-slate-100 hover:bg-[#101323] transition"
                    }
                    onClick={() => setActiveInfoTab(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT */}
            <div className="p-5 space-y-5 bg-[#050816]">
              {activeInfoTab === "Bio" && (
                <div className="space-y-5">
                  {renderBioProfileTable()}
                  {renderBlocks(bioDataWithoutFactions)}
                </div>
              )}

              {activeInfoTab === "Relationship" &&
                renderRelationshipBlocks(combinedRelationshipData)}

              {activeInfoTab === "Details" && (
                <>
                  {renderDetailsProfileTable()}
                  {renderBlocks(detailsDataWithoutProfile)}
                </>
              )}

              {activeInfoTab === "Combat" && (
                <div className="space-y-5">
                  {renderAbilityScoresSection()}
                  {renderIncumbencySection()}
                  {renderCombatProfileTable()}
                  {renderBlocks(combatDataWithoutProfile)}
                </div>
              )}

              {activeInfoTab === "Personality" &&
                renderBlocks(personality_data)}

              {activeInfoTab === "Meta-Data" && renderMetaData()}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
