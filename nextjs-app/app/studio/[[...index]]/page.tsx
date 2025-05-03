'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../studio/sanity.config'

export default function StudioPage() {
    // @ts-ignore
    return <NextStudio config={config} />;
}