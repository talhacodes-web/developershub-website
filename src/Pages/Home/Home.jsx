import Footer from '../../Footer'
import Hero from './components/Hero'
import MeetingScheduler from './components/MeetingScheduler'
import NavBar from '../../NavBar'
import PortfolioHighlights from './components/PortfolioHighlights'
import Services from './components/Services'
import Stats from './components/Stats'
import TheAgency from './components/TheAgency'
import TrustedBy from './components/TrustedBy'


function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar />
      <Hero />
      <TrustedBy />
      <Services />
      <TheAgency />
      <PortfolioHighlights />
      <Stats />
      <MeetingScheduler />
      <Footer />
    </main>
  )
}

export default Home
