import { useEffect, useState } from "react";
import Form from "./components/Form";
import useWeather from "./hooks/useWheater";

function App() {
  // Inicializar estado "animacion" para el efecto de transición de carga de elementos
  const [animacion, setAnimacion] = useState(false);

  // Ejecutar una sola vez el temporizador para cambiar el estado "animacion" al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimacion(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const { fetchWeather } = useWeather();
  return (
    <>
      <div className={`container ${animacion ? "visible" : ""}`}>
        <div className="cards">
          <div className="card first-card">
            <section>
              <h2 className="card-title">clima</h2>
              <Form fetchWeather={fetchWeather} />
            </section>
            <section className="card-info">
              <p>&copy; {new Date().getFullYear()} Gadiel Monteabaro</p>
              <a
                href="https://github.com/Gadiel-Monteabaro/clima-app"
                className="link-git"
                target="_blank"
              >
                <i className="ri-github-fill">GitHub</i>
              </a>
            </section>
          </div>
          <div className="card second-card">
            <section></section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
