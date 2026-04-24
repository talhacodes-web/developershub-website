import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const testimonials = [
	{
		id: 'nova-ai',
		quote:
			'Developers Hub turned our MVP into a production-ready platform in under 6 weeks. Their AI integration was flawless. Simply the best engineering team we\'ve worked with.',
		name: 'Alex R.',
		role: 'Founder',
		company: 'Nova-AI',
		initials: 'AR',
		accent: 'from-sky-400 via-cyan-400 to-blue-500',
		glow: 'rgba(56, 189, 248, 0.32)',
	},
	{
		id: 'quantum-pay',
		quote:
			'Their commitment to code quality while meeting our aggressive Q4 launch deadlines was invaluable. Quantum-Pay is now our core payment gateway.',
		name: 'Sarah K.',
		role: 'Head of Engineering',
		company: 'FinTech Corp',
		initials: 'SK',
		accent: 'from-indigo-400 via-violet-400 to-fuchsia-500',
		glow: 'rgba(129, 140, 248, 0.28)',
	},
	{
		id: 'orbit-ledger',
		quote:
			'Every handoff was crisp, every sprint was on time, and the final system arrived with the kind of reliability we usually only get from internal teams.',
		name: 'Marcus T.',
		role: 'Product Director',
		company: 'Orbit Ledger',
		initials: 'MT',
		accent: 'from-emerald-400 via-teal-400 to-cyan-500',
		glow: 'rgba(45, 212, 191, 0.26)',
	},
	{
		id: 'aura-commerce',
		quote:
			'Our launch window was unforgiving. They shipped a polished experience, stayed calm under pressure, and kept the product performing beautifully on mobile.',
		name: 'Priya S.',
		role: 'Co-founder',
		company: 'Aura Commerce',
		initials: 'PS',
		accent: 'from-amber-300 via-orange-400 to-rose-500',
		glow: 'rgba(251, 191, 36, 0.22)',
	},
	{
		id: 'helios-surface',
		quote:
			'We had a narrow runway and a big design ambition. Developers Hub delivered a premium build that felt fast, deliberate, and commercially ready.',
		name: 'Ethan W.',
		role: 'Founder',
		company: 'Helios Studio',
		initials: 'EW',
		accent: 'from-emerald-300 via-sky-400 to-indigo-500',
		glow: 'rgba(96, 165, 250, 0.22)',
	},
]

const slides = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]]

