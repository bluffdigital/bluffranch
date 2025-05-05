import {fetchPost, fetchPosts} from '@/sanity/lib/sanityClient';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

export async function generateStaticParams() {
    const slugs = await fetchPosts(`*[_type == "post"].slug.current`);
    return slugs.map((slug) => ({ slug }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await fetchPost(`*[_type == "post" && slug.current == $slug][0] {
    title,
    content,
    date,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`, { slug: params.slug });

    if (!post) {
        return <div className="min-h-screen bg-gray-100 p-8">Post not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {post.coverImage?.asset?.url && (
                    <div className="mb-6">
                        <Image
                            src={post.coverImage.asset.url}
                            alt={post.coverImage.alt || 'Cover image'}
                            width={800}
                            height={400}
                            className="w-full h-auto rounded-lg object-cover"
                            priority
                        />
                    </div>
                )}
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