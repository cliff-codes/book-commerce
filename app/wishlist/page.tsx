import { Metadata } from 'next';
import WishlistPage from '../ui/pages/WishlistPage';

export const metadata: Metadata = {
  title: 'My Wishlist | Bdocs',
  description: 'View and manage your book wishlist. Save books for later and track your reading interests.',
  robots: 'noindex, nofollow', // Wishlist pages shouldn't be indexed
};

export default function Wishlist() {
  return <WishlistPage />;
}
