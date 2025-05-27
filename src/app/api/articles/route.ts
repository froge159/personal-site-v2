import { NextResponse } from 'next/server';

interface Article {
	title: string;
	description: string;
	pub_date: string;
	slug: string;
}

export async function GET() {
    const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
    const API_KEY = process.env.API_KEY;

    const res = await fetch(`${API_URL}/api/blogs/fetch_all_blogs`, {
        headers: {
            'X-API-Key': API_KEY || '',
        },
    });
    
    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }

    let articles: Article[] = [];
    try {
        articles = await res.json() as Article[];
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json(articles);
}