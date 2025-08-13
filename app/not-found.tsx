import { Button } from './ui/components/design-system';
import { FiHome, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-neutral-400">404</span>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-neutral-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-3">
          <Link href="/">
            <Button className="flex items-center gap-2 mx-auto">
              <FiHome className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/Shop">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <FiSearch className="w-4 h-4" />
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
