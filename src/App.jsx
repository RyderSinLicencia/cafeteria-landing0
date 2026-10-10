import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Testimonials from "./components/Testimonials";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalogo />
        <Testimonials />
      </main>
    </>
  );
}

export default App;
