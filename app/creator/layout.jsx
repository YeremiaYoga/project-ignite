import LeftIconBar from "./components/LeftIconBar";
import CreatorMenuPanel from "./components/CreatorMenuPanel";

export default function CreatorLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <LeftIconBar />

      <div className="flex-1 flex h-full overflow-hidden">
        <CreatorMenuPanel />

        <main className="flex-1 p-6 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
