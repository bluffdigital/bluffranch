import { definePlugin } from 'sanity';
import { ImagesIcon } from '@sanity/icons';
import GooglePhotosUploader from './GooglePhotosUploader';

export const googlePhotosUploader = definePlugin(() => ({
    name: 'google-photos-uploader',
    tools: [
        {
            name: 'google-photos-uploader',
            title: 'Google Photos Uploader',
            component: GooglePhotosUploader,
            icon: ImagesIcon,
        },
    ],
}));