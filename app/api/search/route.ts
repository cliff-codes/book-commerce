
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Book } from '@/app/lib/models';

export async function GET(request: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query') || '';

        console.log("Query: ", query)

        // simple fuzzy search
        const books = await Book.find({ title: { $regex: query, $options: 'i' } });
        console.log("books: ", books)
        return NextResponse.json(books);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

