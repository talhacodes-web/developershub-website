import ParticleBackground from '../../../ParticleBackground'

function Hero() {
	return (
		<section className="relative overflow-hidden px-6 pb-20 pt-16 text-center sm:px-8 lg:px-10 lg:pb-24 lg:pt-20">
			<ParticleBackground />
			
			<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
				<p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 sm:text-sm">
					Solutions
				</p>

				<h1 className="solutions-heading max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
					<span className="text-slate-200">Scalable</span> Solutions for a Digital-First World.
				</h1>

				<p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
					From complex SaaS architecture to AI-driven automation, we engineer the tools that power modern industry.
				</p>

				<div className="mt-12 w-full max-w-4xl">
					<div className="solutions-scene hidden md:block" aria-hidden="true">
						<div className="solutions-plane solutions-plane-back" />
						<div className="solutions-plane solutions-plane-mid" />
						<div className="solutions-plane solutions-plane-front" />
						<div className="solutions-axis" />

						<div className="solutions-node solutions-node-react">
							<span className="solutions-node-dot" />
							<span className="solutions-node-label">React</span>
						</div>
						<div className="solutions-node solutions-node-python">
							<span className="solutions-node-dot" />
							<span className="solutions-node-label">Python</span>
						</div>
						<div className="solutions-node solutions-node-aws">
							<span className="solutions-node-dot" />
							<span className="solutions-node-label">AWS</span>
						</div>

						<div className="solutions-center-core">
							<span className="solutions-core-inner" />
							<span className="solutions-core-ring" />
						</div>
					</div>

					<div className="solutions-mobile-visual md:hidden" aria-hidden="true">
						<svg viewBox="0 0 540 300" className="h-full w-full" role="img" aria-label="Solutions network illustration">
							<path d="M142 210L270 92L398 210" fill="none" stroke="#64748b" strokeWidth="3" opacity="0.6" />
							<path d="M168 228L270 130L372 228" fill="none" stroke="#94a3b8" strokeWidth="2.5" opacity="0.7" />
							<rect x="222" y="130" width="96" height="78" rx="14" fill="#0b1222" opacity="0.92" />
							<circle cx="270" cy="169" r="20" fill="#334155" opacity="0.5" />
							<circle cx="190" cy="212" r="10" fill="#94a3b8" opacity="0.85" />
							<circle cx="352" cy="212" r="10" fill="#94a3b8" opacity="0.85" />
							<circle cx="270" cy="244" r="10" fill="#cbd5e1" opacity="0.88" />
						</svg>
					</div>
				</div>

				<a
					href="#services-grid"
					className="group mt-12 inline-flex items-center gap-3 rounded-full border border-slate-500/45 px-7 py-3 text-sm font-semibold tracking-[0.06em] text-slate-100 transition duration-300 hover:border-slate-300 hover:text-slate-200"
				>
					<span>View All Services</span>
					<svg
						className="h-4 w-4 solutions-arrow"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</a>
			</div>
		</section>
	)
}

export default Hero
