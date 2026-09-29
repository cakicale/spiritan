export default function Home() {
  return (
    <main className="min-h-screen bg-[#090b10] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-8 md:px-10 md:py-10">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">SPIRITAN</div>

          <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/60">
            Pre-launch
          </span>
        </nav>

        <div className="max-w-4xl py-20">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Digital Games Retail
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Games you want.
            <br />
            Delivered digitally.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
            Spiritan is an upcoming digital games retailer focused on officially
            sourced digital products for players in Serbia and the wider Balkan
            region.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {["PlayStation", "Xbox", "Nintendo", "PC"].map((platform) => (
              <span
                key={platform}
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        <footer className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Spiritan</span>
          <a
            href="mailto:aleksandar.popovic311@gmail.com"
            className="transition hover:text-white"
          >
            aleksandar.popovic311@gmail.com
          </a>
        </footer>
      </section>
    </main>
  );
}