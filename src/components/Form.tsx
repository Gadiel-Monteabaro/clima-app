import { ChangeEvent, useState } from "react";
import { countries } from "../data/countries";
import type { SearchType } from "../types";

export default function Form() {
  // Inicializar el estado "search" con un objeto, que contiene las propiedades "city" y "country" sin valores
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

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

  return (
    <form className="form-clima">
      <div>
        <select
          className="form-select inputs"
          id="country"
          name="country"
          value={search.city}
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
    </form>
  );
}
