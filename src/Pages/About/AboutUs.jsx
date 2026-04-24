import Footer from '../../Footer'
import NavBar from '../../NavBar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Leadership from './components/Leadership'
import OurProcess from './components/OurProcess'
import CTA from './components/CTA'

function AboutUs() {
	return (
		<main className="bg-slate-950">
			<NavBar />
			<Hero />
			<Journey />
			<OurProcess />
			<Leadership />
			<CTA />

			<Footer />
		</main>
	)
}

export default AboutUs
