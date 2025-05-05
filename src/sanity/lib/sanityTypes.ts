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

export interface Slug {
    _type: 'slug';
    current: string;
}

export interface CallToActionBlock {
    _key: string;
    _type: 'callToAction';
    heading: string;
    text?: string;
    buttonText?: string;
    link: {
        _type: 'reference' | 'link';
        url?: string;
        reference?: {
            _ref: string;
            _type: 'reference';
        };
    };
}

export interface ContentBlock {
    _key: string;
    _type: 'content';
    content: Array<{
        _type: 'block';
        children: Array<{
            _type: 'span';
            text: string;
            marks: string[];
        }>;
    }>;
}

export type PageBuilderSection = CallToActionBlock | ContentBlock;

export interface Page {
    _id: string;
    _type: 'page';
    name: string;
    slug: Slug;
    heading: string;
    subheading: string;
    pageBuilder?: PageBuilderSection[];
}