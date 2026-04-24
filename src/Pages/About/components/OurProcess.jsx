import { useEffect, useMemo, useRef, useState } from 'react'

const processSteps = [
	{
		id: 'discovery',
		number: '01',
		title: 'Discovery & Roadmap Planning.',
		description: 'We align with your vision, analyzing requirements to engineer a strategic tech roadmap.',
		icon: 'discovery',
	},
	{
		id: 'architecture',
		number: '02',
		title: 'Scalable System Architecture.',
		description: 'Designing robust, secure, and extensible system structures built to handle future growth.',
		icon: 'architecture',
	},
	{
		id: 'development',
		number: '03',
		title: 'Agile Engineering & CI/CD.',
		description: 'Writing production-grade code in iterative sprints with Continuous Integration and Deployment.',
		icon: 'development',
	},
	{
		id: 'launch',
		number: '04',
		title: 'Deployment, Monitoring, & Growth.',
		description: 'Deploying to live production with active performance monitoring and scaling strategies.',
		icon: 'launch',
	},
]

function ProcessIcon({ type }) {
	if (type === 'discovery') {
		return (
			<svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="process-icon-svg">
				<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
				<path d="M16 16 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				<path d="m11 8.4 1 2 2.1.3-1.55 1.5.35 2.2L11 13.3l-1.9 1.1.35-2.2L7.9 10.7l2.1-.3 1-2Z" fill="currentColor" />
			</svg>
		)
	}

	if (type === 'architecture') {
		return (
			<svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="process-icon-svg">
				<rect x="3.5" y="3.5" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.7" />
				<rect x="15.5" y="3.5" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.7" />
				<rect x="9.5" y="15.5" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.7" />
				<path d="M8.5 6h7M6 8.5v4m12-4v4m-8.5 3h-3m11 0h-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
			</svg>
		)
	}

	if (type === 'development') {
		return (
			<svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="process-icon-svg">
				<rect x="2.8" y="4" width="18.4" height="14.2" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
				<path d="M6.8 10.2 5 12l1.8 1.8M11 15l2-6M15.2 10.2 17 12l-1.8 1.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M7 20h10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
			</svg>
		)
	}

	return (
		<svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="process-icon-svg">
			<path d="M4 14.5c1.9.2 4.8-.7 6.4-2.3 1.5-1.5 2.2-3.9 4-5.2 1.7-1.3 4.1-1.8 5.6-1.9-.1 1.6-.6 4.1-1.9 5.8-1.3 1.8-3.7 2.4-5.2 4-1.7 1.6-2.5 4.5-2.3 6.4-1.6-.4-3.8-1.7-5.1-3-1.4-1.3-2.6-3.5-3-5.1Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
			<path d="m13.1 10.9 1.9-1.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
		</svg>
	)
}

function OurProcess() {
	const [activeIndex, setActiveIndex] = useState(-1)
	const [hasAnimated, setHasAnimated] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const sectionNode = sectionRef.current
		if (!sectionNode) return undefined

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					setHasAnimated(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
		)

		observer.observe(sectionNode)

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!hasAnimated) return undefined

		setActiveIndex(0)
		let intervalId

		intervalId = window.setInterval(() => {
			setActiveIndex((prev) => {
				if (prev >= processSteps.length - 1) {
					window.clearInterval(intervalId)
					return prev
				}

				return prev + 1
			})
		}, 520)

		return () => window.clearInterval(intervalId)
	}, [hasAnimated])

	const progress = useMemo(() => {
		if (processSteps.length <= 1) return 0
		if (activeIndex < 0) return 0
		return (activeIndex / (processSteps.length - 1)) * 100
	}, [activeIndex])

	return (
		<section ref={sectionRef} className="process-section relative overflow-hidden bg-[#040814] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
			<div className="process-grid-overlay" aria-hidden="true" />

			<div className="relative z-10 mx-auto w-full max-w-7xl">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80 sm:text-sm">
						Our Process
					</p>
					<h2 className="mt-3 text-3xl font-black tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						End-to-End Engineering Workflow
					</h2>
					<p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
						A structured delivery system designed to move from strategic insight to scalable execution with precision.
					</p>
				</div>

				<div className="process-stepper mt-12 lg:mt-16" style={{ '--process-progress': `${progress}%` }}>
					<div className="process-track" aria-hidden="true">
						<span className="process-track-fill" />
					</div>

					<div className="process-steps-grid">
						{processSteps.map((step, index) => {
							const isSelected = index <= activeIndex
							const isCurrent = index === activeIndex

							return (
								<article
									key={step.id}
									className={`process-step ${isSelected ? 'is-selected' : ''} ${isCurrent ? 'is-current' : ''}`}
								>
									<div className="process-marker-wrap">
										<span className="process-step-number" aria-hidden="true">
											{index + 1}
										</span>
										<span className="process-icon-wrap" aria-hidden="true">
											<ProcessIcon type={step.icon} />
										</span>
									</div>

									<div className="process-content rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-md sm:p-6">
										<p className="text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/85 sm:text-[0.72rem]">
											Phase {step.number}
										</p>
										<h3 className="mt-2 text-lg font-bold leading-tight text-slate-100 sm:text-xl">{step.title}</h3>
										<p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{step.description}</p>
									</div>
								</article>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

export default OurProcess
