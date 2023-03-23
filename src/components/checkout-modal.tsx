import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
  show: boolean;
  action: any;
  redirect: any;
}

export function CheckoutModal({ show, action, redirect }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return isBrowser ? (
    <MDBModal show={show}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Address found</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={action}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            Your order already has filled in address. Would you like to use it?
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={action}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={() => redirect()}>
              Continue with this address
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  ) : null;
}
