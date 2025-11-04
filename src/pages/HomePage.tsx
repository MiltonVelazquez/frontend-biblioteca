import { Link } from "react-router-dom";

const buttonStyle = {
  display: "inline-block",
  padding: "12px 20px",
  margin: "10px",
  fontSize: "16px",
  textDecoration: "none",
  color: "white",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Panel de Gestión de la Biblioteca</h1>
      <nav>
        <Link to="/libros" style={buttonStyle}>
          Gestionar Libros
        </Link>
        <Link to="/socios" style={buttonStyle}>
          Gestionar Socios
        </Link>
        <Link to="/prestamos" style={buttonStyle}>
          Gestionar Préstamos
        </Link>
      </nav>
    </div>
  );
}

export default HomePage;
