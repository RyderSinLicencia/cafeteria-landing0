import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductosProvider } from "./context/ProductosContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  return (
    <ProductosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ProductosProvider>
  );
}

export default App;