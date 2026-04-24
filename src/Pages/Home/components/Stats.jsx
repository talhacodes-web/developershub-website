import { useEffect, useMemo, useRef, useState } from 'react'

const stats = [
	{ target: 150, suffix: '+', label: 'Projects Completed' },
	{ target: 50, suffix: '+', label: 'Happy Clients' },
	{ target: 20, suffix: '+', label: 'Tech Experts' },
]

function Stats() {
	const sectionRef = useRef(null)
	const [hasStarted, setHasStarted] = useState(false)
	const [hasCompleted, setHasCompleted] = useState(false)
	const [counts, setCounts] = useState(stats.map(() => 0))

	useEffect(() => {
		const section = sectionRef.current
		if (!section) return undefined

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setHasStarted(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.35 },
		)

		observer.observe(section)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!hasStarted) return undefined

		setHasCompleted(false)
		const duration = 2000
		const startTime = performance.now()

		const animate = (timestamp) => {
			const elapsed = timestamp - startTime
			const progress = Math.min(elapsed / duration, 1)
			const eased = 1 - (1 - progress) ** 3

			setCounts(stats.map((stat) => Math.round(stat.target * eased)))

			if (progress < 1) {
				requestAnimationFrame(animate)
			} else {
				setHasCompleted(true)
			}
		}

		const frame = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(frame)
	}, [hasStarted])

	const columnClassName = useMemo(
		() =>
			'group flex flex-col items-center justify-center px-6 py-8 text-center transition-all duration-300  sm:px-8 sm:py-10',
		[],
	)

	return (
		<section
			ref={sectionRef}
			className="relative w-full overflow-hidden px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
		>
			<div className="pointer-events-none absolute inset-0" />

			<div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-3xl bg-linear-to-br from-white/[0.07] via-white/3 to-white/2 shadow-[0_30px_80px_-36px_rgba(76,29,149,0.85)] backdrop-blur-md md:grid-cols-3">
				{stats.map((stat, index) => (
					<div key={stat.label} className={columnClassName}>
						<p className="bg-linear-to-r from-fuchsia-300 via-indigo-300 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent transition-all duration-300 sm:text-5xl">
							{counts[index]}
							{stat.suffix}
						</p>
						<p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-xs">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Stats
