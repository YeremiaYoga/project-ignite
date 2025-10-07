"use client";

import React, { useState, useMemo } from "react";
import { Plus, Eye, EyeOff } from "lucide-react";
import InputField from "@/components/InputField"; // <-- sesuaikan path
import AbilityEditor from "./AbilityEditor";
import AssetSelectField from "@/components/AssetSelectField";

const ALLOWED_TYPES = [
  "Basic",
  "Skill",
  "Talent",
  "Ultimate",
  "Passive",
  "Technique",
];
const ROLE_OPTIONS = ["support", "tank", "dps", "controller", "utility"];

const DEFAULT_FORM = {
  name: "",
  version: 1,
  img: "",

  good: false,
  neutral: false,
  evil: false,
  unknown: false,

  role: "",
  hp_scale: 0,
  cv_minimum: 0,
  cv_flat_cost: 0,
  cv_percent_cost: 0,
  ac_calc: "",
  intivative_bonus: 0,
  description: "",

  abilities: [],
};

const DEFAULT_ABILITY = () => ({
  visibility: true,
  type: "Basic",
  name: "",
  cost: "Action",
  additional_cost: "",
  type_ability: [],
  img: "",
  description: "",
});

export default function IncumbencyBuilderPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [open, setOpen] = useState({});

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateAbility = (idx, key, value) => {
    setForm((prev) => {
      const abilities = [...prev.abilities];
      abilities[idx] = { ...abilities[idx], [key]: value };
      return { ...prev, abilities };
    });
  };

  const usedTypes = useMemo(
    () => new Set(form.abilities.map((a) => a.type)),
    [form.abilities]
  );

  const addAbility = () => {
    const nextType = ALLOWED_TYPES.find((t) => !usedTypes.has(t));
    if (!nextType) return;
    const idx = form.abilities.length;
    setForm((prev) => ({
      ...prev,
      abilities: [...prev.abilities, { ...DEFAULT_ABILITY(), type: nextType }],
    }));
    setOpen((prev) => ({ ...prev, [idx]: true }));
  };

  const removeAbility = (idx) => {
    setForm((prev) => {
      const abilities = prev.abilities.filter((_, i) => i !== idx);
      return { ...prev, abilities };
    });
    setOpen((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  };

  const toggleOpen = (idx) => setOpen((p) => ({ ...p, [idx]: !p[idx] }));

  const allTypesUsed = ALLOWED_TYPES.every((t) => usedTypes.has(t));

  return (
    <div className="min-h-screen w-full max-w-6xl bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
      <div className=" p-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Incumbency Builder
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">General</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Name"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Harmonic Virtuoso"
              />

              <InputField
                label="Version"
                type="number"
                value={form.version}
                onChange={(v) => updateField("version", Number(v))}
              />

              <div className="md:col-span-2">
                <AssetSelectField
                  label="Image URL"
                  value={form.img}
                  onChange={(v) => updateField("img", v)}
                  initialPath="" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">
                  Disposition
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["good", "Good"],
                    ["neutral", "Neutral"],
                    ["evil", "Evil"],
                    ["unknown", "Unknown"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateField(key, !form[key])}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                        form[key]
                          ? "border-emerald-700 bg-emerald-600/20 text-emerald-200"
                          : "border-slate-700 bg-slate-800 text-slate-300"
                      }`}
                    >
                      {form[key] ? <Eye size={16} /> : <EyeOff size={16} />}{" "}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <InputField
                label="Role"
                type="select"
                value={form.role}
                onChange={(v) => updateField("role", v)}
                options={ROLE_OPTIONS}
                placeholder="Select role"
              />

              <InputField
                label="HP Scale"
                type="number"
                value={form.hp_scale}
                onChange={(v) => updateField("hp_scale", Number(v))}
              />

              <InputField
                label="CV Minimum"
                type="number"
                value={form.cv_minimum}
                onChange={(v) => updateField("cv_minimum", Number(v))}
              />

              <InputField
                label="CV Flat Cost"
                type="number"
                value={form.cv_flat_cost}
                onChange={(v) => updateField("cv_flat_cost", Number(v))}
              />

              <InputField
                label="CV Percent Cost"
                type="number"
                value={form.cv_percent_cost}
                onChange={(v) => updateField("cv_percent_cost", Number(v))}
              />

              <InputField
                className="md:col-span-2"
                label="AC Calc"
                value={form.ac_calc}
                onChange={(v) => updateField("ac_calc", v)}
                placeholder='e.g. "10 + Dexterity modifier"'
              />

              <InputField
                label="Initiative Bonus"
                type="number"
                value={form.intivative_bonus}
                onChange={(v) => updateField("intivative_bonus", Number(v))}
              />

              <div className="md:col-span-2">
                <InputField
                  label="Description"
                  type="textarea"
                  rows={4}
                  value={form.description}
                  onChange={(v) => updateField("description", v)}
                  placeholder="Description"
                />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Abilities</h2>
            <button
              onClick={addAbility}
              disabled={allTypesUsed}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                allTypesUsed
                  ? "cursor-not-allowed border-slate-700 bg-slate-800 text-slate-400"
                  : "border-emerald-700 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/30"
              }`}
              title={
                allTypesUsed
                  ? "All ability types are already used"
                  : "Add Ability"
              }
            >
              <Plus size={16} /> Add Ability
            </button>
          </div>

          {form.abilities.length === 0 && (
            <p className="text-sm text-slate-400">
              No abilities yet. Click "Add Ability" to start.
            </p>
          )}

          <div className="space-y-3">
            {form.abilities.map((ab, idx) => (
              <AbilityEditor
                key={idx}
                idx={idx}
                data={ab}
                open={!!open[idx]}
                onToggle={() => toggleOpen(idx)}
                onChange={(key, value) => updateAbility(idx, key, value)}
                onRemove={() => removeAbility(idx)}
                usedTypes={usedTypes}
                allowedTypes={ALLOWED_TYPES}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
