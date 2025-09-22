import { useState, useEffect, useRef } from "react";

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows = 4,
  options = [],
  disabled = false,
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
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

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
      ) : type === "selectImage" ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className={`w-full flex items-center gap-2 p-2 rounded-md border text-left
      ${
        disabled
          ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-60"
          : "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
      }`}
          >
            {value ? (
              <>
                {options.find((o) => (o.value ?? o) === value)?.image && (
                  <img
                    src={options.find((o) => (o.value ?? o) === value).image}
                    alt={
                      options.find((o) => (o.value ?? o) === value).label ??
                      value
                    }
                    className="w-5 h-5 rounded"
                  />
                )}
                <span>
                  {options.find((o) => (o.value ?? o) === value)?.label ??
                    value}
                </span>
              </>
            ) : (
              <span className="text-gray-400">
                {placeholder || "Please select"}
              </span>
            )}
          </button>

          {isOpen && (
            <div
              className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto
                 w-64"
            >
              {options.map((opt) => (
                <div
                  key={opt.value ?? opt}
                  onClick={() => {
                    onChange(opt.value ?? opt);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700"
                >
                  {opt.image && (
                    <img
                      src={opt.image}
                      alt={opt.label ?? opt}
                      className="w-8 h-8 rounded"
                    />
                  )}
                  <span className="text-base font-medium">
                    {opt.label ?? opt}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : type === "buttonGroup" ? (
        <div className="flex gap-2">
          {options.map((opt) => (
            <button
              key={opt.value ?? opt}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(opt.value ?? opt)}
              className={`flex-1 p-3 rounded-lg border text-sm
                ${
                  disabled
                    ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed opacity-60"
                    : value === (opt.value ?? opt)
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
            >
              {opt.label ?? opt}
            </button>
          ))}
        </div>
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
