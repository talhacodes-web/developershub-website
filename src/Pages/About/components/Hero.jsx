import ParticleBackground from '../../../ParticleBackground'

function Hero() {
	const handleScrollToTeam = () => {
		const nextSection = document.getElementById('about-team-section')

		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<section className="about-hero relative overflow-hidden bg-[#090B14] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<ParticleBackground />

			<div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
				<div className="text-center lg:text-left">
					<p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
						About Developers Hub Corporation
					</p>

					<h1 className="text-balance text-[clamp(2rem,6vw,4.8rem)] font-black leading-[1.04] tracking-tight text-slate-100">
						Pioneering the{' '}
						<span className="about-gradient-text">Next Frontier</span>{' '}
						of Digital Engineering.
					</h1>

					<div className="about-glass mt-6 rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md sm:mt-8 sm:p-6">
						<p className="text-pretty text-sm leading-relaxed text-slate-200/90 sm:text-base lg:text-lg">
							We bridge the gap between complex challenges and elegant solutions by integrating Advanced AI, Scalable Software Development, and Creative Design. Our mission is to engineer production-ready tools that redefine industry standards.
						</p>
					</div>

					<button
						type="button"
						onClick={handleScrollToTeam}
						className="group mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-cyan-200/15"
					>
						Meet the Team
						<span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
							{'->'}
						</span>
					</button>
				</div>

				<div className="hidden items-center justify-center lg:flex" aria-hidden="true">
					<div className="about-node-orb">
						<div className="about-orb-ring about-orb-ring-one" />
						<div className="about-orb-ring about-orb-ring-two" />
						<div className="about-glass-cube">
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
