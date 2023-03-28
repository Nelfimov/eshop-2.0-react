import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/styles/input.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components';
import { CartProvider, UserProvider } from '@/context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { NotificationProvider } from '@/context/notification';

export default function App({ Component, pageProps }: AppProps) {
  const paypalOptions = {
    'client-id':
      'AUkvj_6SKJwSUA6EqN3vyWq5Mp6aK7P1vErE6TVjbCoQ7uI_9TCpgc2jMEjmYnKrcqI_MERf-t2j1Rp2',
    currency: 'EUR',
    intent: 'capture',
  };

  return (
    <UserProvider>
      <CartProvider>
        <PayPalScriptProvider options={paypalOptions}>
          <NotificationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationProvider>
        </PayPalScriptProvider>
      </CartProvider>
    </UserProvider>
  );
}
