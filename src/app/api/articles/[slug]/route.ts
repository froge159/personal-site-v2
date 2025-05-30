import { NextResponse, type NextRequest } from 'next/server';


export async function GET(request: NextRequest, context: { params: { slug: string } }): Promise<NextResponse> {
//export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
// export async function GET(request: NextRequest, {params}: {params: Promise<{ slug: string }>}) {
  const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
  const API_KEY = process.env.API_KEY;
  const {slug} = context.params;

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