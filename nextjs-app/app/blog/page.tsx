import {client} from "@/sanity/lib/client";
import Link from 'next/link';

export default async function BlogPage() {
    const posts = await client.fetch(`*[_type == "post"] | order(date desc) {
    title,
    slug,
    date
  }`);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
                <ul>
                    {posts.map((post: any) => (
                        <li key={post.slug.current} className="mb-4">
                            <Link href={`/blog/${post.slug.current}`} className="text-blue-500 hover:underline">
                                {post.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                                {post.date
                                    ? new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                    : 'Date not set'}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}