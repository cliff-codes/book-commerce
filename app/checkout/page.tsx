import { Metadata } from 'next';
import CheckoutPage from '../ui/pages/CheckoutPage';

export const metadata: Metadata = {
  title: 'Checkout | Bdocs',
  description: 'Complete your purchase securely. Enter shipping and payment information to place your order.',
  robots: 'noindex, nofollow', // Checkout pages shouldn't be indexed
};

export default function Checkout() {
  return <CheckoutPage />;
}
