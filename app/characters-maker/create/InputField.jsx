import { useState, useEffect, useRef } from "react";
import { Info } from "lucide-react";

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows = 4,
  options = [],
  disabled = false,
  hint = "", // 👉 hint baru
}) {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const filteredOptions =
    type === "selectSearch"
      ? options.filter((opt) =>
          (opt.label ?? opt)
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : options;

  const handleSelect = (opt) => {
    onChange(opt.value ?? opt);
    setQuery(opt.label ?? opt);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
          {label}
          {hint && (
            <div className="relative group">
              <Info size={14} className="text-gray-400 cursor-pointer" />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gray-800 text-gray-200 text-xs rounded-md px-2 py-1 shadow-lg z-20 whitespace-nowrap">
                {hint}
              </div>
            </div>
          )}
        </label>
      )}

      {/* === field types === */}
      {type === "selectSearch" ? (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              onChange("");
            }}
            onClick={() => setIsOpen(true)}
            placeholder={placeholder || "Search..."}
            disabled={disabled}
            className={`w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              disabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-400">No results found.</div>
              ) : (
                <ul>
                  {filteredOptions.map((opt) => (
                    <li
                      key={opt.value ?? opt}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-700 capitalize"
                      onClick={() => handleSelect(opt)}
                    >
                      {opt.label
                        ? opt.label.replace(/_/g, " ")
                        : opt.toString().replace(/_/g, " ")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => !disabled && onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`w-full p-3 rounded-lg border text-sm resize-none outline-none
            ${
              disabled
                ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-60"
                : "bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
            }`}
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => !disabled && onChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-3 rounded-lg border text-sm outline-none
    ${
      disabled
        ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-60"
        : "bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
    }`}
        >
          <option value="">{placeholder || "Please select"}</option>
          {options.map((opt) => (
            <option
              key={opt.value ?? opt}
              value={opt.value ?? opt}
              disabled={opt.disabled}
              className={`capitalize ${
                opt.disabled ? "text-gray-400 font-semibold" : ""
              }`}
            >
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => !disabled && onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full p-3 rounded-lg border text-sm outline-none
            ${
              disabled
                ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-60"
                : "bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
            }`}
        />
      )}
    </div>
  );
}
