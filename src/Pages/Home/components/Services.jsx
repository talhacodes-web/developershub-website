import { ArrowUpRight, Code2, Megaphone, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const services = [
	{
		title: 'Software Development',
		description: 'Web, Mobile, and SaaS development tailored for scalability.',
		icon: Code2,
		glow: 'hover:border-cyan-300/55 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_22px_40px_-26px_rgba(34,211,238,0.75)]',
	},
	{
		title: 'AI & Automation',
		description: 'Cutting-edge AI Solutions, Automation, and Intelligent Content Generation.',
		icon: Sparkles,
		glow: 'hover:border-indigo-300/55 hover:shadow-[0_0_0_1px_rgba(129,140,248,0.35),0_22px_40px_-26px_rgba(129,140,248,0.75)]',
	},
	{
		title: 'Digital & Post Production',
		description: 'Strategic Digital Marketing and high-quality Post Production services.',
		icon: Megaphone,
		glow: 'hover:border-fuchsia-300/55 hover:shadow-[0_0_0_1px_rgba(232,121,249,0.35),0_22px_40px_-26px_rgba(232,121,249,0.75)]',
	},
]

function Services() {
	const sectionRef = useRef(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const sectionElement = sectionRef.current
		if (!sectionElement) return undefined

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.2 },
		)

		observer.observe(sectionElement)

		return () => observer.disconnect()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
		>
			<div className="pointer-events-none absolute inset-0" />

			<div
				className={`relative z-10 mx-auto max-w-7xl transition-all duration-700 ease-out ${
					isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
				}`}
			>
				<div className="mx-auto max-w-3xl text-center">
					<p className="mb-3 bg-linear-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-xs font-semibold uppercase tracking-[0.22em] text-transparent sm:text-sm">
						OUR EXPERTISE
					</p>
					<h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						Comprehensive Tech Solutions
					</h2>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
					{services.map((service, index) => {
						const Icon = service.icon

						return (
							<article
								key={service.title}
								className={`flex h-full min-h-72 flex-col rounded-2xl bg-white/4 p-7 backdrop-blur-md transition-all duration-200 ${service.glow} ${
									isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
								} hover:-translate-y-2.5`}
								style={{ transitionDelay: `${index * 30}ms` }}
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
									<Icon className="h-6 w-6 text-slate-100" strokeWidth={2.1} />
								</div>

								<h3 className="mt-6 text-xl font-semibold text-slate-100">{service.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-slate-300">{service.description}</p>

								<a
									href="#"
									className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-slate-300 transition-colors duration-300 hover:text-indigo-200"
								>
									Explore Service
									<ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
								</a>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Services
