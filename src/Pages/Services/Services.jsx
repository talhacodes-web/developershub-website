import Footer from '../../Footer'
import NavBar from '../../NavBar'
import Hero from './components/Hero'
import CoreOfferings from './components/CoreOfferings'
import ServiceWorkflow from './components/ServiceWorkflow'
import TechEcosystem from './components/TechEcosystem'
import ServicesFinalCTA from './components/ServicesFinalCTA'

const serviceCards = [
	{
		title: 'Cloud-Native Platforms',
		description: 'Distributed architectures engineered for reliability, velocity, and continuous scale.',
	},
	{
		title: 'AI Workflow Automation',
		description: 'Data-powered systems that reduce operational drag and deliver measurable outcomes.',
	},
	{
		title: 'Product Engineering',
		description: 'End-to-end software delivery from UX strategy to resilient production deployments.',
	},
	{
		title: 'DevOps Acceleration',
		description: 'CI/CD, observability, and platform tooling that keep teams shipping with confidence.',
	},
	{
		title: 'Integration Modernization',
		description: 'API ecosystems and service orchestration that unify legacy and modern stacks.',
	},
	{
		title: 'Security by Design',
		description: 'Threat-aware engineering and governance patterns embedded across your SDLC.',
	},
]

function Services() {
	return (
		<main className="bg-slate-950 text-slate-100">
			<NavBar />
			<Hero />
			<CoreOfferings />
			<ServiceWorkflow />
			<TechEcosystem />

			<section id="services-grid" className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-8 lg:px-10 lg:pb-24">
				<div className="mb-10 text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/80">Core Capabilities</p>
					<h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Engineering Services Built to Scale</h2>
				</div>

				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{serviceCards.map((card) => (
						<article
							key={card.title}
							className="rounded-2xl border border-slate-700/60 bg-slate-950/40 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300/60"
						>
							<h3 className="text-lg font-semibold text-slate-100">{card.title}</h3>
							<p className="mt-3 text-sm leading-relaxed text-slate-300">{card.description}</p>
						</article>
					))}
				</div>
			</section>

			<ServicesFinalCTA />

			<Footer />
		</main>
	)
}

export default Services
