import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from './assets/logo.png'

const navLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'About', to: '/about' },
	{ label: 'Services', to: '/services' },
	{ label: 'Portfolio', to: '/showcase' },
	{ label: 'Contact', to: '/contact' },
]

function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header className="sticky top-0 z-50 bg-[#0B0F19]/95 text-slate-100 backdrop-blur-md">
			<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link
					to="/"
					className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
					onClick={closeMenu}
				>
					<img
						src={logo}
						alt="DevelopersHub logo"
						className="h-9 w-9 rounded-md object-contain ring-1 ring-white/20"
					/>
					<span className="text-lg font-semibold tracking-wide text-slate-100 transition-colors duration-300 group-hover:text-sky-300 sm:text-xl">
						DevelopersHub
					</span>
				</Link>

				<div className="hidden md:block">
					<ul className="flex items-center gap-7 text-sm font-medium tracking-wide text-slate-300">
						{navLinks.map((link) => (
							<li key={link.to}>
								<NavLink
									to={link.to}
									className={({ isActive }) =>
										`group relative pb-1 transition-colors duration-300 ${isActive ? 'text-sky-300' : 'hover:text-sky-300'}`
									}
								>
									{link.label}
									<span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100" />
								</NavLink>
							</li>
						))}
					</ul>
				</div>

				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 transition-colors duration-300 hover:bg-white/10 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:hidden"
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isMenuOpen}
					onClick={() => setIsMenuOpen((prev) => !prev)}
				>
					{isMenuOpen ? (
						<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					) : (
						<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<line x1="3" y1="6" x2="21" y2="6" />
							<line x1="3" y1="12" x2="21" y2="12" />
							<line x1="3" y1="18" x2="21" y2="18" />
						</svg>
					)}
				</button>
			</nav>

			<div
				className={`overflow-hidden bg-[#0B0F19] px-4 transition-all duration-300 ease-out md:hidden ${
					isMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
				}`}
			>
				<ul className="space-y-2 text-sm font-medium tracking-wide text-slate-300">
					{navLinks.map((link) => (
						<li key={link.to}>
							<NavLink
								to={link.to}
								className={({ isActive }) =>
									`block rounded-md px-3 py-2 transition-colors duration-300 ${isActive ? 'bg-white/10 text-sky-300' : 'hover:bg-white/10 hover:text-sky-300'}`
								}
								onClick={closeMenu}
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</header>
	)
}

export default NavBar
