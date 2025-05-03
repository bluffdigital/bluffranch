import {client} from "@/sanity/lib/client";
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPage() {
    const posts = await client.fetch(`*[_type == "post"] | order(date desc) {
    title,
    slug,
    date,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`);

    return (
        <div className="min-h-screen bg-gray-100 pt-8 px-8 pb-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
                <ul>
                    {posts.map((post: any) => (
                        <li key={post.slug.current} className="mb-4 flex items-start space-x-4">
                            {post.coverImage?.asset?.url && (
                                <div className="flex-shrink-0">
                                    <Image
                                        src={post.coverImage.asset.url}
                                        alt={post.coverImage.alt || 'Cover image'}
                                        width={100}
                                        height={100}
                                        className="rounded-md object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <Link href={`/blog/${post.slug.current}`} className="text-blue-500 hover:underline text-lg font-semibold">
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
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}