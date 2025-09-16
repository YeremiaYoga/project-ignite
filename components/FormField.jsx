"use client";

export default function FormField({ field, value, onChange }) {
  const commonProps = {
    name: field.name,
    value,
    onChange,
    placeholder: field.label,
    className: "w-full p-2 bg-gray-800 rounded border border-gray-700",
  };

  if (field.type === "textarea") {
    return <textarea {...commonProps} />;
  }

  return <input type={field.type || "text"} min={field.min} max={field.max} {...commonProps} />;
}
