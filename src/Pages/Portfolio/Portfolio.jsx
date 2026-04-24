import NavBar from '../../NavBar'
import Footer from '../../Footer'

const rainColumns = Array.from({ length: 20 }, (_, index) => ({
	id: index,
	left: `${(index * 5.2) % 100}%`,
	duration: `${18 + (index % 6) * 2.4}s`,
	delay: `${(index % 5) * -2.1}s`,
	text: index % 2 === 0 ? '0101 // AI // API // CI/CD // CLOUD' : 'DEVHUB <> SCALE <> BUILD <> SHIP',
}))

function Portfolio() {
	return (
		<main className="bg-[#010101] text-slate-100">
			<NavBar />
			

			<section className="relative isolate overflow-hidden px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
				
				
				<div className="pointer-events-none absolute inset-0 -z-20 bg-[#010101]" aria-hidden="true" />
				

				<div className="pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden="true">
					{rainColumns.map((column) => (
						<div
							key={column.id}
							className="showcase-rain-col"
							style={{
								left: column.left,
								animationDuration: column.duration,
								animationDelay: column.delay,
							}}
						>
							{column.text}
						</div>
					))}
				</div>

				<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(76,29,149,0.3),rgba(29,78,216,0.18)_32%,transparent_70%)]" aria-hidden="true" />
				<div className="showcase-vignette pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

				<div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-6xl flex-col items-center justify-center text-center">
					<h1 className="max-w-5xl text-balance text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
						Building the <span className="showcase-gradient-text">Architecture</span> of <span className="showcase-gradient-text">Tomorrow</span>.
					</h1>

					<p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
						Explore our gallery of production-grade digital solutions, from AI-integrated platforms to high-performance SaaS ecosystems.
					</p>

					<a
						href="#showcase-grid"
						className="group absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-indigo-400/35 bg-slate-950/55 p-3 text-indigo-200 backdrop-blur-sm transition duration-300 hover:border-indigo-300/70 hover:text-white"
						aria-label="Scroll to showcase projects"
					>
						<svg
							viewBox="0 0 24 24"
							className="h-5 w-5 animate-bounce"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.9"
							aria-hidden="true"
						>
							<path d="M6 10.2L12 16l6-5.8" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</a>
				</div>
			</section>

			<section id="showcase-grid" className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-8 lg:px-10 lg:pb-24">
				<div className="rounded-2xl border border-slate-700/50 bg-slate-950/40 p-8 text-center backdrop-blur-md">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">Showcase</p>
					<h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Filterable Project Grid</h2>
					<p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
						Project cards and category filters can be placed here as the next section.
					</p>
				</div>
			</section>

			<Footer />
		</main>
	)
}

export default Portfolio
