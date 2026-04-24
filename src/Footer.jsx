import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const companyLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'About Us', to: '/about' },
	{ label: 'Services', to: '/services' },
	{ label: 'Portfolio', to: '/portfolio' },
	{ label: 'Contact', to: '/contact' },
]
const solutionLinks = [
	'Software Dev',
	'AI Automation',
	'Digital Marketing',
	'Post Production',
]

const socialLinks = [
	{
		name: 'LinkedIn',
		path: 'M6 9h4v12H6zM8 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm4 5h3.8v1.7h.1c.5-.9 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v6.3h-4v-5.6c0-1.3 0-3-1.8-3-1.9 0-2.2 1.5-2.2 2.9V21h-4z',
	},
	{
		name: 'GitHub',
		path: 'M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.3 1.1-3.1-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3.3 1.1a11 11 0 0 1 6 0c2.4-1.4 3.3-1.1 3.3-1.1.6 1.7.2 2.9.1 3.2.7.8 1.1 1.8 1.1 3.1 0 4.5-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7z',
	},
	{
		name: 'Twitter',
		path: 'M22 5.7c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.2-.8.5-1.7.8-2.6 1-1.5-1.6-4.2-1.6-5.7.1-1 1-1.4 2.5-1 3.9-3.1-.2-6-1.7-7.9-4.1-1.1 1.9-.5 4.4 1.3 5.6-.6 0-1.3-.2-1.8-.5 0 2.1 1.5 4 3.6 4.4-.6.2-1.3.2-1.9.1.6 1.9 2.4 3.2 4.4 3.3A8.7 8.7 0 0 1 3 19.5a12.3 12.3 0 0 0 6.6 1.9c7.9 0 12.3-6.5 12.3-12.2v-.6c.8-.6 1.5-1.3 2.1-2.1z',
	},
	{
		name: 'Instagram',
		path: 'M7.2 1h9.6A6.2 6.2 0 0 1 23 7.2v9.6A6.2 6.2 0 0 1 16.8 23H7.2A6.2 6.2 0 0 1 1 16.8V7.2A6.2 6.2 0 0 1 7.2 1zm0 2A4.2 4.2 0 0 0 3 7.2v9.6A4.2 4.2 0 0 0 7.2 21h9.6a4.2 4.2 0 0 0 4.2-4.2V7.2A4.2 4.2 0 0 0 16.8 3H7.2zm10.2 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM12 6.2A5.8 5.8 0 1 1 6.2 12 5.8 5.8 0 0 1 12 6.2zm0 2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2z',
	},
]

function Footer() {
	const scrollToTop = () => {
		const heroSection = document.getElementById('hero-section')

		if (heroSection) {
			heroSection.scrollIntoView({ behavior: 'smooth' })
			return
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<footer className="relative overflow-hidden bg-linear-to-br from-[#0B0F19] via-[#151336] to-[#0F1C36] px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_28%_at_50%_0%,rgba(99,102,241,0.12),transparent_72%)]" />

			<button
				type="button"
				onClick={scrollToTop}
				className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:bg-indigo-500/20 hover:text-indigo-100 sm:right-6 sm:top-6"
			>
				<ArrowUp className="h-3.5 w-3.5" />
				Top
			</button>

			<div className="relative z-10 mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					<div>
						<h3 className="bg-linear-to-r from-fuchsia-300 via-indigo-300 to-cyan-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
							Developers Hub
						</h3>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
							Engineering the future of digital solutions with AI-driven innovation and production-grade development.
						</p>

						<div className="mt-5 flex items-center gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href="#"
									aria-label={social.name}
									className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/3 text-slate-500 transition-all duration-300 hover:text-indigo-300"
								>
									<svg
										viewBox="0 0 24 24"
										className="h-4 w-4"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d={social.path} />
									</svg>
								</a>
							))}
						</div>
					</div>

					<div>
						<h4 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Company</h4>
						<ul className="mt-4 space-y-3 text-sm text-slate-400">
							{companyLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="relative inline-block transition-colors duration-300 hover:text-slate-100"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Solutions</h4>
						<ul className="mt-4 space-y-3 text-sm text-slate-400">
							{solutionLinks.map((link) => (
								<li key={link}>
									<a
										href="#"
										className="relative inline-block transition-colors duration-300 hover:text-slate-100"
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Newsletter</h4>
						<p className="mt-4 text-sm text-slate-400">Subscribe for the latest tech insights.</p>

						<form className="mt-4 flex flex-col gap-3 sm:max-w-xs">
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full rounded-xl bg-[#0D0D0D] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors duration-300 focus:bg-[#121212]"
							/>
							<button
								type="submit"
								className="rounded-xl bg-linear-to-r from-indigo-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-indigo-400 hover:to-blue-400"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				<div className="mt-12 pt-6">
					<div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
						<p>© 2026 Developers Hub Corporation. All rights reserved.</p>
						<div className="flex items-center gap-5">
							<a href="#" className="transition-colors duration-300 hover:text-slate-300">
								Privacy Policy
							</a>
							<a href="#" className="transition-colors duration-300 hover:text-slate-300">
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
