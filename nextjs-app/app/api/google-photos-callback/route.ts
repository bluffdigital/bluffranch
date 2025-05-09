import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import cors from 'cors';

// Initialize CORS middleware
const corsMiddleware = cors({
    origin: ['https://bluffranch.sanity.studio', 'http://localhost:3000'],
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
});

// Helper to run middleware
const runMiddleware = (req: Request, middleware: (req: any, res: any, next: (err?: any) => void) => void) =>
    new Promise((resolve, reject) => {
        middleware(req, { setHeader: (name: string, value: string) => req.headers.set(name, value), end: () => {} }, (err?: any) => {
            if (err) reject(err);
            resolve(req);
        });
    });

export async function GET(request: Request) {
    try {
        // Run CORS middleware
        await runMiddleware(request, corsMiddleware);

        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        if (!code) {
            return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_PHOTOS_CLIENT_ID,
            process.env.GOOGLE_PHOTOS_CLIENT_SECRET,
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-photos-callback`
        );

        const { tokens } = await oauth2Client.getToken(code);
        if (!tokens.refresh_token) {
            throw new Error('No refresh token received');
        }

        // Log refresh_token for manual addition to .env.local
        console.log('Add to .env.local:', `GOOGLE_PHOTOS_REFRESH_TOKEN=${tokens.refresh_token}`);
        return NextResponse.json({ message: 'Refresh token received. Add to .env.local and restart.' });
    } catch (error) {
        console.error('Error in OAuth callback:', error);
        return NextResponse.json({ error: 'Failed to process OAuth callback' }, { status: 500 });
    }
}