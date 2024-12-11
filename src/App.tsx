import { useEffect, useState } from "react";
import Form from "./components/Form";
import useWeather from "./hooks/useWheater";
import { formatTemperature } from "./utils";
import Spinner from "./components/Spinner";

function App() {
  const { fetchWeather, weather, hasWeatherData, loading } = useWeather();
  // Inicializar estado "animacion" para el efecto de transición de carga de elementos
  const [animacion, setAnimacion] = useState(false);

  // Ejecutar una sola vez el temporizador para cambiar el estado "animacion" al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimacion(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const hour = new Date().getHours();

  return (
    <>
      <div className={`container ${animacion ? "visible" : ""}`}>
        <div className="cards">
          <div className="card first-card">
            <section>
              <h2 className="card-title">clima</h2>
              <Form fetchWeather={fetchWeather} />
            </section>
            {loading && <Spinner />}
            {hasWeatherData ? (
              <section
                className={`weather-details ${
                  hour < 18 && hour > 6 ? "bg-day" : "bg-night"
                }`}
              >
                <div>
                  <p className="weather-name">
                    <span>
                      <i className="ri-map-pin-2-line"></i>
                    </span>
                    {weather.name}{" "}
                  </p>
                </div>
                <div className="temp-container">
                  <div className="state-container">
                    <img
                      src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt={`icono de clima ${weather.name}`}
                    />
                    <p className="weather-state">
                      {weather.weather[0].description}
                    </p>
                  </div>
                  <p className="weather-temp">
                    {formatTemperature(weather.main.temp)}&deg;C
                  </p>
                </div>
              </section>
            ) : (
              <section></section>
            )}
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
        </div>
      </div>
    </>
  );
}

export default App;
