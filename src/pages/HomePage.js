import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";
import { Contact } from "../components/Contact";
import { About } from "../components/About";
import { Services } from "../components/Services";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <div className="HomePage">
            <NavBar />
            <Banner />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    )
}

export default HomePage;