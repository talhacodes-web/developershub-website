import { useEffect, useRef, useState } from 'react'

const leaders = [
	{
		name: 'Ayesha Khan',
		title: 'Lead Architect',
		bio: 'Designs resilient product architecture with a focus on scale, latency, and long-term maintainability.',
		image: 'https://randomuser.me/api/portraits/women/44.jpg',
	},
	{
		name: 'Omar Siddiqui',
		title: 'Head of AI',
		bio: 'Specializing in neural network architecture and scalable cloud infrastructure.',
		image: 'https://randomuser.me/api/portraits/men/32.jpg',
	},
	{
		name: 'Mina Rahman',
		title: 'Creative Director',
		bio: 'Leads brand and interface direction that aligns visual storytelling with measurable product outcomes.',
		image: 'https://randomuser.me/api/portraits/women/65.jpg',
	},
	{
		name: 'Daniel Cortez',
		title: 'VP Engineering',
		bio: 'Builds high-performing teams and delivery systems for complex, mission-critical digital platforms.',
		image: 'https://randomuser.me/api/portraits/men/75.jpg',
	},
]

function Leadership() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const sectionNode = sectionRef.current

		if (!sectionNode) return undefined

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true)
						observer.disconnect()
					}
				})
			},
			{ threshold: 0.24, rootMargin: '0px 0px -10% 0px' },
		)

		observer.observe(sectionNode)

		return () => observer.disconnect()
	}, [])

	return (
		<section
			id="about-team-section"
			ref={sectionRef}
			className="leadership-section relative overflow-hidden bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
		>
			<div className="leadership-grid-overlay" aria-hidden="true" />

			<div className="relative z-10 mx-auto w-full max-w-7xl">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80 sm:text-sm">
						Meet the Leadership
					</p>
					<h2 className="mt-3 text-3xl font-black tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						The Minds Behind the Innovation
					</h2>
					<p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
						A team of architects, engineers, and creatives dedicated to scaling your digital future.
					</p>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{leaders.map((leader, index) => (
						<article
							key={leader.name}
							className={`leadership-card group rounded-3xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur-sm sm:p-6 ${
								isVisible ? 'is-active' : ''
							}`}
							style={{ transitionDelay: `${120 + index * 120}ms` }}
						>
							<div className="leadership-avatar-ring mx-auto">
								<div className="leadership-avatar-hex">
									<img src={leader.image} alt={`${leader.name} portrait`} loading="lazy" className="leadership-avatar-image" />
									<div className="leadership-avatar-tint" aria-hidden="true" />
								</div>
							</div>

							<div className="mt-5 text-center">
								<h3 className="text-lg font-bold text-slate-100">{leader.name}</h3>
								<p className="mt-1 text-sm font-medium text-cyan-200/85">{leader.title}</p>

								<p className="leadership-bio mt-4 text-sm leading-relaxed text-slate-300">{leader.bio}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Leadership
