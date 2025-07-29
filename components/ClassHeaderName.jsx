import Image from "next/image";

export default function ClassHeader({ className }) {
  const normalized = className.toLowerCase().replace(/\s+/g, "_");
  const capitalized = className.charAt(0).toUpperCase() + className.slice(1);
  return (
    <header className="flex items-center gap-3 border-b border-gray-700 pb-2">
      <Image
        src={`/assets/classIcon/${normalized}_icon.webp`}
        alt={`${capitalized} Icon`}
        width={40}
        height={40}
        className="object-contain"
      />
      <h1 className="text-4xl font-bold text-blue-400">{capitalized}</h1>
    </header>
  );
}
