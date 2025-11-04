// src/app/about/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'About Us | IpoFly - Live IPO GMP Tracker',
  description: 'Learn about IpoFly, India&apos;s trusted platform for tracking Live IPO GMP, subscription status, and allotment details.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">About Us</li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">About IpoFly</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            India&apos;s Most Trusted Live IPO GMP Tracker
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
            <p>
              IpoFly was created with a simple mission: to provide retail investors in India with accurate, real-time information about IPO Grey Market Premium (GMP) and help them make informed investment decisions.
            </p>
            <p>
              We believe that every investor deserves access to transparent, up-to-date IPO data without having to search through multiple sources or rely on unreliable information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Live GMP Data</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Real-time Grey Market Premium updates for all mainboard and SME IPOs
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Subscription Status</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Live subscription numbers and category-wise bidding data
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Allotment Details</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Complete information about allotment dates and registrar details
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">IPO Calendar</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Upcoming, ongoing, and closed IPO tracking with key dates
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Trust IpoFly?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Accurate Data:</strong>
                  <span className="text-gray-700 dark:text-gray-300"> We source our GMP data from reliable market sources and update it regularly.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Real-Time Updates:</strong>
                  <span className="text-gray-700 dark:text-gray-300"> Our platform provides live updates during IPO subscription periods.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">User-Friendly:</strong>
                  <span className="text-gray-700 dark:text-gray-300"> Clean, intuitive interface designed for both beginners and experienced investors.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Comprehensive Coverage:</strong>
                  <span className="text-gray-700 dark:text-gray-300"> Track both mainboard and SME IPOs in one place.</span>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">⚠️ Important Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300">
              IpoFly provides IPO information for educational and informational purposes only. The Grey Market Premium (GMP) data displayed on our platform is indicative and sourced from unofficial market sources. GMP does not guarantee listing gains or losses.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Investment Risk:</strong> All investments in IPOs carry risk. Past performance does not guarantee future results. We strongly recommend consulting with a SEBI-registered financial advisor before making any investment decisions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>Not Financial Advice:</strong> IpoFly is not a SEBI-registered investment advisor. We do not provide personalized investment advice or recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
            <p className="mb-4">
              Have questions, suggestions, or feedback? We&apos;d love to hear from you!
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <span>Email: <a href="mailto:support@ipofly.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@ipofly.com</a></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <span>Website: <a href="https://ipofly.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">https://ipofly.com</a></span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Commitment</h2>
            <p>
              At IpoFly, we are committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Providing accurate and timely IPO information</li>
              <li>Maintaining transparency in our data sources</li>
              <li>Continuously improving our platform based on user feedback</li>
              <li>Protecting user privacy and data security</li>
              <li>Educating retail investors about IPO investments</li>
            </ul>
          </section>

          <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Thank you for choosing IpoFly! 🙏
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your trusted partner in IPO investments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}