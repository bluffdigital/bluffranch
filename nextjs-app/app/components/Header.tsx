import Link from 'next/link';

export default function Header() {
  return (
      <header className="bg-green-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="auto">
  <path d="M180 50c-20 0-40 10-50 30-10-20-30-30-50-30-25 0-40 15-40 40 0 20 15 30 30 30h180c15 0 30-10 30-30 0-25-15-40-40-40-20 0-40 10-50 30-10-20-30-30-50-30z" fill="#3C2F2F"/>
  <rect x="100" y="100" width="20" height="80" fill="#3C2F2F"/>
  <rect x="280" y="100" width="20" height="80" fill="#3C2F2F"/>
  <rect x="120" y="100" width="160" height="10" fill="#3C2F2F"/>
  <path d="M80 90h20l5-5 5 5h20" fill="none" stroke="#3C2F2F" stroke-width="2"/>
  <path d="M280 90h20l5-5 5 5h20" fill="none" stroke="#3C2F2F" stroke-width="2"/>
  <text x="200" y="220" font-family="'Cinzel', serif" font-size="40" fill="#3C2F2F" text-anchor="middle">Bluff Ranch</text>
</svg>
            <span className="text-xl font-bold">Bluff Ranch</span>
          </Link>

          <nav className="flex space-x-4">
            <Link href="/" className="text-white hover:text-amber-500">Home</Link>
            <Link href="/blog" className="text-white hover:text-amber-500">Blog</Link>
            <Link href="/photos" className="text-white hover:text-amber-500">Photos</Link>
            {/*<Link href="/upload-photos" className="text-white hover:text-amber-500">Upload Photos</Link>*/}
            {/*<Link href="/studio" className="text-white hover:text-amber-500">Studio</Link>*/}
          </nav>
        </div>
      </header>
  );
}
