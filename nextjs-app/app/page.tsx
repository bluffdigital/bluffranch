import {Suspense} from 'react';
import Image from "next/image";
import {client} from "@/sanity/lib/client";
import AllPosts from '@/app/components/AllPosts';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source).width(1200).height(500).quality(90).fit('crop').crop('top').url();
}

export default async function HomePage() {
    // Fetch the hero image from Sanity (replace 'photo-123' with the actual _id of your image)
    const heroImage = await client.fetch(`*[_type == "photo" && title == "Bluff Ranch Hero"][0] {
    title,
    image
  }`);

    // Fallback image URL if the fetch fails or the image isn't found
    const heroImageUrl = heroImage?.image ? urlFor(heroImage.image) : '/images/hero-image.jpg';

    return (
        <div className="min-h-screen">
            {/* Hero Section with Image */}
            <section className="relative h-[480px] w-full overflow-hidden">
                <Image
                    src={heroImageUrl}
                    alt="Bluff Ranch Hero"
                    className="z-0"
                    quality={90}
                    priority
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                        objectPosition: "top"
                    }} />
                {/* Overlay for Readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                {/* Title and Subtitle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Welcome to Bluff Ranch
                    </h1>
                    <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto">
                        Welcome to the Bluff Ranch blog. This will document the homestead build from land purchase to final finish nail.
                    </p>
                </div>
            </section>
            {/* Posts Section */}
            <aside className="py-12 sm:py-20 bg-cream-100">
                <Suspense fallback={<div className="text-center text-brown-600">Loading posts...</div>}>
                    <AllPosts />
                </Suspense>
            </aside>
        </div>
    );
}