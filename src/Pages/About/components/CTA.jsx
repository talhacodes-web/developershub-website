import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function CTA() {
	const [isMobile, setIsMobile] = useState(false)
	const [parallaxOffset, setParallaxOffset] = useState(0)
	const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 })
	const ctaRef = useRef(null)

	useEffect(() => {
		const updateViewportMode = () => {
			setIsMobile(window.innerWidth <= 767)
		}

		updateViewportMode()
		window.addEventListener('resize', updateViewportMode)

		return () => window.removeEventListener('resize', updateViewportMode)
	}, [])

	useEffect(() => {
		if (isMobile) {
			setParallaxOffset(0)
			return undefined
		}

		const handleScroll = () => {
			const sectionTop = ctaRef.current?.offsetTop ?? 0
			const delta = window.scrollY - sectionTop
			setParallaxOffset(Math.max(-70, Math.min(70, delta * 0.085)))
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => window.removeEventListener('scroll', handleScroll)
	}, [isMobile])

	const handleMagneticMove = (event) => {
		const bounds = event.currentTarget.getBoundingClientRect()
		const centerX = bounds.left + bounds.width / 2
		const centerY = bounds.top + bounds.height / 2
		const deltaX = (event.clientX - centerX) / bounds.width
		const deltaY = (event.clientY - centerY) / bounds.height

		setMagnetOffset({
			x: Math.max(-12, Math.min(12, deltaX * 30)),
			y: Math.max(-9, Math.min(9, deltaY * 24)),
		})
	}

	const handleMagneticLeave = () => {
		setMagnetOffset({ x: 0, y: 0 })
	}

	return (
		<section ref={ctaRef} className="cta-section relative overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
			<div className="mx-auto w-full max-w-7xl">
				<div className="cta-inner-card relative overflow-hidden rounded-4xl border border-white/20 px-6 py-16 text-center shadow-[0_0_80px_rgba(103,82,255,0.25)] sm:px-10 sm:py-20 lg:px-14">
					<div className="cta-mesh" aria-hidden="true" />

					{!isMobile && (
						<>
							<svg
								viewBox="0 0 220 220"
								aria-hidden="true"
								className="cta-shape cta-shape-orb"
								style={{ transform: `translate3d(0, ${parallaxOffset * -0.42}px, 0)` }}
							>
								<defs>
									<radialGradient id="ctaOrbGradient" cx="45%" cy="42%" r="64%">
										<stop offset="0%" stopColor="rgba(212,236,255,0.62)" />
										<stop offset="48%" stopColor="rgba(120,160,255,0.38)" />
										<stop offset="100%" stopColor="rgba(102,68,238,0.05)" />
									</radialGradient>
								</defs>
								<circle cx="110" cy="110" r="102" fill="url(#ctaOrbGradient)" />
							</svg>

							<svg
								viewBox="0 0 280 220"
								aria-hidden="true"
								className="cta-shape cta-shape-brackets"
								style={{ transform: `translate3d(0, ${parallaxOffset * 0.28}px, 0)` }}
							>
								<path d="M62 34h-20v152h20M218 34h20v152h-20" fill="none" stroke="rgba(200,212,255,0.36)" strokeWidth="11" strokeLinecap="round" />
								<path d="M112 70h56M104 110h72M114 150h52" fill="none" stroke="rgba(160,194,255,0.46)" strokeWidth="8" strokeLinecap="round" />
							</svg>

							<svg
								viewBox="0 0 220 220"
								aria-hidden="true"
								className="cta-shape cta-shape-disk"
								style={{ transform: `translate3d(0, ${parallaxOffset * 0.18}px, 0)` }}
							>
								<circle cx="110" cy="110" r="104" fill="none" stroke="rgba(188,215,255,0.42)" strokeWidth="14" />
								<circle cx="110" cy="110" r="58" fill="rgba(139,167,255,0.2)" />
							</svg>
						</>
					)}

					<div className="relative z-10 mx-auto max-w-3xl">
						<h2 className="text-balance text-[clamp(2rem,5.8vw,4.1rem)] font-black leading-[1.05] tracking-tight text-white">
							Ready to build something legendary?
						</h2>
						<p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-100/90 sm:text-lg">
							Whether you are a visionary founder or a technical leader, let us engineer the future together.
						</p>

						<div className="mt-9 flex justify-center sm:mt-10" onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave}>
							<Link
								to="/booking"
								className="cta-power-button"
								style={{ transform: `translate3d(${magnetOffset.x}px, ${magnetOffset.y}px, 0)` }}
							>
								<span className="cta-button-text">Book a Strategy Call</span>
								<span className="cta-shimmer" aria-hidden="true" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTA
