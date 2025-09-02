"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import HyperlinkModal from "./HyperlinkModal";

export default function HyperlinkTable({ initialData, activeFile, reload }) {
  const [modal, setModal] = useState(null);
  const [keyValue, setKeyValue] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleAdd = async () => {
    await fetch(`/api/hyperlinks/${activeFile}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: keyValue, value: linkValue }),
    });
    setModal(null);
    reload();
  };

  const handleEdit = async () => {
    await fetch(`/api/hyperlinks/${activeFile}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldKey: modal.key,
        newKey: keyValue,
        value: linkValue,
      }),
    });
    setModal(null);
    reload();
  };

  const handleDelete = async () => {
    await fetch(`/api/hyperlinks/${activeFile}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: modal.key }),
    });
    setModal(null);
    reload();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  let filteredData = Object.entries(initialData || {}).filter(
    ([key, value]) =>
      key.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      value.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  filteredData.sort(([keyA], [keyB]) =>
    sortAsc ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA)
  );

  return (
    <div className="text-white">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-xl capitalize">{activeFile} Hyperlink</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setKeyValue("");
              setLinkValue("");
              setModal({ type: "add" });
            }}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 text-left">
              <div className="flex items-center gap-2">
                Key
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="p-1 rounded hover:bg-gray-600"
                >
                  <ArrowUpDown
                    size={16}
                    className={sortAsc ? "rotate-180 transition-transform" : ""}
                  />
                </button>
              </div>
            </th>
            <th className="p-2 text-left">Link</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(([key, value]) => (
            <tr key={key} className="border-t border-gray-700">
              <td className="p-2">{key}</td>
              <td className="p-2">
                <a
                  href={value}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  {value}
                </a>
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => {
                    setKeyValue(key);
                    setLinkValue(value);
                    setModal({ type: "edit", key });
                  }}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => setModal({ type: "delete", key, value })}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-400">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modal && (
        <HyperlinkModal
          type={modal.type === "delete" ? "delete" : "form"}
          title={
            modal.type === "add"
              ? "Add New Link"
              : modal.type === "edit"
              ? "Edit Link"
              : "Delete Link"
          }
          keyValue={keyValue}
          linkValue={linkValue}
          onKeyChange={setKeyValue}
          onLinkChange={setLinkValue}
          onSave={modal.type === "add" ? handleAdd : handleEdit}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
