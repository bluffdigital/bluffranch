import { Suspense } from 'react';
import Image from 'next/image';
import AllPosts from '@/app/components/AllPosts';

export default function HomePage() {
  return (
      <div className="min-h-screen">
        <section className="relative h-[500px] w-full">
          <Image
              src="/images/hero-image.jpg"
              alt="Bluff Ranch Hero"
              layout="fill"
              objectFit="cover"
              className="z-0"
              priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Welcome to Bluff Ranch
            </h1>
            <p className="text-lg sm:text-xl text-cream-100 max-w-3xl mx-auto">
              Welcome to the Bluff Ranch blog. This will document the homestead build from land purchase to final finish nail.
            </p>
          </div>
        </section>

        <aside className="py-12 sm:py-20 bg-cream-100">
          <Suspense fallback={<div className="text-center text-brown-600">Loading posts...</div>}>
            <AllPosts />
          </Suspense>
        </aside>
      </div>
  );
}