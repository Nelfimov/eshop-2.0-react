import { MDBValidationItem, MDBInput } from 'mdb-react-ui-kit';

interface Props {
  name: string;
  data: [];
  refs: any[];
}

export function CheckoutForm({ name, data, refs }: Props) {
  return (
    <>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <MDBInput
          type="text"
          name={`${name}-name`}
          label="Full name"
          ref={refs[0]}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <MDBInput
          type="text"
          name={`${name}-street`}
          label="Street Address"
          ref={refs[1]}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <MDBInput
          type="text"
          name={`${name}-city`}
          ref={refs[2]}
          label="City"
          required
        />
      </MDBValidationItem>
      <MDBValidationItem invalid className="mb-3 pb-1">
        <select
          className="form-control select-input"
          name={`${name}-country`}
          ref={refs[3]}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select country
          </option>
          {data &&
            data
              .sort((a: any, b: any) =>
                a.name.common.localeCompare(b.name.common)
              )
              .map((country: any) => (
                <option key={`${name}-${country.ccn3}`} value={country.cca2}>
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
          ref={refs[4]}
          required
        />
      </MDBValidationItem>
    </>
  );
}
