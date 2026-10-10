import Header from "../components/Header";
import Hero from "../components/Hero";
import Catalogo from "../components/Catalogo";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalogo />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default Home;