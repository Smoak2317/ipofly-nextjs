import Logo from './logo';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            {/* Logo - Medium size in footer */}
            <div className="mb-4">
              <Logo size="xl" showText={true} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Track live IPO GMP, grey market premium, and subscription status for all Indian IPOs.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase">IPO Categories</h4>
            <ul className="space-y-2">
              {[
                { href: "/mainboard", label: "Mainboard IPO" },
                { href: "/sme", label: "SME IPO" },
                { href: "/upcoming", label: "Upcoming IPOs" },
                { href: "/ongoing", label: "Ongoing IPOs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: "#about", label: "About IPO GMP" },
                { href: "#how-to", label: "How to Apply" },
                { href: "#allotment", label: "Check Allotment" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: "#privacy", label: "Privacy Policy" },
                { href: "#terms", label: "Terms of Service" },
                { href: "#disclaimer", label: "Disclaimer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
          <p className="text-xs text-gray-700 dark:text-gray-300">
            <strong className="text-red-600 dark:text-red-400">⚠️ Disclaimer:</strong> IPO GMP data is for informational purposes only.
            Invest at your own risk. Always consult a financial advisor.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} IpoFly - Live IPO GMP Tracker India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}