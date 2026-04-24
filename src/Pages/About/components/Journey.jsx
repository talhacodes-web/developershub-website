import { useEffect, useRef, useState } from 'react'

const milestones = [
	{
		title: 'The Spark',
		phase: 'Phase 01',
		description:
			'Founded on the mission to simplify complex technology. We started by bridging the gap between raw code and intuitive user experiences.',
	},
	{
		title: 'Expansion',
		phase: 'Phase 02',
		description:
			'Scaling our expertise into AI Solutions, SaaS architecture, and automation, helping businesses transition into the digital-first era.',
	},
	{
		title: 'The Present',
		phase: 'Phase 03',
		description:
			'Leading a global team of 20+ experts. We are now a powerhouse for production-grade code, delivering innovation to clients worldwide.',
	},
]

function Journey() {
	const itemRefs = useRef([])
	const [activeItems, setActiveItems] = useState([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = Number(entry.target.getAttribute('data-index'))

					if (!Number.isNaN(index) && entry.isIntersecting) {
						setActiveItems((prev) => (prev.includes(index) ? prev : [...prev, index]))
					}
				})
			},
			{ threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
		)

		itemRefs.current.forEach((item) => {
			if (item) observer.observe(item)
		})

		return () => observer.disconnect()
	}, [])

	return (
		<section className="journey-section relative overflow-hidden bg-[#080b16] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
			<div className="journey-grid-overlay" aria-hidden="true" />

			<div className="relative z-10 mx-auto w-full max-w-6xl">
				<div className="text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80 sm:text-sm">
						Our Journey
					</p>
					<h2 className="mt-3 text-3xl font-black tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						Evolutionary Timeline
					</h2>
				</div>

				<div className="journey-timeline mt-12 lg:mt-16">
					{milestones.map((item, index) => {
						const isActive = activeItems.includes(index)
						const positionClass = index % 2 === 0 ? 'journey-card-left' : 'journey-card-right'

						return (
							<article
								key={item.phase}
								data-index={index}
								ref={(el) => {
									itemRefs.current[index] = el
								}}
								className={`journey-item ${positionClass} ${isActive ? 'is-active' : ''}`}
							>
								<div className="journey-node-wrap" aria-hidden="true">
									<span className="journey-phase-tag">{item.phase}</span>
									<span className="journey-node" />
								</div>

								<div className="journey-card rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-md sm:p-6">
									<h3 className="text-xl font-bold text-slate-100 sm:text-2xl">{item.title}</h3>
									<p className="mt-3 text-sm leading-relaxed text-slate-200/90 sm:text-base">{item.description}</p>
								</div>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Journey
