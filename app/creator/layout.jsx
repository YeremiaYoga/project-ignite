import CreatorSideNav from "./components/CreatorSideNav";

export default function CreatorLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <CreatorSideNav />

      <main className="flex-1 md:p-6 overflow-hidden">{children}</main>
    </div>
  );
}
