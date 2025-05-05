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