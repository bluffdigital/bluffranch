import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import cors from 'cors';

// Initialize CORS middleware
const corsMiddleware = cors({
    origin: ['https://bluffranch.sanity.studio', 'http://localhost:3000'],
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_PHOTOS_CLIENT_ID,
            process.env.GOOGLE_PHOTOS_CLIENT_SECRET,
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-photos-callback`
        );

        const refreshToken = process.env.GOOGLE_PHOTOS_REFRESH_TOKEN;
        if (!refreshToken) {
            throw new Error('Missing GOOGLE_PHOTOS_REFRESH_TOKEN');
        }

        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const { credentials } = await oauth2Client.refreshAccessToken();
        return NextResponse.json({ accessToken: credentials.access_token });
    } catch (error) {
        console.error('Error retrieving access token:', error);
        return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }
}