function Testimonials() {
	const sectionRef = useRef(null)
	const scrollerRef = useRef(null)
	const scrollTimerRef = useRef(null)
	const autoplayRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(1)
	const [jumping, setJumping] = useState(false)
	const isInView = useInView(sectionRef, { amount: 0.35, once: true })

	const activeRealIndex = useMemo(() => {
		if (activeIndex <= 0) {
			return testimonials.length
		}

		if (activeIndex >= testimonials.length + 1) {
			return 1
		}

		return activeIndex
	}, [activeIndex])

	const scrollToIndex = (index, behavior = 'smooth') => {
		const scroller = scrollerRef.current
		if (!scroller) {
			return
		}

		const width = scroller.clientWidth
		scroller.scrollTo({ left: width * index, behavior })
		setActiveIndex(index)
	}

	const normalizeIndex = () => {
		const scroller = scrollerRef.current
		if (!scroller) {
			return
		}

		const width = scroller.clientWidth
		if (!width) {
			return
		}

		const rawIndex = Math.round(scroller.scrollLeft / width)

		if (rawIndex === 0) {
			setJumping(true)
			scroller.scrollTo({ left: width * testimonials.length, behavior: 'auto' })
			setActiveIndex(testimonials.length)
			return
		}

		if (rawIndex === slides.length - 1) {
			setJumping(true)
			scroller.scrollTo({ left: width, behavior: 'auto' })
			setActiveIndex(1)
			return
		}

		setActiveIndex(rawIndex)
	}

	const handleScroll = () => {
		window.clearTimeout(scrollTimerRef.current)
		const scroller = scrollerRef.current
		if (!scroller) {
			return
		}

		const width = scroller.clientWidth
		if (!width) {
			return
		}

		const rawIndex = Math.round(scroller.scrollLeft / width)
		setActiveIndex(rawIndex)
		scrollTimerRef.current = window.setTimeout(normalizeIndex, 130)
	}

	const goToNext = () => {
		scrollToIndex(activeIndex + 1)
	}

	const goToPrevious = () => {
		scrollToIndex(activeIndex - 1)
	}

	useEffect(() => {
		if (!isInView) {
			return undefined
		}

		scrollerRef.current?.scrollTo({ left: scrollerRef.current.clientWidth, behavior: 'auto' })
		setActiveIndex(1)

		autoplayRef.current = window.setInterval(() => {
			const scroller = scrollerRef.current
			if (!scroller) {
				return
			}

			const width = scroller.clientWidth
			if (!width) {
				return
			}

			const current = Math.round(scroller.scrollLeft / width)
			scroller.scrollTo({ left: width * (current + 1), behavior: 'smooth' })
			setActiveIndex(current + 1)
		}, 5200)

		return () => {
			window.clearInterval(autoplayRef.current)
			window.clearTimeout(scrollTimerRef.current)
		}
	}, [isInView])

	useEffect(() => {
		if (!jumping) {
			return undefined
		}

		const frame = window.requestAnimationFrame(() => setJumping(false))
		return () => window.cancelAnimationFrame(frame)
	}, [jumping])

	return (
		<section ref={sectionRef} className="relative isolate overflow-hidden bg-transparent px-6 py-24 text-slate-100 sm:px-8 lg:px-10 lg:py-28">
			<div className="relative mx-auto w-full max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="mx-auto max-w-3xl text-center"
				>
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/75">Verified Impact</p>
					<h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Client Feedback</h2>
					<p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
						Direct feedback from the engineering and founding teams we’ve partnered with.
					</p>
				</motion.div>

				<div className="mt-14 lg:mt-16">
					<div className="relative mx-auto flex w-full items-center justify-center">
						<button
							type="button"
							onClick={goToPrevious}
							className="absolute left-0 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100/85 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 hover:text-white"
							aria-label="Previous testimonial"
						>
							<ChevronLeft className="h-5 w-5" aria-hidden="true" />
						</button>

						<div className="w-full max-w-6xl overflow-hidden rounded-4xl">
							<div
								ref={scrollerRef}
								onScroll={handleScroll}
								className="testimonial-scroll flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
							>
								{slides.map((testimonial, index) => {
									const isActive = index === activeIndex

									return (
										<div key={`${testimonial.id}-${index}`} className="w-full shrink-0 snap-center px-2 sm:px-3">
											<motion.article
												initial={{ opacity: 0, y: 28, scale: 0.98 }}
												whileInView={{ opacity: 1, y: 0, scale: 1 }}
												viewport={{ once: true, amount: 0.55 }}
												transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
												className="relative mx-auto flex min-h-96 w-full max-w-5xl flex-col justify-between overflow-hidden rounded-4xl border border-white/10 bg-white/6 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:min-h-104 sm:p-8 lg:p-10"
												style={{ boxShadow: isActive ? `0 24px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08), 0 0 50px ${testimonial.glow}` : '0 24px 70px rgba(0,0,0,0.25)' }}
											>
												<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_36%)]" aria-hidden="true" />
												<div className="relative z-10 flex h-full flex-col justify-between gap-8">
													<div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
														<div className="space-y-4 text-center lg:text-left">
															<span
																className="block text-6xl leading-none text-sky-200/40 drop-shadow-[0_0_24px_rgba(125,211,252,0.25)] sm:text-7xl"
																style={{ fontFamily: '"Playfair Display", serif' }}
																aria-hidden="true"
															>
																&ldquo;
															</span>
															<p className="max-w-3xl text-balance text-lg leading-8 text-slate-100/94 sm:text-xl lg:text-[1.7rem] lg:leading-[1.75]">
																{testimonial.quote}
															</p>
														</div>

														<div className="flex flex-col items-center gap-3 text-center lg:items-end lg:text-right">
															<div className={`grid h-14 w-14 place-items-center rounded-[1.1rem] bg-linear-to-br ${testimonial.accent} text-sm font-black text-white shadow-[0_12px_36px_rgba(15,23,42,0.35)]`}>
																{testimonial.initials}
															</div>
															<div>
																<p className="text-base font-semibold text-white">{testimonial.name}</p>
																<p className="mt-1 text-sm text-slate-300/80">{testimonial.role} @ {testimonial.company}</p>
															</div>
														</div>
													</div>
												</div>
											</motion.article>
										</div>
									)
								})}
							</div>
						</div>

						<button
							type="button"
							onClick={goToNext}
							className="absolute right-0 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100/85 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 hover:text-white"
							aria-label="Next testimonial"
						>
							<ChevronRight className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>

					<div className="mt-8 flex items-center justify-center gap-2">
						{Array.from({ length: 3 }, (_, dotIndex) => {
							const isActive = (activeRealIndex - 1) % 3 === dotIndex

							return (
								<span
									key={dotIndex}
									className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? 'w-7 bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.72)]' : 'w-2.5 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.12)]'}`}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
