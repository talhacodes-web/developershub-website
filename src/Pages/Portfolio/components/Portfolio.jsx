import NavBar from '../../../NavBar'
import Footer from '../../../Footer'
import Projectsfilter from './Projectsfilter'
import Testimonials from './Testimonials'
import CTA from './CTA'
import ParticleBackground from '../../../ParticleBackground'

function Portfolio() {
	return (
		<main className="bg-slate-950 text-slate-100">
			<NavBar />

			<section className="showcase-hero relative isolate overflow-hidden px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
				<ParticleBackground />
				<div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-6xl flex-col items-center justify-center text-center">
					<h1 className="max-w-5xl text-balance text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
						Building the <span className="showcase-gradient-text">Architecture</span> of <span className="showcase-gradient-text">Tomorrow</span>.
					</h1>

					<p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
						Explore our gallery of production-grade digital solutions, from AI-integrated platforms to high-performance SaaS ecosystems.
					</p>

					<a
						href="#showcase-grid"
						className="group absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-indigo-400/35 bg-slate-950/55 p-3 text-indigo-200 backdrop-blur-sm transition duration-300 hover:border-indigo-300/70 hover:text-white"
						aria-label="Scroll to showcase projects"
					>
						<svg
							viewBox="0 0 24 24"
							className="h-5 w-5 animate-bounce"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.9"
							aria-hidden="true"
						>
							<path d="M6 10.2L12 16l6-5.8" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</a>
				</div>
			</section>

			<Projectsfilter />

			<Testimonials />

			<CTA />

			<Footer />
		</main>
	)
}

export default Portfolio
