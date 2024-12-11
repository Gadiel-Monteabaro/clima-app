import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";
import { useState } from "react";

const weatherSchema = z.object({
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

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

const initialState = {
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
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setNotFound(false);
    setWeather(initialState);
    try {
      // Determinar la longitud y latitud con los datos del input
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUrl);

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      const { data: weatherResult } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      console.log(result.data);

      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
  };
}
