export default function CreatorWelcomePage() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="max-w-md text-center space-y-3">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Creator Panel
        </p>

        <h1 className="text-2xl font-semibold text-slate-100">
          Welcome to Creator Panel
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed">
          Select a tool from the left sidebar to start building your world
          timeline, eras, and events.
        </p>

        <div className="mt-6 text-xs text-slate-500">
          Ignite · World Builder
        </div>
      </div>
    </div>
  );
}
