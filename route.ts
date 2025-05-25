import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    // Determine which path to revalidate
    const model = body?.model; // Example: 'post'
    if (!model) {
        return NextResponse.json({ message: "Missing model" }, { status: 400 });
    }

    // Revalidate the specific pages
    revalidatePath("/"); // Revalidate homepage
    revalidatePath(`/blog`); // Revalidate collection page
    revalidatePath(`/blog/${body.entry?.slug}`); // Revalidate single post/page

    return NextResponse.json({ revalidated: true });
}
