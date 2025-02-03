import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

// Validar esquema de objeto de clima
const weatherSchema = z.object({
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

// Definir esquema "Weather" y validar los datos obtenido de una API
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  weather: z.array(weatherSchema),
});
export type Weather = z.infer<typeof Weather>;

// Inicializar las propiedades del estado
export const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  weather: [
    {
      main: "",
      description: "",
      icon: "",
    },
  ],
};

export default function useWeather() {
  // Inicializar el estado "weather", contener la información a desarrollar
  const [weather, setWeather] = useState<Weather>(initialState);
  // Inicializar el estado "loading", Visualizar componente de carga de información
  const [loading, setLoading] = useState(false);
  // Inicializar el estado "notFound", representar el estado de la petición cuando no se encuentra dicha información
  const [notFound, setNotFound] = useState(false);

  // Función que realiza un fetching de datos a una API externa
  const fetchWeather = async (search: SearchType) => {
    // Identificador unico para acceder a los servicios de una API
    const appId = import.meta.env.VITE_API_KEY;
    // Actualizar los estados iniciales
    setLoading(true);
    setNotFound(false);
    setWeather(initialState);
    try {
      // Determinar la longitud y latitud con los argumentos de la funcion
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUrl);

      // Si la propiedad "data" esta vacia, actualizar el estado "notFound" "ciudad no encontrada"
      if (!data[0]) {
        setNotFound(true);
        setTimeout(() => {
          setNotFound(false);
        }, 3000);
        return;
      }

      // Almacenar la informacion "longitud" y "latitud"
      const lat = data[0].lat;
      const lon = data[0].lon;

      // Realizar la peticion a la API, con los datos almacenados previamente
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      const { data: weatherResult } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weatherResult);

      // Si los datos fueron encontrados correctamente, actualizart el estado "weather"
      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar la informacion cada vez que se escuchen cambios en el estado "weather"
  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    setWeather,
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
}
