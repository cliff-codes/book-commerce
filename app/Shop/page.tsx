import { Metadata } from 'next';
import StorePage from '../ui/pages/StorePage';

export const metadata: Metadata = {
  title: 'Shop - Browse Books | Bdocs',
  description: 'Discover thousands of books across all genres. Browse fiction, non-fiction, science, history, and more. Find your next favorite read.',
  keywords: 'books, online bookstore, fiction, non-fiction, science, history, biography, self-help, business, technology',
  openGraph: {
    title: 'Shop - Browse Books | Bdocs',
    description: 'Discover thousands of books across all genres. Browse fiction, non-fiction, science, history, and more.',
    type: 'website',
    url: '/Shop',
  },
};

export default function Shop() {
  return <StorePage />;
}