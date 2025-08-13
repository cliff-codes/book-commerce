import { Metadata } from 'next';
import { getBook } from '@/app/lib/data';
import BookDetailsPage from '../ui/pages/BookDetailsPage';
import { notFound } from 'next/navigation';

interface BookPageProps {
  params: {
    bookId: string;
  };
}

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  // Early return for invalid IDs (like static files)
  if (!isValidObjectId(params.bookId)) {
    return {
      title: 'Book Not Found | Bdocs',
      description: 'The requested book could not be found.',
    };
  }

  try {
    const book = await getBook(params.bookId);
    
    if (!book) {
      return {
        title: 'Book Not Found | Bdocs',
        description: 'The requested book could not be found.',
      };
    }

    return {
      title: `${book.title} by ${book.author || 'Unknown Author'} | Bdocs`,
      description: book.description,
      keywords: `${book.title}, ${book.author}, books, online bookstore`,
      openGraph: {
        title: book.title,
        description: book.description,
        type: 'book',
        url: `/${params.bookId}`,
        images: [
          {
            url: book.img,
            width: 400,
            height: 600,
            alt: book.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Book Details | Bdocs',
      description: 'View book details and purchase information.',
    };
  }
}

export default async function BookPage({ params }: BookPageProps) {
  // Early return for invalid IDs (like static files)
  if (!isValidObjectId(params.bookId)) {
    notFound();
  }

  try {
    const book = await getBook(params.bookId);
    
    if (!book) {
      notFound();
    }

    return <BookDetailsPage book={book} />;
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Error Loading Book
          </h1>
          <p className="text-neutral-600 mb-8">
            There was an error loading the book details.
          </p>
        </div>
      </div>
    );
  }
}