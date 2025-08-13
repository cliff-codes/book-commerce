import { Metadata } from 'next';
import CartPage from '../ui/pages/CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart | Bdocs',
  description: 'Review your shopping cart. Add or remove items, update quantities, and proceed to secure checkout.',
  robots: 'noindex, nofollow', // Cart pages shouldn't be indexed
};

export default function Cart() {
  return <CartPage />;
}