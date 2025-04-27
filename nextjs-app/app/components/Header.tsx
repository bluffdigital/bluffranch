import Link from 'next/link';

export default function Header() {
  return (
      <header className="bg-green-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#654321"/>
              <text x="10" y="60" text-align="center" text-decoration="underline" font-size="5em"
                    fill="#FFFFFF" font-family="Branding Iron">BR
              </text>
            </svg>
            <span className="text-xl font-bold">Bluff Ranch</span>
          </Link>

          {/* Navigation */}
          {/*<nav className="flex space-x-4">*/}
          {/*  <Link href="/" className="text-white hover:text-amber-500">Home</Link>*/}
          {/*  <Link href="/blog" className="text-white hover:text-amber-500">Blog</Link>*/}
          {/*  <Link href="/photos" className="text-white hover:text-amber-500">Photos</Link>*/}
          {/*  <Link href="/upload-photos" className="text-white hover:text-amber-500">Upload Photos</Link>*/}
          {/*  <Link href="/studio" className="text-white hover:text-amber-500">Studio</Link>*/}
          {/*</nav>*/}
        </div>
      </header>
  );
}
