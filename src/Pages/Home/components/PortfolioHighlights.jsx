import heliosImage from '../../../assets/portfolio/Helios.png'
import novaAiImage from '../../../assets/portfolio/Nova-AI.png'
import quantumFintechImage from '../../../assets/portfolio/Quantum-FinTech-App.png'

const projects = [
	{
		category: 'Web App',
		title: 'Global Commerce Platform',
		stack: 'Next.js • Tailwind • AWS',
		description:
			'A high-volume e-commerce experience with intelligent product discovery, secure checkout, and multi-region deployment.',
		image: heliosImage,
		tint: 'from-cyan-500/30 via-slate-950/30 to-indigo-500/30',
	},
	{
		category: 'AI Product',
		title: 'Operations Intelligence Dashboard',
		stack: 'React • Python • OpenAI',
		description:
			'An AI-powered analytics cockpit that automates reporting workflows and surfaces actionable recommendations in real time.',
		image: novaAiImage,
		tint: 'from-indigo-500/35 via-slate-950/35 to-fuchsia-500/25',
	},
	{
		category: 'Mobile App',
		title: 'FinTech Wallet Suite',
		stack: 'React Native • Node.js • PostgreSQL',
		description:
			'A secure mobile finance platform with account insights, instant transfers, and fraud-aware transaction intelligence.',
		image: quantumFintechImage,
		tint: 'from-blue-500/30 via-slate-950/30 to-violet-500/30',
	},
]

function PortfolioHighlights() {
	return (
		<section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
			<div className="pointer-events-none absolute inset-0" />

			<div className="relative z-10 mx-auto max-w-7xl">
				<div className="max-w-3xl text-center sm:text-left">
					<h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						Our Featured Work
					</h2>
					<p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
						Explore how we help global brands scale through custom digital engineering.
					</p>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					{projects.map((project) => (
						<article
							key={project.title}
							className="group relative overflow-hidden rounded-3xl bg-slate-900/40 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.9)]"
						>
							<div className="relative h-64 overflow-hidden sm:h-72">
								<img
									src={project.image}
									alt={project.title}
									className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
								/>
								<div
									className={`absolute inset-0 bg-linear-to-b ${project.tint} opacity-80 transition-opacity duration-500 group-hover:opacity-95`}
								/>

								<span className="absolute left-5 top-5 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 backdrop-blur-sm">
									{project.category}
								</span>
							</div>

							<div className="relative p-4 sm:p-5 md:absolute md:inset-0 md:flex md:flex-col md:justify-end md:p-6">
								<div className="rounded-2xl bg-black/45 p-5 backdrop-blur-md transition-all duration-500 ease-out md:translate-y-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
									<h3 className="text-xl font-semibold text-white">{project.title}</h3>
									<p className="mt-2 text-sm font-medium text-indigo-200">{project.stack}</p>
									<p className="mt-3 text-sm leading-relaxed text-slate-200/90">{project.description}</p>

									<a
										href="#"
										className="mt-5 inline-flex items-center rounded-full border border-indigo-300/45 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 hover:scale-105 hover:border-indigo-300 hover:bg-indigo-500/30"
									>
										View Project
									</a>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default PortfolioHighlights
