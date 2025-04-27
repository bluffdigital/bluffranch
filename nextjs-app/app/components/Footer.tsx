export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-green-900 text-cream-100 p-4 text-center">
        <p className="text-sm">
          © {currentYear} Bluff Ranch. All rights reserved.
        </p>
      </footer>
  );
}