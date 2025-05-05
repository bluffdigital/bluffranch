import { fetchPhotos } from '@/sanity/lib/sanityClient';
import Image from 'next/image';

export default async function PhotosPage() {
    const photos = await fetchPhotos(`*[_type == "photo"] | order(uploadedAt desc) {
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
  }`);

    return (
        <div className="min-h-screen bg-gray-100 pt-8 px-8 pb-8">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Photo Gallery</h1>
                {photos.length === 0 ? (
                    <p className="text-gray-500">No photos have been uploaded yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {photos.map((photo) => (
                            <div key={photo._id} className="border rounded-lg overflow-hidden shadow-sm">
                                {photo.image?.asset?.url ? (
                                    <Image
                                        src={photo.image.asset.url}
                                        alt={photo.title || 'Uploaded photo'}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No image</span>
                                    </div>
                                )}
                                <div className="p-4">
                                    <p className="text-sm font-semibold truncate">{photo.title || 'Untitled'}</p>
                                    <p className="text-sm text-gray-500">
                                        {photo.uploadedAt
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}