// src/app/contact/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | IpoFly',
  description: 'Get in touch with IpoFly for IPO GMP queries, feedback, or support.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Contact Us</li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📬</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We&apos;re here to help! Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-xl border border-indigo-200 dark:border-indigo-700">
            <div className="text-4xl mb-4">📧</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Email Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Send us an email and we&apos;ll get back to you within 24-48 hours.
            </p>
            <a
              href="mailto:support@ipofly.com"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-lg"
            >
              support@ipofly.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl border border-green-200 dark:border-green-700">
            <div className="text-4xl mb-4">⏰</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Response Time</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We typically respond within:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• General queries: 24 hours</li>
              <li>• Technical issues: 48 hours</li>
              <li>• Business inquiries: 2-3 days</li>
            </ul>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">How Can We Help?</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>💡</span> General Inquiries
                </h3>
                <p>
                  Questions about IPO GMP, subscription status, or how to use our platform? Drop us an email with your query.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🐛</span> Report Issues
                </h3>
                <p>
                  Found a bug or experiencing technical difficulties? Let us know with:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Description of the issue</li>
                  <li>Device and browser you&apos;re using</li>
                  <li>Screenshots (if applicable)</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>📊</span> Data Updates
                </h3>
                <p>
                  Notice incorrect GMP data or missing IPO information? We appreciate your feedback to keep our data accurate.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>💼</span> Business & Partnerships
                </h3>
                <p>
                  Interested in advertising, partnerships, or business collaboration? Contact us at:
                </p>
                <a
                  href="mailto:support@ipofly.com"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-block mt-2"
                >
                  support@ipofly.com
                </a>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>✨</span> Feature Requests
                </h3>
                <p>
                  Have ideas for new features or improvements? We&apos;d love to hear your suggestions!
                </p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">📍 Our Location</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>IpoFly</strong><br />
              India 🇮🇳<br />
              <span className="text-sm text-gray-600 dark:text-gray-400">(Remote-first team serving investors across India)</span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Q: Is IpoFly free to use?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: Yes! IpoFly is completely free. We provide live IPO GMP data, subscription status, and allotment details at no cost.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Q: Where do you get GMP data from?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: We source GMP data from reliable grey market sources and update it regularly. However, GMP is indicative and unofficial.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Q: Can I apply for IPOs through IpoFly?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: No, IpoFly is an information platform. To apply for IPOs, you need a demat account with a broker like Zerodha, Upstox, or Groww.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Q: Do you provide investment advice?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: No, we only provide data and information. We are not SEBI-registered advisors. Please consult a financial advisor for investment decisions.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Get In Touch Today!</h2>
            <p className="mb-6">
              Whether you have a question, feedback, or just want to say hi, we&apos;re always happy to hear from you.
            </p>
            <a
              href="mailto:support@ipofly.com"
              className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Email Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}