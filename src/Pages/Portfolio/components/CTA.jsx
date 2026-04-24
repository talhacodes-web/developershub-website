import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

function CTA() {
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 })
	const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 })

	const wireframeBackground = useMemo(
		() =>
			"url(\"data:image/svg+xml,%3Csvg width='960' height='540' viewBox='0 0 960 540' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(34,211,238,0.12)' stroke-width='1'%3E%3Cpath d='M-10 160L190 80L350 180L540 95L760 170L970 105'/%3E%3Cpath d='M-20 310L170 245L360 320L530 265L730 345L960 280'/%3E%3Cpath d='M-20 450L210 365L390 448L590 380L790 470L980 400'/%3E%3Cpath d='M110 -20L60 120L165 245L90 380L180 560'/%3E%3Cpath d='M340 -20L300 120L360 320L300 520'/%3E%3Cpath d='M580 -20L525 125L530 265L590 380L635 560'/%3E%3Cpath d='M820 -20L740 155L730 345L790 470L865 560'/%3E%3C/g%3E%3C/svg%3E\")",
		[],
	)

	const handlePointerMove = (event) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const offsetX = event.clientX - (rect.left + rect.width / 2)
		const offsetY = event.clientY - (rect.top + rect.height / 2)

		x.set(offsetX * 0.14)
		y.set(offsetY * 0.14)
	}

	const handlePointerLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<section className="bg-transparent px-6 py-20 sm:px-8 lg:px-10 lg:py-32">
			<div className="mx-auto w-full max-w-7xl">
				<div
					className="relative isolate overflow-hidden rounded-4xl border border-cyan-300/60 bg-linear-to-br from-[#071529] via-[#0a1424] to-[#171717] px-6 py-14 text-center shadow-[0_0_0_1px_rgba(34,211,238,0.28),0_26px_80px_rgba(2,6,23,0.65),0_0_56px_rgba(34,211,238,0.14)] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
				>
					<div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" style={{ backgroundImage: wireframeBackground, backgroundPosition: 'center', backgroundSize: 'cover' }} />
					<div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle at 40% 38%, rgba(255,255,255,0.38), rgba(255,255,255,0) 45%)' }} />
					<div className="pointer-events-none absolute inset-0 opacity-[0.09]" aria-hidden="true" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27 width=%27100%25%27 height=%27100%25%27%3E%3CfeTurbulence baseFrequency=%270.95%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.18%27/%3E%3C/svg%3E")' }} />

					<div className="relative z-10 mx-auto max-w-4xl">
						<h2
							className="text-balance text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-7xl"
							style={{ fontFamily: '"Barlow Condensed", sans-serif' }}
						>
							Your Project Could Be Next.
						</h2>

						<div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
							<span className="relative inline-flex h-2.5 w-2.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" aria-hidden="true" />
								<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
							</span>
							<span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">Live</span>
							<p className="max-w-2xl text-pretty text-sm leading-7 text-slate-200 sm:text-base">
								We are currently accepting new high-impact projects for Q3 2026. Let’s discuss how our engineering team can scale your vision.
							</p>
						</div>

						<div className="mt-10 flex justify-center sm:mt-12">
							<motion.div
								style={{ x: springX, y: springY }}
								onMouseMove={handlePointerMove}
								onMouseLeave={handlePointerLeave}
								className="inline-flex"
							>
								<motion.div whileTap={{ scale: 0.96 }} transition={{ duration: 0.16 }}>
									<Link
										to="/booking"
										className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-sky-500 to-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(56,189,248,0.32)] transition duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080f] sm:min-h-13 sm:px-9 sm:text-base"
									>
										Start a Project Inquiry
										<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
									</Link>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTA
