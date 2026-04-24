import ParticleBackground from '../../../ParticleBackground'
import { useEffect, useMemo, useState } from 'react'

const phrases = [
	'Build Faster',
	'Scale Smarter',
	'Innovate Better',
	'Grow Digitally',
]

function Hero() {
	const [phraseIndex, setPhraseIndex] = useState(0)
	const [charIndex, setCharIndex] = useState(0)
	const [isDeleting, setIsDeleting] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const [pointer, setPointer] = useState({ x: 50, y: 50 })

	const currentPhrase = useMemo(() => phrases[phraseIndex], [phraseIndex])
	const typedText = currentPhrase.slice(0, charIndex)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	useEffect(() => {
		const isTypingComplete = !isDeleting && charIndex === currentPhrase.length
		const isDeletingComplete = isDeleting && charIndex === 0

		let delay = isDeleting ? 45 : 95

		if (isTypingComplete) {
			delay = 1200
		}

		const timer = setTimeout(() => {
			if (isTypingComplete) {
				setIsDeleting(true)
				return
			}

			if (isDeletingComplete) {
				setIsDeleting(false)
				setPhraseIndex((prev) => (prev + 1) % phrases.length)
				return
			}

			setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1))
		}, delay)

		return () => clearTimeout(timer)
	}, [charIndex, currentPhrase, isDeleting])



	

	return (
		<section
			id="hero-section"
			className="relative overflow-hidden px-4 transition-[background-image] duration-300 ease-out sm:px-6 lg:px-8"
			
		>
			<ParticleBackground />
			<div
				className={`relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center text-center transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
					}`}
			>
				<p className="mb-5 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200 sm:text-sm">
					Tech Agency Solutions
				</p>

				<h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
					We Help Teams
					<span className="block pt-2 text-indigo-400 sm:pt-3">
						{typedText}
						<span className="ml-1 inline-block h-[1.05em] w-0.5 -translate-y-1 bg-indigo-300 align-middle animate-pulse" />
					</span>
				</h1>

				<p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
					DevelopersHub delivers full-cycle web, mobile, and cloud engineering services to help your business launch faster, scale reliably, and stay ahead in a digital-first market.
				</p>

				<div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
					<a
						href="#"
						className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(79,70,229,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-blue-400 sm:w-auto"
					>
						Get Started
					</a>
					<a
						href="#meeting-scheduler"
						className="w-full rounded-xl border border-slate-500/70 px-7 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-800/50 sm:w-auto"
					>
						Book Meeting
					</a>
				</div>
			</div>
		</section>
	)
}

export default Hero