import { countries } from "../data/countries";

export default function Form() {
  return (
    <form className="">
      <div>
        <label htmlFor="city">
          <input id="city" name="city" type="text" placeholder="ciudad" />
        </label>
      </div>
      <div>
        <label htmlFor="country">País:</label>
        <select id="country" name="country">
          <option value="">Seleccione un país</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value={"Clima"} />
    </form>
  );
}
