import { MDBValidation, MDBValidationItem, MDBInput } from 'mdb-react-ui-kit';

interface Props {
  name: string;
  data: [];
}

export function CheckoutForm({ name, data }: Props) {
  return (
    <MDBValidation>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <MDBInput
          type="text"
          name={`${name}-street`}
          label="Street Address"
          required
        />
      </MDBValidationItem>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <MDBInput type="text" name={`${name}-city`} label="City" required />
      </MDBValidationItem>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <select
          className="form-control select-input"
          name={`${name}-country`}
          required
        >
          <option selected disabled>
            Country
          </option>
          {data &&
            data
              .sort((a: any, b: any) =>
                a.name.common.localeCompare(b.name.common)
              )
              .map((country: any) => (
                <option key={country.ccn3} value={country.cca2}>
                  {country.flag + ' ' + country.name.common}
                </option>
              ))}
        </select>
      </MDBValidationItem>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <MDBInput
          type="number"
          name={`${name}-zip`}
          label="Zip code"
          required
        />
      </MDBValidationItem>
    </MDBValidation>
  );
}
