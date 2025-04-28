import {client} from "@/sanity/lib/client";
import { PortableText } from 'next-sanity';

export async function generateStaticParams() {
    const slugs = await client.fetch(`*[_type == "post"].slug.current`);
    return slugs.map((slug: string) => ({ slug }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    content,
    date
  }`, { slug: params.slug });

    if (!post) {
        return <div className="min-h-screen bg-gray-100 p-8">Post not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-4">
                    {post.date
                        ? new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                        : 'Date not set'}
                </p>
                <PortableText value={post.content} />
            </div>
        </div>
    );
}