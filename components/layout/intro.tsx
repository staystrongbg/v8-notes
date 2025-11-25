export const Intro = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f5f7fb] via-white to-[#eef2ff] text-slate-900 dark:from-[#05060a] dark:via-[#0b1120] dark:to-[#05060a] dark:text-white">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#22d3ee]/50 blur-3xl dark:bg-[#22d3ee]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-[#c084fc]/60 blur-3xl dark:bg-[#a855f7]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.12),_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1),_transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 2xl:text-xl lg:text-lg xs:text-sm uppercase tracking-[0.8em] text-cyan-700/60 dark:text-cyan-200/80">
          Signal ϟ Online
        </p>
        <h1 className="cyber bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-6xl font-black tracking-wide text-transparent drop-shadow-[0_0_18px_rgba(79,70,229,0.35)] dark:from-cyan-200 dark:via-sky-400 dark:to-purple-400 dark:drop-shadow-[0_0_18px_rgba(56,189,248,0.65)] sm:text-7xl">
          Quantum
          <span className="ml-4 inline-flex text-slate-900 dark:text-white">
            Notes
          </span>
        </h1>
        <p className="mt-12 max-w-2xl 2xl:text-lg lg:text-md xs:text-sm text-slate-600/80 dark:text-slate-200/80">
          Capture signals from the void, sync across constellations, and keep
          your brightest ideas orbiting in one encrypted nebula.
        </p>

        <div className="mt-10 flex items-center gap-6 sm:text-sm text-xs text-slate-700 flex-row dark:text-cyan-100/80">
          <span className="inline-flex items-center gap-2 text-sky-500 dark:text-cyan-300">
            <span className="h-2 w-2 animate-ping rounded-full bg-sky-400 dark:bg-cyan-300" />
            Quantum sync active
          </span>
          <span className="inline-flex items-center gap-2 text-fuchsia-500 dark:text-purple-200 xl:text-2xl lg:text-xl xs:text-sm">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#f472b6] dark:bg-purple-400 dark:shadow-[0_0_10px_#c084fc]" />
            Zero-gravity editor
          </span>
        </div>
      </div>
    </section>
  );
};
