import { useMemo, useState } from 'react'

const weekdaySlots = {
	1: ['9:00 AM', '11:30 AM', '2:00 PM'],
	2: ['10:00 AM', '12:30 PM', '3:30 PM'],
	3: ['9:30 AM', '1:00 PM', '4:00 PM'],
	4: ['8:45 AM', '11:15 AM', '2:45 PM'],
	5: ['10:15 AM', '12:45 PM', '3:15 PM'],
	6: ['9:20 AM', '11:50 AM', '1:40 PM'],
}

function MeetingScheduler() {
	const today = useMemo(() => new Date(), [])
	const monthLabel = useMemo(
		() =>
			today.toLocaleString('en-US', {
				month: 'long',
				year: 'numeric',
			}),
		[today],
	)

	const firstDayIndex = useMemo(
		() => new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
		[today],
	)
	const daysInMonth = useMemo(
		() => new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
		[today],
	)

	const days = Array.from({ length: daysInMonth }, (_, idx) => idx + 1)

	const [selectedDate, setSelectedDate] = useState(today.getDate())

	const getDayIndex = (date) =>
		new Date(today.getFullYear(), today.getMonth(), date).getDay()
	const getSlotsForDate = (date) => weekdaySlots[getDayIndex(date)] ?? []

	const [selectedTime, setSelectedTime] = useState(() => {
		const initialSlots = getSlotsForDate(today.getDate())
		return initialSlots[0] ?? ''
	})

	const isSundaySelected = getDayIndex(selectedDate) === 0
	const availableSlots = getSlotsForDate(selectedDate)

	return (
		<section id="meeting-scheduler" className="relative scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
			<div className="pointer-events-none absolute inset-0" />

			<div className="relative z-10 mx-auto max-w-7xl">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
						Ready to Scale Your Next Project?
					</h2>
					<p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
						Book a 15-minute discovery call with our technical experts to discuss your roadmap.
					</p>
				</div>

				<div className="mx-auto mt-10 max-w-5xl rounded-3xl bg-white/5 p-5 backdrop-blur-md sm:p-7 lg:p-8">
					<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200">
							<span className="relative flex h-2.5 w-2.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
							</span>
							Next Available Slot: Today
						</div>
					</div>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
						<div className="hidden rounded-2xl bg-slate-900/40 p-5 lg:block">
							<div className="mb-4 flex items-center justify-between">
								<p className="text-sm font-semibold text-slate-100">{monthLabel}</p>
								<p className="text-xs uppercase tracking-widest text-slate-400">Calendar</p>
							</div>

							<div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-wide text-slate-400">
								<span>Sun</span>
								<span>Mon</span>
								<span>Tue</span>
								<span>Wed</span>
								<span>Thu</span>
								<span>Fri</span>
								<span>Sat</span>
							</div>

							<div className="mt-3 grid grid-cols-7 gap-2">
								{Array.from({ length: firstDayIndex }).map((_, index) => (
									<span key={`spacer-${index}`} className="h-10" />
								))}

								{days.map((day) => {
									const isSunday = getDayIndex(day) === 0
									const isSelected = selectedDate === day

									return (
										<button
											key={day}
											type="button"
											onClick={() => {
												setSelectedDate(day)
												if (!isSunday) {
													const nextSlots = getSlotsForDate(day)
													setSelectedTime(nextSlots[0] ?? '')
												}
											}}
											className={`h-10 rounded-lg text-sm font-medium transition-all duration-100 cursor-pointer ${
												isSelected && isSunday
													? 'bg-rose-500/35 text-rose-100 shadow-[0_0_0_1px_rgba(251,113,133,0.55)]'
													: isSelected
														? 'bg-indigo-500 text-white shadow-[0_0_0_1px_rgba(129,140,248,0.5)]'
													: !isSunday
														? 'text-emerald-200 hover:bg-indigo-500/10'
														: 'text-rose-300/80 hover:bg-rose-500/10'
											}`}
										>
											{day}
										</button>
									)
								})}
							</div>
						</div>

						<div className="rounded-2xl bg-slate-900/40 p-5">
							<p className="text-sm font-semibold text-slate-100">Select a time slot</p>
							<p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
								{selectedDate} {monthLabel}
							</p>

							{isSundaySelected ? (
								<div className="mt-5 rounded-xl bg-rose-500/10 px-4 py-4 text-sm font-medium text-rose-200">
									Sunday is off. There are no available slots.
								</div>
							) : (
								<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
									{availableSlots.map((slot) => {
										const isActive = selectedTime === slot

										return (
											<button
												key={slot}
												type="button"
												onClick={() => setSelectedTime(slot)}
												className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
													isActive
														? 'scale-105 border-indigo-300/60 bg-indigo-500/30 text-indigo-100'
														: 'bg-white/5 text-slate-200 hover:scale-105 hover:bg-indigo-500/15'
												}`}
											>
												{slot}
											</button>
										)
									})}
								</div>
							)}

							{!isSundaySelected && (
								<button
									type="button"
									className="mt-6 w-full rounded-xl bg-linear-to-r from-indigo-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-indigo-400 hover:to-blue-400"
								>
									Confirm Selection
								</button>
							)}

							<div className="mt-5 lg:hidden">
								<label htmlFor="mobile-date" className="mb-2 block text-xs uppercase tracking-wider text-slate-400">
									Select Date
								</label>
								<select
									id="mobile-date"
									value={selectedDate}
									onChange={(event) => {
										const selected = Number(event.target.value)
										setSelectedDate(selected)
										if (getDayIndex(selected) !== 0) {
											const nextSlots = getSlotsForDate(selected)
											setSelectedTime(nextSlots[0] ?? '')
										}
									}}
									className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition-colors duration-300 focus:bg-white/10"
								>
									{days.map((day) => (
										<option key={day} value={day}>
											{monthLabel} {day}{getDayIndex(day) === 0 ? ' (Sunday - Off)' : ''}
										</option>
									))}
								</select>
								{isSundaySelected && (
									<p className="mt-4 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
										Sunday is off. There are no available slots.
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MeetingScheduler
