import { ChangeEvent, useState } from "react";
import { countries } from "../data/countries";
import type { SearchType } from "../types";

export default function Form() {
  // Inicializar el estado "search" con un objeto, que contiene las propiedades "city" y "country" sin valores
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });

    console.log(search);
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
