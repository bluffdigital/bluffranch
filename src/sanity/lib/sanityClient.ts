import { createClient } from 'next-sanity';
import type { QueryParams } from '@sanity/client';
import type { Post, Photo, Page } from './sanityTypes';

// Define fetch options type
interface FetchOptions {
    perspective?: 'previewDrafts' | 'published' | 'raw';
    stega?: boolean;
    [key: string]: unknown; // Allow additional options with safer typing
}

// Create a typed Sanity client
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// Type-safe fetch functions
export const fetchPosts = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<Post[]> => {
    return client.fetch(query, params, options);
};

export const fetchPost = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<Post | null> => {
    return client.fetch(query, params, options);
};

export const fetchPhotos = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<Photo[]> => {
    return client.fetch(query, params, options);
};

export const fetchPhoto = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<Photo | null> => {
    return client.fetch(query, params, options);
};

export const fetchPage = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<Page | null> => {
    return client.fetch(query, params, options);
};

export const fetchPageSlugs = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<string[]> => {
    return client.fetch(query, params, options);
};

export const fetchPhotoSlugs = async (
    query: string,
    params: QueryParams = {},
    options: FetchOptions = {}
): Promise<string[]> => {
    return client.fetch(query, params, options);
};