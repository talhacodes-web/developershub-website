import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ParticleBackground from '../../ParticleBackground'
import Footer from '../../Footer'
import NavBar from '../../NavBar'

const initialForm = {
	fullName: '',
	email: '',
	projectType: '',
	message: '',
}

const projectOptions = ['SaaS', 'AI', 'Web', 'Other']

function validateField(name, value) {
	if (name === 'fullName') {
		if (!value.trim()) {
			return 'Full name is required.'
		}

		if (value.trim().length < 2) {
			return 'Please enter at least 2 characters.'
		}
	}

	if (name === 'email') {
		if (!value.trim()) {
			return 'Company email is required.'
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailPattern.test(value.trim())) {
			return 'Please enter a valid email address.'
		}
	}

	if (name === 'projectType' && !value) {
		return 'Select a project type.'
	}

	if (name === 'message') {
		if (!value.trim()) {
			return 'Please share a quick project brief.'
		}

		if (value.trim().length < 20) {
			return 'Please provide at least 20 characters.'
		}
	}

	return ''
}

function Contact() {
	const sectionRef = useRef(null)
	const canvasRef = useRef(null)
	const animationFrameRef = useRef(null)
	const pointerRef = useRef({ x: 0, y: 0, active: false })
	const [formData, setFormData] = useState(initialForm)
	const [touched, setTouched] = useState({})
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSent, setIsSent] = useState(false)
	const [copiedField, setCopiedField] = useState('')
	const [clock, setClock] = useState(() => Date.now())

	const timezoneText = useMemo(() => {
		const now = new Date(clock)
		const est = new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'America/New_York',
		}).format(now)
		const gmt = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Etc/GMT',
		}).format(now)

		return `Currently Syncing: EST ${est} / GMT ${gmt}`
	}, [clock])

	useEffect(() => {
		const tickTimer = window.setInterval(() => setClock(Date.now()), 60000)
		return () => window.clearInterval(tickTimer)
	}, [])

	useEffect(() => {
		const section = sectionRef.current
		const canvas = canvasRef.current
		if (!section || !canvas) {
			return undefined
		}

		const context = canvas.getContext('2d')
		if (!context) {
			return undefined
		}

		const nodes = []

		const createNodes = (width, height) => {
			nodes.length = 0
			const baseCount = width > 1024 ? 60 : width > 768 ? 44 : 28
			for (let index = 0; index < baseCount; index += 1) {
				nodes.push({
					x: Math.random() * width,
					y: Math.random() * height,
					vx: (Math.random() - 0.5) * 0.42,
					vy: (Math.random() - 0.5) * 0.42,
					radius: Math.random() * 1.8 + 1.2,
				})
			}
		}

		const resizeCanvas = () => {
			const rect = section.getBoundingClientRect()
			canvas.width = rect.width
			canvas.height = rect.height
			createNodes(rect.width, rect.height)
		}

		const draw = () => {
			const width = canvas.width
			const height = canvas.height

			context.clearRect(0, 0, width, height)
			context.fillStyle = 'rgba(3, 7, 18, 0.2)'
			context.fillRect(0, 0, width, height)

			for (let i = 0; i < nodes.length; i += 1) {
				const node = nodes[i]
				node.x += node.vx
				node.y += node.vy

				if (node.x <= 0 || node.x >= width) {
					node.vx *= -1
				}

				if (node.y <= 0 || node.y >= height) {
					node.vy *= -1
				}

				for (let j = i + 1; j < nodes.length; j += 1) {
					const target = nodes[j]
					const dx = node.x - target.x
					const dy = node.y - target.y
					const distance = Math.sqrt(dx * dx + dy * dy)

					if (distance < 145) {
						const alpha = (1 - distance / 145) * 0.24
						context.strokeStyle = `rgba(34, 211, 238, ${alpha})`
						context.lineWidth = 1
						context.beginPath()
						context.moveTo(node.x, node.y)
						context.lineTo(target.x, target.y)
						context.stroke()
					}
				}

				if (pointerRef.current.active) {
					const pdx = node.x - pointerRef.current.x
					const pdy = node.y - pointerRef.current.y
					const cursorDistance = Math.sqrt(pdx * pdx + pdy * pdy)

					if (cursorDistance < 170) {
						const cursorAlpha = (1 - cursorDistance / 170) * 0.38
						context.strokeStyle = `rgba(56, 189, 248, ${cursorAlpha})`
						context.beginPath()
						context.moveTo(node.x, node.y)
						context.lineTo(pointerRef.current.x, pointerRef.current.y)
						context.stroke()
					}
				}

				context.beginPath()
				context.fillStyle = 'rgba(103, 232, 249, 0.82)'
				context.shadowColor = 'rgba(34, 211, 238, 0.72)'
				context.shadowBlur = 10
				context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
				context.fill()
				context.shadowBlur = 0
			}

			animationFrameRef.current = window.requestAnimationFrame(draw)
		}

		const handlePointerMove = (event) => {
			const rect = section.getBoundingClientRect()
			pointerRef.current = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
				active: true,
			}
		}

		const handlePointerLeave = () => {
			pointerRef.current.active = false
		}

		resizeCanvas()
		draw()

		window.addEventListener('resize', resizeCanvas)
		section.addEventListener('pointermove', handlePointerMove)
		section.addEventListener('pointerleave', handlePointerLeave)

		return () => {
			window.removeEventListener('resize', resizeCanvas)
			section.removeEventListener('pointermove', handlePointerMove)
			section.removeEventListener('pointerleave', handlePointerLeave)
			if (animationFrameRef.current) {
				window.cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [])

	const runValidation = (nextData) => {
		const nextErrors = {
			fullName: validateField('fullName', nextData.fullName),
			email: validateField('email', nextData.email),
			projectType: validateField('projectType', nextData.projectType),
			message: validateField('message', nextData.message),
		}

		setErrors(nextErrors)
		return nextErrors
	}

	const handleFieldChange = (name, value) => {
		const nextData = { ...formData, [name]: value }
		setFormData(nextData)
		if (touched[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: validateField(name, value),
			}))
		}
		if (isSent) {
			setIsSent(false)
		}
	}

	const handleBlur = (name) => {
		setTouched((prev) => ({ ...prev, [name]: true }))
		setErrors((prev) => ({
			...prev,
			[name]: validateField(name, formData[name]),
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setTouched({ fullName: true, email: true, projectType: true, message: true })
		const nextErrors = runValidation(formData)
		if (Object.values(nextErrors).some(Boolean)) {
			return
		}

		setIsSubmitting(true)
		await new Promise((resolve) => window.setTimeout(resolve, 1300))
		setIsSubmitting(false)
		setIsSent(true)
		setFormData(initialForm)
		setTouched({})
		setErrors({})
	}

	const copyValue = async (value, key) => {
		try {
			await navigator.clipboard.writeText(value)
			setCopiedField(key)
			window.setTimeout(() => setCopiedField(''), 1800)
		} catch {
			setCopiedField('')
		}
	}

	return (
		<main className="bg-[#010101] text-slate-100">
			<NavBar />
			<section ref={sectionRef} className="relative isolate overflow-hidden bg-[#090B14] px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
				<ParticleBackground></ParticleBackground>

				<div className="relative mx-auto w-full max-w-7xl">
					<header className="mx-auto max-w-4xl text-center">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/75">Contact Command Center</p>
						<h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
							Let’s Engineer the Future Together.
						</h1>
						<p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
							From general inquiries to deep-dive technical audits, our global team is ready to connect.
						</p>
					</header>

					<div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
						<div className="rounded-3xl border border-white/12 bg-white/4.5 p-5 shadow-[0_18px_56px_rgba(2,8,23,0.55)] backdrop-blur-md sm:p-7 lg:p-8">
							<div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
								<div>
									<h2 className="text-xl font-semibold text-white sm:text-2xl">Smart Inquiry Form</h2>
									<p className="mt-1 text-sm text-slate-300/80">Validated intake for faster engineering triage.</p>
								</div>
								<span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
									Production-Grade
								</span>
							</div>

							<form className="space-y-5" onSubmit={handleSubmit} noValidate>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="relative">
										<input
											id="fullName"
											type="text"
											value={formData.fullName}
											onChange={(event) => handleFieldChange('fullName', event.target.value)}
											onBlur={() => handleBlur('fullName')}
											className={`peer h-14 w-full rounded-xl border bg-white/3 px-4 pt-5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/25 ${errors.fullName ? 'border-rose-400/70' : 'border-white/15'}`}
											placeholder=" "
										/>
										<label htmlFor="fullName" className={`pointer-events-none absolute left-4 transition-all ${formData.fullName ? 'top-2 text-[0.67rem] uppercase tracking-[0.16em] text-cyan-200/85' : 'top-4 text-sm text-slate-400 peer-focus:top-2 peer-focus:text-[0.67rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200/85'}`}>
											Full Name
										</label>
										{errors.fullName && touched.fullName && <p className="mt-1.5 text-xs text-rose-300">{errors.fullName}</p>}
									</div>

									<div className="relative">
										<input
											id="email"
											type="email"
											value={formData.email}
											onChange={(event) => handleFieldChange('email', event.target.value)}
											onBlur={() => handleBlur('email')}
											className={`peer h-14 w-full rounded-xl border bg-white/3 px-4 pt-5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/25 ${errors.email ? 'border-rose-400/70' : 'border-white/15'}`}
											placeholder=" "
										/>
										<label htmlFor="email" className={`pointer-events-none absolute left-4 transition-all ${formData.email ? 'top-2 text-[0.67rem] uppercase tracking-[0.16em] text-cyan-200/85' : 'top-4 text-sm text-slate-400 peer-focus:top-2 peer-focus:text-[0.67rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200/85'}`}>
											Company Email
										</label>
										{errors.email && touched.email && <p className="mt-1.5 text-xs text-rose-300">{errors.email}</p>}
									</div>
								</div>

								<div className="relative">
									<select
										id="projectType"
										value={formData.projectType}
										onChange={(event) => handleFieldChange('projectType', event.target.value)}
										onBlur={() => handleBlur('projectType')}
										className={`h-14 w-full appearance-none rounded-xl border bg-white/3 px-4 pt-5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/25 ${errors.projectType ? 'border-rose-400/70' : 'border-white/15'}`}
									>
										<option value="" disabled className="bg-slate-900 text-slate-400">Select project type</option>
										{projectOptions.map((option) => (
											<option key={option} value={option} className="bg-slate-900 text-slate-100">
												{option}
											</option>
										))}
									</select>
									<label htmlFor="projectType" className={`pointer-events-none absolute left-4 transition-all ${formData.projectType ? 'top-2 text-[0.67rem] uppercase tracking-[0.16em] text-cyan-200/85' : 'top-4 text-sm text-slate-400'}`}>
										Project Type
									</label>
									<span className="pointer-events-none absolute right-4 top-5 text-slate-400" aria-hidden="true">⌄</span>
									{errors.projectType && touched.projectType && <p className="mt-1.5 text-xs text-rose-300">{errors.projectType}</p>}
								</div>

								<div className="relative">
									<textarea
										id="message"
										rows={6}
										value={formData.message}
										onChange={(event) => handleFieldChange('message', event.target.value)}
										onBlur={() => handleBlur('message')}
										className={`peer w-full rounded-xl border bg-white/3 px-4 pt-6 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/25 ${errors.message ? 'border-rose-400/70' : 'border-white/15'}`}
										placeholder=" "
									/>
									<label htmlFor="message" className={`pointer-events-none absolute left-4 transition-all ${formData.message ? 'top-2 text-[0.67rem] uppercase tracking-[0.16em] text-cyan-200/85' : 'top-4 text-sm text-slate-400 peer-focus:top-2 peer-focus:text-[0.67rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-cyan-200/85'}`}>
										Project Brief
									</label>
									{errors.message && touched.message && <p className="mt-1.5 text-xs text-rose-300">{errors.message}</p>}
								</div>

								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<motion.button
										type="submit"
										disabled={isSubmitting}
										whileTap={{ scale: 0.98 }}
										className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(14,165,233,0.32)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
									>
										{isSubmitting ? (
											<>
												<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
												Sending...
											</>
										) : (
											'Submit Inquiry'
										)}
									</motion.button>

									<AnimatePresence>
										{isSent && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 8 }}
												className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/40 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-200"
											>
												<span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-200">
													<Check className="h-3.5 w-3.5" aria-hidden="true" />
												</span>
												Message Sent
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</form>
						</div>

						<aside className="space-y-5">
							<div className="rounded-3xl border border-white/12 bg-white/4.5 p-6 shadow-[0_18px_54px_rgba(2,8,23,0.52)] backdrop-blur-md">
								<h3 className="text-lg font-semibold text-white">Direct Access</h3>
								<p className="mt-2 text-sm text-slate-300/85">Fast lanes for founders and engineering leads.</p>

								<div className="mt-5 space-y-3">
									<button
										type="button"
										onClick={() => copyValue('hello@devshub.com', 'email')}
										className="flex w-full items-center justify-between rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-500/10"
									>
										<span>hello@devshub.com</span>
										<span className="inline-flex items-center gap-1 text-xs text-slate-300">
											<Copy className="h-3.5 w-3.5" aria-hidden="true" />
											{copiedField === 'email' ? 'Copied' : 'Copy'}
										</span>
									</button>

									<button
										type="button"
										onClick={() => copyValue('EST/GMT', 'timezone')}
										className="flex w-full items-center justify-between rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-500/10"
									>
										<span>{timezoneText}</span>
										<span className="inline-flex items-center gap-1 text-xs text-slate-300">
											<Copy className="h-3.5 w-3.5" aria-hidden="true" />
											{copiedField === 'timezone' ? 'Copied' : 'Copy'}
										</span>
									</button>
								</div>

								<div className="mt-6 border-t border-white/10 pt-5">
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Social</p>
									<div className="mt-3 flex items-center gap-3">
										<a
											href="https://www.linkedin.com"
											target="_blank"
											rel="noreferrer"
											className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/30 text-slate-100 transition hover:border-cyan-300/70 hover:text-cyan-200 hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]"
											aria-label="LinkedIn"
										>
											<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
												<path d="M6.94 8.74v8.95H3.96V8.74h2.98zm.2-2.77c0 .87-.66 1.57-1.7 1.57h-.02c-1 0-1.67-.7-1.67-1.57 0-.9.69-1.58 1.71-1.58 1.03 0 1.67.68 1.68 1.58zm10.9 6.58v5.14h-2.98V12.9c0-1.21-.44-2.03-1.53-2.03-.83 0-1.33.56-1.55 1.1-.08.2-.1.47-.1.75v4.97H8.9s.04-8.06 0-8.95h2.98v1.27l-.02.03h.02v-.03c.4-.62 1.12-1.5 2.74-1.5 2 0 3.5 1.31 3.5 4.12z" />
											</svg>
										</a>
										<a
											href="https://x.com"
											target="_blank"
											rel="noreferrer"
											className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/30 text-slate-100 transition hover:border-cyan-300/70 hover:text-cyan-200 hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]"
											aria-label="X (Twitter)"
										>
											<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
												<path d="M18.9 2H22l-6.76 7.72L23 22h-6.52l-5.1-6.63L5.53 22H2.43l7.23-8.26L1 2h6.67l4.62 6.05L18.9 2zm-1.08 18h1.72L6.75 3.9H4.9L17.82 20z" />
											</svg>
										</a>
									</div>
								</div>
							</div>

							<div className="rounded-3xl border border-cyan-300/35 bg-linear-to-br from-cyan-500/14 via-blue-500/12 to-indigo-600/16 p-6 shadow-[0_14px_44px_rgba(2,8,23,0.45)] backdrop-blur-md">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Skip the Queue</p>
								<h3 className="mt-3 text-xl font-semibold text-white">Book a 15-minute discovery call.</h3>
								<p className="mt-2 text-sm text-slate-200/85">
									If your project is time-sensitive, jump straight to our engineering scheduler.
								</p>
								<Link
									to="/booking"
									className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
								>
									Open Meeting Scheduler
									<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
								</Link>
							</div>
						</aside>
					</div>

				</div>
			</section>
			<Footer />
		</main>
	)
}

export default Contact
