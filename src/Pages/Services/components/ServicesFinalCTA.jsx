import { Link } from 'react-router-dom'

function ServicesFinalCTA() {
	return (
		<section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-10">
			<div className="relative z-10 mx-auto w-full max-w-6xl rounded-3xl border border-slate-600/70 bg-slate-900/70 p-px">
				<div className="rounded-[calc(1.5rem-1px)] border border-white/10 bg-slate-950/65 px-6 py-12 text-center backdrop-blur-xl sm:px-10 sm:py-14 lg:px-16 lg:py-16">
					<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
						Have a Specific Project in Mind?
					</h2>
					<p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
						We offer custom consultations to help you determine the best tech stack for your goals. Let&apos;s engineer your roadmap to success.
					</p>

					<div className="mt-9">
						<Link
							to="/booking"
							className="group relative inline-flex min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-300/20 bg-slate-100 px-8 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-200 sm:w-auto sm:min-w-[20rem]"
						>
							<span className="relative">Book a Technical Audit</span>
							<span className="relative" aria-hidden="true">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
									<rect x="3.5" y="4.5" width="17" height="15" rx="2.2" />
									<path d="M7.5 2.8v3.8M16.5 2.8v3.8M3.5 9.2h17" strokeLinecap="round" />
									<path d="m10.2 13.4 2 2 3.6-3.7" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
						</Link>

						<p className="mt-3 text-xs text-slate-400">
							No commitment required. 15-minute technical discovery.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ServicesFinalCTA