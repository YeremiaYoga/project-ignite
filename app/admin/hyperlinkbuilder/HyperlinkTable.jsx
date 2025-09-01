"use client";

import { useState } from "react";
import HyperlinkModal from "./HyperlinkModal";

export default function HyperlinkTable({ initialData, activeFile, reload }) {
  const [modal, setModal] = useState(null);
  const [keyValue, setKeyValue] = useState("");
  const [linkValue, setLinkValue] = useState("");

  // Tambah data
  const handleAdd = async () => {
    await fetch(`/api/hyperlinks/${activeFile}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: keyValue, value: linkValue }),
    });
    setModal(null);
    reload();
  };

  // Edit data
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

  // Delete data
  const handleDelete = async () => {
    await fetch(`/api/hyperlinks/${activeFile}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: modal.key }),
    });
    setModal(null);
    reload();
  };

  return (
    <div className="text-white">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-xl capitalize">{activeFile} Hyperlink</div>
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

      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Key</th>
            <th className="p-2">Link</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(initialData || {}).map(([key, value]) => (
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
