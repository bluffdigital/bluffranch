import { createClient } from 'next-sanity';
import type { QueryParams } from '@sanity/client';
import type { Post, Photo } from './sanityTypes';

// Create a typed Sanity client
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// Type-safe fetch functions
export const fetchPosts = async (query: string, params: QueryParams = {}): Promise<Post[]> => {
    return client.fetch(query, params);
};

export const fetchPost = async (query: string, params: QueryParams = {}): Promise<Post | null> => {
    return client.fetch(query, params);
};

export const fetchPhotos = async (query: string, params: QueryParams = {}): Promise<Photo[]> => {
    return client.fetch(query, params);
};

export const fetchPhoto = async (query: string, params: QueryParams = {}): Promise<Photo | null> => {
    return client.fetch(query, params);
};