import { useState, useEffect } from 'react';
import { Box, Button, Card, Checkbox, Flex, Grid, Spinner, Text } from '@sanity/ui';

interface GooglePhoto {
    id: string;
    baseUrl: string;
    filename: string;
    mimeType: string;
}

export default function GooglePhotosUploader() {
    const [photos, setPhotos] = useState<GooglePhoto[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [accessToken, setAccessToken] = useState('');

    // Use environment variable for Next.js API base URL
    const apiBaseUrl = process.env.SANITY_STUDIO_NEXT_API_BASE_URL || 'http://localhost:3000';

    // Fetch Google Photos on mount
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const tokenResponse = await fetch(`${apiBaseUrl}/api/google-photos-auth`);
                const tokenData = await tokenResponse.json();
                if (!tokenResponse.ok) throw new Error(tokenData.error || 'Failed to get access token');
                setAccessToken(tokenData.accessToken);

                const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems', {
                    headers: { Authorization: `Bearer ${tokenData.accessToken}` },
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch photos');
                setPhotos(data.mediaItems || []);
            } catch (error) {
                // @ts-ignore
                setMessage(`Error fetching photos: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPhotos();
    }, [apiBaseUrl]);

    const handleSelectPhoto = (id: string) => {
        setSelectedPhotos((prev) =>
            prev.includes(id) ? prev.filter((photoId) => photoId !== id) : [...prev, id]
        );
    };

    const handleUpload = async () => {
        setIsUploading(true);
        setMessage('');
        try {
            const selected = photos.filter((photo) => selectedPhotos.includes(photo.id));
            const response = await fetch(`${apiBaseUrl}/api/upload-photos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    photos: selected.map((photo) => ({
                        id: photo.id,
                        baseUrl: photo.baseUrl,
                        filename: photo.filename,
                        mimeType: photo.mimeType,
                    })),
                    accessToken,
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to upload photos');
            setMessage(`Successfully uploaded ${selected.length} photos!`);
            setSelectedPhotos([]);
        } catch (error) {
            // @ts-ignore
            setMessage(`Error uploading photos: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box padding={4}>
            <Text size={2} weight="bold" style={{ marginBottom: '1rem' }}>
                Google Photos Uploader
            </Text>
            {isLoading ? (
                <Flex justify="center">
                    <Spinner />
                </Flex>
            ) : (
                <>
                    {message && (
                        <Card tone={message.includes('Error') ? 'critical' : 'positive'} padding={3} marginBottom={4}>
                            <Text size={1}>{message}</Text>
                        </Card>
                    )}
                    <Button
                        text="Upload Selected Photos"
                        tone="primary"
                        disabled={isUploading || selectedPhotos.length === 0}
                        onClick={handleUpload}
                        style={{ marginBottom: '1rem' }}
                    />
                    <Grid columns={[1, 2, 3, 4]} gap={3}>
                        {photos.map((photo) => (
                            <Card key={photo.id} padding={2} shadow={1} radius={2}>
                                <Flex direction="column" gap={2}>
                                    <img
                                        src={`${photo.baseUrl}=w200-h200`}
                                        alt={photo.filename}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                    <Checkbox
                                        checked={selectedPhotos.includes(photo.id)}
                                        onChange={() => handleSelectPhoto(photo.id)}
                                    />
                                    <Text size={1} style={{ wordBreak: 'break-word' }}>
                                        {photo.filename}
                                    </Text>
                                </Flex>
                            </Card>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
}