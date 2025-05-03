import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import sharp from 'sharp';
import fetch from 'node-fetch';

export async function POST(request: NextRequest) {
    try {
        const { photos, accessToken } = await request.json();
        if (!photos || !Array.isArray(photos) || photos.length === 0) {
            return NextResponse.json({ error: 'No photos provided' }, { status: 400 });
        }

        const uploadedPhotos = [];
        for (const photo of photos) {
            const { id, baseUrl, filename, mimeType } = photo;

            // Fetch the full-resolution image
            const response = await fetch(`${baseUrl}=d`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!response.ok) throw new Error(`Failed to fetch photo ${id}`);

            const buffer = await response.buffer();
            let imageBuffer = buffer;
            let finalMimeType = mimeType;

            // Convert HEIC to JPEG if necessary
            if (mimeType === 'image/heic' || mimeType === 'image/heif') {
                imageBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
                finalMimeType = 'image/jpeg';
            }

            // Upload to Sanity
            const asset = await client.assets.upload('image', imageBuffer, {
                contentType: finalMimeType,
                filename: filename.replace(/\.[^/.]+$/, finalMimeType === 'image/jpeg' ? '.jpg' : '.png'),
            });

            // Create photo document
            const photoDoc = await client.create({
                _type: 'photo',
                title: filename,
                image: {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: asset._id },
                },
                googlePhotoUrl: baseUrl,
                uploadedAt: new Date().toISOString(),
            });

            uploadedPhotos.push(photoDoc);
        }

        return NextResponse.json({ message: `Uploaded ${uploadedPhotos.length} photos` }, { status: 201 });
    } catch (error) {
        console.error('Error uploading photos:', error);
        return NextResponse.json({ error: 'Failed to upload photos' }, { status: 500 });
    }
}