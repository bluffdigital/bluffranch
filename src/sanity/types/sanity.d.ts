import { ImageOptions } from '@app/sanity/types';

declare module '@sanity/types' {
    interface ImageOptions {
        aiAssist?: {
            imageDescriptionField?: string;
        };
    }
}