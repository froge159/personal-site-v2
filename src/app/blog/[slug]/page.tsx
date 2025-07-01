import BlogPageContent from "@/components/BlogPageContent";


interface Article {
	title: string;
	description: string;
	pub_date: string;
	slug: string;
    body: string;
}


export async function generateStaticParams() {
    const API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
    const API_KEY = process.env.API_KEY;

    const res = await fetch(`${API_URL}/api/blogs/fetch_all_blogs`, {
        headers: {
            'X-API-Key': API_KEY || '',
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }

    let articles: Article[] = [];
    try {
        articles = await res.json() as Article[];
    } catch (error) {
        throw new Error("Failed to parse articles" + error);
    }

    return articles.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }>; }) {
    const { slug } =  await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_HANDLER_URL}/api/python/${slug}`);

    if (response.ok) {
        const article: Article = await response.json();
        return (
            <BlogPageContent article={article}/>
        )   
    }

    else {
        console.error("Failed to fetch article:", response.statusText);
    }
}