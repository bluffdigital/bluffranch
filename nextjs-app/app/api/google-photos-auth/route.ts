import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
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
        return NextResponse.json({ accessToken: credentials.access_token });
    } catch (error) {
        console.error('Error retrieving access token:', error);
        return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }
}