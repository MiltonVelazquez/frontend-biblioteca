import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LibrosPage from "./pages/LibrosPage";
import SociosPage from "./pages/SociosPage";
import PrestamosPage from "./pages/PrestamosPage";
import MultasPage from "./pages/MultasPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/libros" element={<LibrosPage />} />
        <Route path="/socios" element={<SociosPage />} />
        <Route path="/prestamos" element={<PrestamosPage />} />
        <Route path="/multas" element={<MultasPage />} />
      </Routes>
    </div>
  );
}

export default App;
