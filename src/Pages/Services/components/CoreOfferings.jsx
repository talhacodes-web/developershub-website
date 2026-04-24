const coreOfferings = [
	{
		id: 1,
		title: 'Software Development',
		focus: 'Full-stack Web, Mobile (iOS/Android), and Cloud-Native SaaS.',
		description: 'We build resilient digital foundations. From cross-platform mobile apps to complex multi-tenant SaaS architectures, our code is optimized for performance and global scale.',
		technologies: ['Next.js', 'React Native', 'Python', 'PostgreSQL', 'AWS', 'Kubernetes'],
		icon: '⚙️',
	},
	{
		id: 2,
		title: 'AI & Automation',
		focus: 'Custom LLM Integration, Workflow Automation, and Predictive Analytics.',
		description: 'Transforming data into intelligence. We implement custom LLM workflows and automated pipelines that eliminate manual bottlenecks and drive data-backed decision making.',
		technologies: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'Apache Airflow', 'Hugging Face'],
		icon: '🤖',
	},
	{
		id: 3,
		title: 'Digital Services',
		focus: 'Performance Marketing, UX/UI Design, and High-End Post-Production.',
		description: 'Where engineering meets creativity. We combine data-driven marketing strategies with world-class visual design and cinematic post-production for a complete digital presence.',
		technologies: ['Figma', 'Adobe Suite', 'Google Analytics', 'Framer', 'DaVinci Resolve', 'Webflow'],
		icon: '✨',
	},
]

function CoreOfferings() {
	return (
		<section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
			<div className="mb-16 text-center">
				<p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-300/80">Deep Dive</p>
				<h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Core Offerings</h2>
				<p className="mt-5 text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto">
					Comprehensive technical capabilities designed to power modern business transformation.
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-3">
				{coreOfferings.map((offering) => (
					<article
						key={offering.id}
						className="core-offering-card group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-[#111111] p-8 transition duration-500 hover:border-slate-500/70"
					>
						{/* Icon */}
						<div className="relative z-10 mb-6 inline-flex w-14 h-14 items-center justify-center rounded-xl bg-slate-800/60 text-2xl transition duration-500 group-hover:scale-110 group-hover:bg-slate-700/80">
							{offering.icon}
						</div>

						{/* Content */}
						<div className="relative z-10 flex flex-col flex-1">
							<h3 className="text-xl font-bold text-white mb-2">{offering.title}</h3>
							<p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300/80 mb-4">
								{offering.focus}
							</p>
							<p className="text-sm leading-relaxed text-slate-300 flex-1 mb-8">
								{offering.description}
							</p>
						</div>

						{/* Tech Stack Footer */}
						<div className="relative z-10 pt-6 border-t border-slate-700/40">
							<p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-3">
								Tech Stack
							</p>
							<div className="flex flex-wrap gap-2">
								{offering.technologies.map((tech) => (
									<span
										key={tech}
										className="inline-block px-3 py-1.5 rounded-full bg-slate-800/60 text-xs font-mono text-slate-300 border border-slate-700/60 transition duration-300 group-hover:bg-slate-700/70 group-hover:border-slate-500/70 group-hover:text-slate-100"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}

export default CoreOfferings
