import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

function ProjectsGallery({ projects, onViewDetails }) {
	return (
		<motion.div layout className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
			<AnimatePresence mode="popLayout">
				{projects.map((project, index) => (
					<ProjectCard key={project.id} project={project} index={index} onViewDetails={onViewDetails} />
				))}
			</AnimatePresence>
		</motion.div>
	)
}

function ProjectCard({ project, index, onViewDetails }) {
	const glowShadow = useMemo(() => `0 26px 52px ${project.glowColor}44, 0 0 26px ${project.glowColor}55`, [project.glowColor])

	return (
		<motion.article
			layout
			initial={{ opacity: 0, scale: 0.9, y: 16 }}
			animate={{
				opacity: 1,
				scale: 1,
				y: 0,
				transition: { duration: 0.36, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
			}}
			exit={{ opacity: 0, scale: 0.85, y: -8, transition: { duration: 0.2, ease: 'easeInOut' } }}
			whileHover={{ scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 210, damping: 18 }}
			className="group relative min-h-124 overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/50 transition duration-70 will-change-transform"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
				style={{ boxShadow: glowShadow }}
				aria-hidden="true"
			/>

			<div className="relative h-68 overflow-hidden border-b border-slate-700/60">
				<motion.div
					className="absolute inset-0"
					style={{
						backgroundImage: `linear-gradient(140deg, rgba(2,6,23,0.18), rgba(2,6,23,0.56)), url(${project.mockupImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
					whileHover={{ scale: 1.07 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
				/>

				<div className="absolute inset-0 opacity-35" style={{ background: project.mockupBackground }} aria-hidden="true" />

				<div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" aria-hidden="true" />

				<div className="absolute left-4 top-4 rounded-lg border border-white/15 bg-black/35 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-200/95 backdrop-blur-sm">
					{project.summary}
				</div>

				<div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
					<p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-200/80">
						{project.domain}
					</p>
					<h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
				</div>
			</div>

			<div className="relative p-6">
				<div className="space-y-3 transition duration-300 group-hover:translate-y-2 group-hover:opacity-0">
					<p className="text-sm leading-relaxed text-slate-200">{project.focus}</p>
				</div>

				<div className="pointer-events-none absolute inset-x-6 top-6 flex flex-col items-center justify-center gap-4 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
					<div className="flex flex-wrap justify-center gap-2">
						{project.techStack.map((tech) => (
							<span
								key={`${project.id}-${tech}`}
								className="rounded-md border border-white/20 bg-slate-900/80 px-2.5 py-1 text-[0.66rem] font-medium text-slate-100 shadow-[0_0_12px_rgba(99,102,241,0.28)]"
							>
								{tech}
							</span>
						))}
					</div>

					<button
						type="button"
						onClick={() => onViewDetails(project)}
						className="rounded-lg border border-indigo-300/60 bg-linear-to-r from-indigo-600/90 to-blue-600/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(59,130,246,0.42)] transition hover:scale-[1.03] cursor-pointer"
					>
						View Details
					</button>
				</div>
			</div>
		</motion.article>
	)
}

export default ProjectsGallery
