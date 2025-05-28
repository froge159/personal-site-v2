import { NextResponse } from 'next/server';

type tParams = Promise<{ slug: string[] }>;


export async function GET(request: Request, { params }: { params:  tParams }) {
  const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
  const API_KEY = process.env.API_KEY;
  const {slug} : {slug: string[]} = await params;

  const res = await fetch(`${API_URL}/api/blogs/fetch_blog/${slug}`, {
    headers: {
      'X-API-Key': API_KEY || '',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }

  return NextResponse.json(await res.json());
}