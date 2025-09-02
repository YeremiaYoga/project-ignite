import FactionList from "./FactionList";

export default function FactionsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Factions</h1>
      <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
        <FactionList />
      </div>
    </main>
  );
}
