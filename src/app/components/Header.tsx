import Link from 'next/link';

export default function Header() {
  return (
      <header className="bg-green-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                  <rect x="0" y="200" width="400" height="100" fill="#8BC34A"/>

                  <rect x="180" y="100" width="40" height="100" fill="#8D6E63"/>

                  <circle cx="200" cy="100" r="60" fill="#4CAF50"/>
                  <circle cx="170" cy="80" r="40" fill="#4CAF50"/>
                  <circle cx="230" cy="80" r="40" fill="#4CAF50"/>

                  <rect x="210" y="150" width="10" height="40" fill="#B0BEC5" transform="rotate(-30 210 150)"/>
                  <rect x="195" y="145" width="20" height="10" fill="#78909C" transform="rotate(-30 195 145)"/>

                  <ellipse cx="140" cy="220" rx="20" ry="15" fill="#FFCCBC"/>
                  <ellipse cx="155" cy="210" rx="15" ry="10" fill="#FFCCBC"/>
                  <circle cx="165" cy="205" r="5" fill="#FF5722"/>
                  <circle cx="160" cy="200" r="2" fill="#000"/>
                  <polyline points="130,230 140,245 150,230" fill="none" stroke="#FF5722" stroke-width="2"/>
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
