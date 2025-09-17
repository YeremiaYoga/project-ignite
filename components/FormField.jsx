"use client";

export default function FormField({ field, value, onChange, disabled }) {
  const commonProps = {
    name: field.name,
    value,
    onChange,
    placeholder: field.label,
    className: `w-full p-2 rounded border border-gray-700 ${
      disabled
        ? "bg-gray-800 text-gray-400 cursor-not-allowed" 
        : "bg-gray-800 text-white"
    }`,
    disabled,
  };

  return (
    <>
      {field.type === "textarea" ? (
        <textarea {...commonProps} />
      ) : (
        <input type={field.type || "text"} min={field.min} max={field.max} {...commonProps} />
      )}

      {disabled && <input type="hidden" name={field.name} value={value} />}
    </>
  );
}
