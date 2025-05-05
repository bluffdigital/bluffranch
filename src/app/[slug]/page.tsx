import { fetchPhoto, fetchPhotoSlugs } from '../../../lib/sanityClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await fetchPhotoSlugs(`*[_type == "photo"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

export default async function PhotoPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const photo = await fetchPhoto(`*[_type == "photo" && slug.current == $slug][0] {
    _id,
    title,
    image {
      asset->{
        _id,
        url
      }
    },
    googlePhotoUrl,
    uploadedAt
  }`, { slug: params.slug });

  if (!photo) {
    notFound();
  }

  return (
      <div className="min-h-screen bg-gray-100 pt-8 px-8 pb-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">{photo.title || 'Untitled Photo'}</h1>
          {photo.image?.asset?.url ? (
              <div className="mb-6">
                <Image
                    src={photo.image.asset.url}
                    alt={photo.title || 'Uploaded photo'}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover"
                    priority
                />
              </div>
          ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center mb-6">
                <span className="text-gray-500">No image available</span>
              </div>
          )}
          <p className="text-sm text-gray-500 mb-4">
            Uploaded on: {photo.uploadedAt
              ? new Date(photo.uploadedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
              : 'Date not set'}
          </p>
          {photo.googlePhotoUrl && (
              <a
                  href={photo.googlePhotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
              >
                View on Google Photos
              </a>
          )}
        </div>
      </div>
  );
}