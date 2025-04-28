import { client } from "@/sanity/lib/client";
import Link from 'next/link';

export default async function AllPosts() {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    date
  }`);

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                    <div key={post.slug.current} className="border border-brown-700 p-4 rounded-lg shadow-sm bg-cream-50">
                        <Link href={`/blog/${post.slug.current}`} className="text-amber-600 hover:text-amber-700">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                        </Link>
                        <p className="text-sm text-brown-600">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}