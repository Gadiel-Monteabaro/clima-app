import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../data/countries";
import type { SearchType } from "../types";
import Alert from "./Alert";

export default function Form() {
  // Inicializar el estado "search" con un objeto, que contiene las propiedades "city" y "country" sin valores
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });
  const [alert, setAlert] = useState("");

  // Función que controla los cambios echos en el formulario, por el evento "e"
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    // Actualizar el estado "search" con la propiedad que coincide con el atributo "name" del input
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  // Función que valida que los campos fueron completados correctamente
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Si los campos estan vacios, actualizar el estado "alert", con un mensaje de aviso
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    // sino, dejar el estado "alert"vacio
    setAlert("");
  };

  return (
    <form className="form-clima" onSubmit={handleSubmit}>
      <div>
        <select
          className="form-select inputs"
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">Seleccione un país</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          className="input-city inputs"
          id="city"
          name="city"
          type="text"
          placeholder="Ingrese una ciudad"
          autoComplete="off"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <input className="input-submit" type="submit" value={"Consultar clima"} />
      {alert && <Alert alert={alert}>Todos los campos son obligatorios</Alert>}
    </form>
  );
}
