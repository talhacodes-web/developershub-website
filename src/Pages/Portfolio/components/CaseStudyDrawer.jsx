import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowUpRight,
	Braces,
	BrainCircuit,
	Boxes,
	Cloud,
	Code2,
	Database,
	ExternalLink,
	GitBranch,
	Gauge,
	Globe,
	Layers3,
	Palette,
	Rocket,
	Server,
	ShieldCheck,
	SquareTerminal,
	Workflow,
	X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const techIconMap = {
	React: Code2,
	'Node.js': Server,
	PostgreSQL: Database,
	'AWS KMS': ShieldCheck,
	TypeScript: Braces,
	Kafka: Workflow,
	Redis: Layers3,
	Terraform: Boxes,
	Python: Code2,
	OpenAI: BrainCircuit,
	LangChain: GitBranch,
	Pinecone: Database,
	PyTorch: Gauge,
	Airflow: Workflow,
	FastAPI: Globe,
	GCP: Cloud,
	'Three.js': SquareTerminal,
	'Next.js': Rocket,
	Stripe: ArrowUpRight,
	Vercel: Rocket,
	'Framer Motion': Palette,
	Figma: Palette,
	WebGL: SquareTerminal,
	Cloudflare: ShieldCheck,
}

function TechBadge({ tech }) {
	const Icon = techIconMap[tech] ?? Globe

	return (
		<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100/90 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
			<Icon className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
			{tech}
		</span>
	)
}

function CaseStudyDrawer({ project, open, onClose }) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') {
			return undefined
		}

		const mediaQuery = window.matchMedia('(max-width: 767px)')
		const updateMatch = () => setIsMobile(mediaQuery.matches)

		updateMatch()
		mediaQuery.addEventListener('change', updateMatch)

		return () => mediaQuery.removeEventListener('change', updateMatch)
	}, [])

	useEffect(() => {
		if (!open || typeof document === 'undefined') {
			return undefined
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', handleEscape)

		return () => {
			document.body.style.overflow = previousOverflow
			window.removeEventListener('keydown', handleEscape)
		}
	}, [open, onClose])

	const panelMotion = useMemo(
		() => ({
			initial: isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 },
			animate: { x: 0, y: 0, opacity: 1 },
			exit: isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 },
		}),
		[isMobile],
	)

	const contentVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.12,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 16 },
		show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
	}

	if (!project) {
		return null
	}

	return (
		<AnimatePresence>
			{open && (
				<motion.div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
					<motion.div
						className="absolute inset-0 bg-slate-950/72 backdrop-blur-md"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					<motion.aside
									className="absolute bottom-0 right-0 flex h-[92vh] w-full flex-col overflow-hidden border border-white/10 bg-[#060816]/96 shadow-[0_0_80px_rgba(15,23,42,0.5)] md:top-0 md:h-full md:max-w-[48vw] md:rounded-l-4xl md:rounded-tr-none"
						style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), -24px 0 80px rgba(2,6,23,0.55)' }}
						{...panelMotion}
						transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
						onClick={(event) => event.stopPropagation()}
					>
						<div className="relative flex items-start justify-between gap-4 border-b border-white/10 bg-linear-to-b from-white/8 to-transparent px-5 py-5 sm:px-7">
							<div className="space-y-2">
								<p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-300/80">
									Case Study
								</p>
								<div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-slate-200/80">
									{project.domain}
								</div>
								<h2
									id="case-study-title"
									className="max-w-2xl bg-linear-to-r from-white via-sky-100 to-indigo-300 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl"
								>
									{project.title}
								</h2>
							</div>

							<button
								type="button"
								onClick={onClose}
								className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
								aria-label="Close case study drawer"
							>
								<X className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
							<motion.div variants={contentVariants} initial="hidden" animate="show" className="space-y-6">
								<motion.section variants={itemVariants} className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_18px_60px_rgba(2,6,23,0.38)]">
									<div className="mb-3 flex items-center justify-between px-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-300/70">
										<span>High-Resolution Preview</span>
										<span>Scrollable mockup</span>
									</div>
									<div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-900/80">
										<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_32%)]" aria-hidden="true" />
										<div className="max-h-[44vh] overflow-auto">
											<motion.img
												src={project.mockupImage}
												alt={`${project.title} dashboard preview`}
												className="h-auto w-full"
												initial={{ scale: 1.03, y: 18 }}
												animate={{ scale: 1, y: 0 }}
												transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
											/>
										</div>
									</div>
								</motion.section>

								<motion.section variants={itemVariants} className="grid gap-4 md:grid-cols-3">
									{[
										{ label: 'The Challenge', copy: project.challenge },
										{ label: 'The Solution', copy: project.solution },
										{ label: 'The Result', copy: project.result },
									].map((item) => (
										<article key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
											<p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-300/80">
												{item.label}
											</p>
											<p className="mt-3 text-sm leading-7 text-slate-200/90">
												{item.copy}
											</p>
										</article>
									))}
								</motion.section>

								<motion.section variants={itemVariants} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 sm:p-6">
									<div className="flex items-center justify-between gap-4">
										<div>
											<p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-300/80">
												Tech Stack
											</p>
											<h3 className="mt-1 text-lg font-semibold text-white">Tools behind the build</h3>
										</div>
										<p className="text-xs text-slate-400">Implemented specifically for this release</p>
									</div>
									<div className="mt-4 flex flex-wrap gap-2.5">
										{project.techStack.map((tech) => (
											<TechBadge key={`${project.id}-${tech}`} tech={tech} />
										))}
									</div>
								</motion.section>

								{Array.isArray(project.metrics) && project.metrics.length > 0 && (
									<motion.section variants={itemVariants} className="grid gap-3 sm:grid-cols-3">
										{project.metrics.map((metric) => (
											<div key={metric.label} className="rounded-[1.35rem] border border-white/10 bg-linear-to-br from-white/8 to-white/4 p-4">
												<p className="text-2xl font-black text-white">{metric.value}</p>
												<p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
											</div>
										))}
									</motion.section>
								)}
							</motion.div>
						</div>

						<div className="border-t border-white/10 bg-[#050711]/95 px-5 py-4 sm:px-7">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="text-sm text-slate-400">
									Ready to review the implementation notes or jump into the product itself.
								</div>
								<a
									href={project.ctaUrl || '#'}
									target={project.ctaUrl?.startsWith('http') ? '_blank' : undefined}
									rel={project.ctaUrl?.startsWith('http') ? 'noreferrer' : undefined}
										className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(37,99,235,0.35)] transition hover:-translate-y-px hover:shadow-[0_20px_48px_rgba(37,99,235,0.44)]"
								>
									{project.ctaLabel || 'Visit Live Site'}
									<ExternalLink className="h-4 w-4" aria-hidden="true" />
								</a>
							</div>
						</div>
					</motion.aside>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default CaseStudyDrawer