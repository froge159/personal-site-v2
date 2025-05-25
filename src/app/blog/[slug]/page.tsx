import BlogPageContent from "@/components/BlogPageContent";
import { notFound } from "next/navigation";


interface Article {
	title: string;
	description: string;
	pub_date: string;
	slug: string;
    body: string;
}

const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
export const revalidate = 3600;


export async function generateStaticParams() {
    const response = await fetch(`${API_URL}/blogs/fetch_all_blogs`, {
		headers: {
			'X-API-Key': "" + process.env.NEXT_PUBLIC_API_KEY,
		},
	});
    const data = await response.json();
    const posts: Article[] = data;

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPage({params} : {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const response = await fetch(`${API_URL}/blogs/fetch_blog/${slug}`, {
        headers: {
            'X-API-Key': "" + process.env.NEXT_PUBLIC_API_KEY,
        },
    });
    const data = await response.json();
    const article: Article = data;
    
    if (!article) {notFound(); }
    
    return (
        <BlogPageContent article={article}/>
    )
}