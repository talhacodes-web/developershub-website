import { useEffect, useMemo, useRef, useState } from 'react'

const stages = [
	{
		id: 'audit',
		title: 'Technical Discovery',
		description:
			'We perform a deep-dive audit of existing systems and project requirements to map constraints and opportunities.',
		icon: AuditIcon,
	},
	{
		id: 'strategy',
		title: 'Architecture Strategy',
		description:
			'We define a delivery roadmap, choose the right stack, and align milestones with measurable business outcomes.',
		icon: StrategyIcon,
	},
	{
		id: 'execution',
		title: 'Build Execution',
		description:
			'We engineer core features in iterative sprints with CI-driven validation, secure integration, and release-ready code.',
		icon: ExecutionIcon,
	},
	{
		id: 'optimization',
		title: 'Performance QA',
		description:
			'Final stress-testing and speed optimization ensure a flawless production launch with production-grade reliability.',
		icon: OptimizationIcon,
	},
]

function ServiceWorkflow() {
	const sectionRef = useRef(null)
	const rafRef = useRef(null)
	const [progress, setProgress] = useState(0)
	const [activeIndex, setActiveIndex] = useState(-1)
	const [hasAnimated, setHasAnimated] = useState(false)

	useEffect(() => {
		const computeProgress = () => {
			if (!sectionRef.current) {
				return
			}

			const rect = sectionRef.current.getBoundingClientRect()
			const viewportHeight = window.innerHeight || 1
			const startPoint = viewportHeight * 0.82
			const endPoint = -rect.height * 0.2
			const raw = (startPoint - rect.top) / (startPoint - endPoint)
			const clamped = Math.max(0, Math.min(1, raw))

			setProgress(clamped)
			rafRef.current = null
		}

		const onScrollOrResize = () => {
			if (rafRef.current !== null) {
				return
			}

			rafRef.current = window.requestAnimationFrame(computeProgress)
		}

		onScrollOrResize()
		window.addEventListener('scroll', onScrollOrResize, { passive: true })
		window.addEventListener('resize', onScrollOrResize)

		return () => {
			window.removeEventListener('scroll', onScrollOrResize)
			window.removeEventListener('resize', onScrollOrResize)
			if (rafRef.current !== null) {
				window.cancelAnimationFrame(rafRef.current)
			}
		}
	}, [])

	useEffect(() => {
		const sectionNode = sectionRef.current
		if (!sectionNode) {
			return undefined
		}

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
		if (!hasAnimated) {
			return undefined
		}

		setActiveIndex(0)
		let intervalId

		intervalId = window.setInterval(() => {
			setActiveIndex((prev) => {
				if (prev >= stages.length - 1) {
					window.clearInterval(intervalId)
					return prev
				}

				return prev + 1
			})
		}, 520)

		return () => window.clearInterval(intervalId)
	}, [hasAnimated])

	const stagedProgress = useMemo(() => {
		if (stages.length <= 1) {
			return 0
		}
		if (activeIndex < 0) {
			return 0
		}
		return activeIndex / (stages.length - 1)
	}, [activeIndex])

	const isSequenceRunning = hasAnimated && activeIndex < stages.length - 1
	const effectiveProgress = isSequenceRunning ? stagedProgress : Math.max(progress, stagedProgress)
	const filledStyleDesktop = { width: `${effectiveProgress * 100}%` }
	const filledStyleMobile = { height: `${effectiveProgress * 100}%` }
	const showGlow = effectiveProgress > 0.03

	return (
		<section
			ref={sectionRef}
			id="service-workflow"
			className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24"
		>
			<div className="relative z-10">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">From Blueprint to Deployment</h2>
					<p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
						Our four-stage engineering framework ensures every project meets production-grade standards through rigorous QA and performance auditing.
					</p>
				</div>

				<div className="mt-14 hidden md:block">
					<div className="relative px-6">
						<div className="h-2 w-full rounded-full bg-slate-800/70 ring-1 ring-slate-700/70" />
						<div
							className={`absolute left-6 top-0 h-2 rounded-full bg-slate-300 transition-[width,filter] duration-200 ${
								showGlow ? 'drop-shadow-[0_0_12px_rgba(148,163,184,0.6)]' : ''
							}`}
							style={filledStyleDesktop}
						/>

						<div className="pointer-events-none absolute inset-x-6 top-1/2 flex -translate-y-1/2 justify-between">
							{stages.map((stage, index) => {
								const activationPoint = index / (stages.length - 1)
								const isActive = effectiveProgress >= activationPoint
								const Icon = stage.icon

								return (
									<div
										key={stage.id}
										className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-300 ${
											isActive
												? 'border-indigo-300/80 bg-slate-900 text-white shadow-[0_0_20px_rgba(99,102,241,0.55)]'
												: 'border-slate-600/80 bg-slate-900/85 text-slate-400'
										}`}
									>
										<Icon />
									</div>
								)
							})}
						</div>
					</div>

					<div className="mt-12 grid grid-cols-4 gap-5">
						{stages.map((stage, index) => {
							const activationPoint = index / (stages.length - 1)
							const isActive = effectiveProgress >= activationPoint

							return (
								<article
									key={`${stage.id}-desktop`}
									className={`rounded-xl border p-4 backdrop-blur-md transition duration-300 ${
										isActive
											? 'border-indigo-400/50 bg-slate-900/55'
											: 'border-slate-700/60 bg-slate-900/35'
									}`}
								>
									<h3 className={`text-base font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
										{stage.title}
									</h3>
									<p className={`mt-2 text-sm leading-relaxed ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
										{stage.description}
									</p>
								</article>
							)
						})}
					</div>
				</div>

				<div className="relative mt-12 md:hidden">
					<div className="absolute bottom-4 left-5 top-4 w-1 rounded-full bg-slate-800/80 ring-1 ring-slate-700/70" />
					<div className="absolute bottom-4 left-5 top-4 w-1 overflow-hidden rounded-full">
						<div
							className={`w-full bg-slate-300 transition-[height,filter] duration-200 ${
								showGlow ? 'drop-shadow-[0_0_10px_rgba(148,163,184,0.55)]' : ''
							}`}
							style={filledStyleMobile}
						/>
					</div>

					<div className="space-y-6">
						{stages.map((stage, index) => {
							const activationPoint = index / (stages.length - 1)
							const isActive = effectiveProgress >= activationPoint
							const Icon = stage.icon

							return (
								<article key={`${stage.id}-mobile`} className="relative pl-16">
									<div
										className={`absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border transition duration-300 ${
											isActive
												? 'border-indigo-300/80 bg-slate-900 text-white shadow-[0_0_16px_rgba(99,102,241,0.5)]'
												: 'border-slate-600/80 bg-slate-900/85 text-slate-400'
										}`}
									>
										<Icon />
									</div>
									<div
										className={`rounded-xl border p-4 backdrop-blur-md transition duration-300 ${
											isActive
												? 'border-indigo-400/50 bg-slate-900/55'
												: 'border-slate-700/60 bg-slate-900/35'
										}`}
									>
										<h3 className={`text-base font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
											{stage.title}
										</h3>
										<p className={`mt-2 text-sm leading-relaxed ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
											{stage.description}
										</p>
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

function AuditIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
			<circle cx="10" cy="10" r="5.8" />
			<path d="M14.7 14.7L20 20" strokeLinecap="round" />
			<path d="M7.5 10.1l1.6 1.6 3.2-3.3" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function StrategyIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
			<path d="M4 19h16" strokeLinecap="round" />
			<path d="M7 17V8m5 9V6m5 11v-5" strokeLinecap="round" />
			<path d="M6.5 8.5L12 5l5.5 7" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function ExecutionIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<path d="M13 2L5 13h6l-1 9 9-12h-6l0-8z" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function OptimizationIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
			<path d="M4.5 16a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
			<path d="M12 12l4-3" strokeLinecap="round" />
			<path d="M7 19h10" strokeLinecap="round" />
			<circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
		</svg>
	)
}

export default ServiceWorkflow