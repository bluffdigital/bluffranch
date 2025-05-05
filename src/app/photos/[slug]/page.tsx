import {client} from "@/sanity/lib/client";
import Image from 'next/image';

export default async function PhotosPage() {
    const photos = await client.fetch(`*[_type == "photo"] | order(uploadedAt desc) {
    _id,
    title,
    image,
    googlePhotoUrl,
    uploadedAt
  }`);

    return (
        <div className="min-h-screen bg-gray-100 pt-8 px-8 pb-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Photos</h1>
                {photos.length === 0 ? (
                    <p className="text-gray-500">No photos available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {photos.map((photo: any) => (
                            <div key={photo._id} className="border p-4 rounded-md">
                                {photo.image?.asset?.url ? (
                                    <Image
                                        src={photo.image.asset.url}
                                        alt={photo.title || 'Photo'}
                                        width={300}
                                        height={200}
                                        className="w-full h-auto mb-2 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-2">
                                        <span className="text-gray-500">No image</span>
                                    </div>
                                )}
                                <p className="text-sm font-semibold">{photo.title || 'Untitled'}</p>
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}