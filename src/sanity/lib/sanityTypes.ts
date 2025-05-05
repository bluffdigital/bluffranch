export interface SanityImage {
    _type: 'image';
    asset: {
        _id: string;
        url: string;
    };
    alt?: string;
}

export interface Post {
    _id: string;
    title: string;
    slug: {
        _type: 'slug';
        current: string;
    };
    date: string;
    coverImage?: SanityImage;
    content: Array<{
        _type: 'block';
        children: Array<{
            _type: 'span';
            text: string;
            marks: string[];
        }>;
    }>;
}

export interface Photo {
    _id: string;
    title: string;
    image: SanityImage;
    googlePhotoUrl: string;
    uploadedAt: string;
}

export interface PageBuilderSection {
    _key: string;
    _type: string;
    [key: string]: any; // Allow additional properties for flexibility
}

export interface Page {
    _id: string;
    _type: string;
    pageBuilder?: PageBuilderSection[];
}