import * as Lucide from "lucide-react";

export default function LabelWithHint({
  label,
  icon = "info",
  text = "No description provided.",
  iconSize = 18,
  iconColor = "text-gray-400",
  tooltipWidth = "w-80",
  className = "",
}) {
  // Ambil ikon lucide berdasarkan nama string
  const IconComponent =
    Lucide[
      Object.keys(Lucide).find(
        (key) =>
          key.toLowerCase() === icon.replace(/[-_]/g, "").toLowerCase()
      )
    ] || Lucide.Info;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <label className="text-sm font-medium">{label}</label>

      <div className="relative group flex items-center">
        <IconComponent
          size={iconSize}
          className={`${iconColor} cursor-pointer transition-colors duration-200 group-hover:text-blue-600`}
        />

        {/* Tooltip di kanan, sejajar bawah icon */}
        <div
          className={`absolute left-full bottom-0 ml-2
          hidden group-hover:block transition-all duration-150 opacity-0
          group-hover:opacity-100 group-hover:translate-x-[2px]
          bg-gray-800 text-gray-200 text-xs rounded-md px-3 py-2 shadow-lg z-20 ${tooltipWidth}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
