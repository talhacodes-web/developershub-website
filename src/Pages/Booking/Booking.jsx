import Footer from '../../Footer'
import NavBar from '../../NavBar'
import MeetingScheduler from '../Home/components/MeetingScheduler'

function Booking() {
	return (
		<main className="bg-slate-950">
			<NavBar />
			<MeetingScheduler />
			<Footer />
		</main>
	)
}

export default Booking
