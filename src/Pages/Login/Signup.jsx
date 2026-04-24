import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../Footer'
import NavBar from '../../NavBar'
import ParticleBackground from '../../ParticleBackground'

const initialForm = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
}

function Signup() {
	const [formData, setFormData] = useState(initialForm)

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	return (
		<main className="min-h-screen bg-slate-950 text-slate-100">
			<NavBar />

			<section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
				<ParticleBackground />

				<div className="relative z-10 mx-auto w-full max-w-5xl">
					<div className="mx-auto max-w-lg rounded-3xl border border-slate-700/70 bg-slate-900/65 p-6 shadow-[0_24px_60px_-38px_rgba(59,130,246,0.55)] backdrop-blur-md sm:p-8">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80 sm:text-sm">Create Account</p>
						<h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Join DevelopersHub</h1>
						<p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">Create your account to start planning and tracking your next digital project.</p>

						<form className="mt-8 space-y-5" onSubmit={handleSubmit}>
							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label htmlFor="firstName" className="text-sm font-medium text-slate-200">
										First Name
									</label>
									<input
										id="firstName"
										name="firstName"
										type="text"
										autoComplete="given-name"
										value={formData.firstName}
										onChange={handleChange}
										required
										className="mt-2 w-full rounded-xl border border-slate-600/80 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
									/>
								</div>

								<div>
									<label htmlFor="lastName" className="text-sm font-medium text-slate-200">
										Last Name
									</label>
									<input
										id="lastName"
										name="lastName"
										type="text"
										autoComplete="family-name"
										value={formData.lastName}
										onChange={handleChange}
										required
										className="mt-2 w-full rounded-xl border border-slate-600/80 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="email" className="text-sm font-medium text-slate-200">
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="mt-2 w-full rounded-xl border border-slate-600/80 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
								/>
							</div>

							<div>
								<label htmlFor="password" className="text-sm font-medium text-slate-200">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									value={formData.password}
									onChange={handleChange}
									required
									className="mt-2 w-full rounded-xl border border-slate-600/80 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
								/>
							</div>

							<button
								type="submit"
								className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-indigo-400 hover:to-blue-400"
							>
								Create Account
							</button>
						</form>

						<p className="mt-6 text-center text-sm text-slate-300">
							Already have an account?{' '}
							<Link to="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
								Login
							</Link>
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}

export default Signup
