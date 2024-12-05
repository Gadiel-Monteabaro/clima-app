import { countries } from "../data/countries";

export default function Form() {
  return (
    <form className="form-clima">
      <div>
        <select className="form-select inputs" id="country" name="country">
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
        />
      </div>
      <input className="input-submit" type="submit" value={"Consultar clima"} />
    </form>
  );
}
