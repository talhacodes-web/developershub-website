import { useEffect, useRef, useState } from 'react'
import digitalServicesImage from '../../../assets/digital-services.jpg'

function TheAgency() {
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
			{ threshold: 0.25 },
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

			<div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
				<div
					className={`transition-all duration-700 ease-out ${
						isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<p className="mb-3 bg-linear-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-xs font-semibold uppercase tracking-[0.22em] text-transparent sm:text-sm">
						OUR MISSION
					</p>
					<h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						Engineering Digital Excellence with Purpose.
					</h2>
					<p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
						DevelopersHub is committed to building production-ready digital products that solve real business challenges, not just create visual impressions. We move beyond static designs to engineer robust platforms, scalable architectures, and dependable user experiences that perform under real-world demand. From product strategy to deployment, our teams focus on clean execution, measurable outcomes, and technology that grows with your vision.
					</p>

					<a
						href="/about"
						className="mt-8 inline-flex items-center rounded-xl border border-indigo-300/45 px-6 py-3 text-sm font-semibold text-indigo-200 transition-all duration-300 hover:scale-105 hover:border-indigo-400 hover:bg-indigo-500 hover:text-white"
					>
						Learn More
					</a>
				</div>

				<div
					className={`transition-all duration-700 ease-out lg:justify-self-end ${
						isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
					style={{ transitionDelay: '120ms' }}
				>
					<div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-24px_rgba(79,70,229,0.6)]">
						<img
							src={digitalServicesImage}
							alt="Modern collaborative engineering environment"
							className="h-80 w-full object-cover sm:h-95 lg:h-110"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TheAgency
