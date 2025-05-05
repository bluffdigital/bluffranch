import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { fetchPage, fetchPageSlugs } from "@/sanity/lib/sanityClient";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const data = await fetchPageSlugs(pagesSlugs, {
    perspective: "published",
    stega: false,
  });
  return data.map((slug) => ({ slug }));
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const page = await fetchPage(getPageQuery, params);

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const page = await fetchPage(getPageQuery, params);

  if (!page?._id) {
    return (
        <div className="py-40">
          {/* Placeholder for not found state */}
        </div>
    );
  }

  return (
      <div className="my-12 lg:my-24">
        <Head>
          <title>{page.heading}</title>
        </Head>
        <div className="">
          <div className="container">
            <div className="pb-6 border-b border-gray-100">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                  {page.heading}
                </h2>
                <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                  {page.subheading}
                </p>
              </div>
            </div>
          </div>
        </div>
        <PageBuilderPage page={page} />
      </div>
  );
}