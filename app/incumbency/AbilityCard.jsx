// components/AbilityCard.jsx
import { Shield } from "lucide-react"; // contoh icon

export default function AbilityCard({ icon: Icon, title, type, description }) {
  return (
    <div className="flex gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700">
      <div className="flex-shrink-0">
        <Icon className="w-8 h-8 text-green-400" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-100 text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{type}</p>
        <p className="mt-1 text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}
