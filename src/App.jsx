import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/About/AboutUs";
import Booking from "./Pages/Booking/Booking";
import Contact from "./Pages/Contact/Contact";
import Services from "./Pages/Services/Services";
import Portfolio from "./Pages/Portfolio/components/Portfolio";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/solutions" element={<Services />} />
        <Route path="/services" element={<Services />} />
        <Route path="/showcase" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
