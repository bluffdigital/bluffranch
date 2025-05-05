import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-8">
            <div className="max-w-3xl mx-auto text-center">
                <div className="flex justify-center items-center space-x-4 mb-4">
                    <a
                        href="https://github.com/bluffdigital/bluffranch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-blue-300"
                    >
                        <Image
                            src="/github-logo.svg"
                            alt="GitHub Logo"
                            width={24}
                            height={24}
                            className="invert"
                        />
                        <span>GitHub</span>
                    </a>
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-blue-300"
                    >
                        <Image
                            src="/nextjs-logo.svg"
                            alt="Next.js Logo"
                            width={24}
                            height={24}
                            className="invert"
                        />
                        <span>Next.js</span>
                    </a>
                    <a
                        href="https://www.sanity.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-blue-300"
                    >
                        <Image
                            src="/sanity-logo.svg"
                            alt="Sanity.io Logo"
                            width={24}
                            height={24}
                            className="invert"
                        />
                        <span>Sanity.io</span>
                    </a>
                    <a
                        href="https://vercel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-blue-300"
                    >
                        <Image
                            src="/vercel-logo.svg"
                            alt="Vercel Logo"
                            width={24}
                            height={24}
                            className="invert"
                        />
                        <span>Vercel</span>
                    </a>
                </div>
                <p className="text-sm mb-2">
                    This site is not affiliated with<br/>
                    Sanity.io, Next.js, Vercel, or GitHub.
                </p>
                <p className="text-sm">© 2025 Bluff Ranch. All rights reserved.</p>
            </div>
        </footer>
    );
}