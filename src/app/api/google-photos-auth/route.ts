import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: Request) {
    // Set CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', request.headers.get('origin') === 'https://bluffranch.sanity.studio' ? 'https://bluffranch.sanity.studio' : 'http://localhost:3000');
    headers.set('Access-Control-Allow-Methods', 'GET');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
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
        return NextResponse.json({ accessToken: credentials.access_token }, { headers });
    } catch (error) {
        console.error('Error retrieving access token:', error);
        return NextResponse.json({ error: 'Failed to get access token' }, { status: 500, headers });
    }
}