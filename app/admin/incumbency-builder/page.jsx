"use client";

import { useEffect, useState, useCallback } from "react";
import IncumbencyForm from "./IncumbencyForm";

export default function IncumbencyMainPage() {
  const [mode, setMode] = useState("create");
  const [all, setAll] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [selected, setSelected] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch("/api/incumbency/getAllDataAllVersion", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAll(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch:", e);
    }
  }, []);

  useEffect(() => {
    if (mode === "edit") fetchAll();
    setSelectedKey("");
    setSelected(null);
    setFormKey((k) => k + 1);
  }, [mode, fetchAll]);

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedKey(val);

    if (!val) {
      setSelected(null);
      setFormKey((k) => k + 1);
      return;
    }

    const [nm, vs] = val.split("::");
    const obj = all.find(
      (x) => x.name === nm && String(x.version ?? 1) === String(vs)
    );
    setSelected(obj || null);
    setFormKey((k) => k + 1);
  };

  const handleSave = async (form) => {
    try {
      setSaving(true);
      const res = await fetch("/api/incumbency/saveData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed");

      alert("Saved successfully");
      if (mode === "edit") {
        await fetchAll();
        const newKey = `${form.name}::${form.version ?? 1}`;
        setSelectedKey(newKey);
        const refreshed = (
          Array.isArray(result?.data) ? result.data : all
        ).find((x) => `${x.name}::${x.version ?? 1}` === newKey);
        setSelected(refreshed || form);
        setFormKey((k) => k + 1);
      }
    } catch (e) {
      alert(`Save failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Incumbency Manager
        </h1>
      </header>

      <div className="mb-4 inline-flex rounded-lg border border-slate-700 overflow-hidden">
        <button
          onClick={() => setMode("create")}
          className={`px-4 py-2 text-sm transition ${
            mode === "create"
              ? "bg-emerald-600/20 text-emerald-200 border-r border-slate-700"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-r border-slate-700"
          }`}
        >
          Create
        </button>
        <button
          onClick={() => setMode("edit")}
          className={`px-4 py-2 text-sm transition ${
            mode === "edit"
              ? "bg-blue-600/20 text-blue-200"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Edit
        </button>
      </div>

      {mode === "create" ? (
        <IncumbencyForm
          key={`create-${formKey}`}
          mode="create"
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <label className="block text-sm font-medium mb-2">
              Select Incumbency
            </label>

            <select
              value={selectedKey}
              onChange={handleSelectChange}
              className="w-full p-3 rounded-lg border text-sm outline-none bg-[#0a1040] border-[#2a2f55] focus:ring-1 focus:ring-[#6670ff]"
            >
              <option value="">-- Choose one --</option>
              {all
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((it) => {
                  const id = `${it.name}::${it.version ?? 1}`;
                  return (
                    <option key={id} value={id}>
                      {it.name} {it.version ? `(v${it.version})` : ""}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* FORM di BAWAH */}
          {selected ? (
            <IncumbencyForm
              key={`edit-${formKey}-${selectedKey}`}
              mode="edit"
              initialData={selected}
              onSave={handleSave}
              saving={saving}
            />
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
              Choose an item above to edit
            </div>
          )}
        </div>
      )}
    </div>
  );
}
