// src/app/privacy-policy/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | IpoFly',
  description: 'Privacy Policy for IpoFly - IPO GMP Tracker',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Privacy Policy</li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              IpoFly collects information to provide better services to our users. We collect information in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Information you provide:</strong> We may collect personal information such as your email address when you subscribe to our newsletter or contact us.</li>
              <li><strong>Automated information:</strong> We collect information about your device, including IP address, browser type, and operating system through cookies and similar technologies.</li>
              <li><strong>Usage data:</strong> We collect information about how you use our website, including pages viewed and time spent on the site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you updates about IPO GMP data and market information</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">4. Third-Party Services</h2>
            <p>We may use third-party services that collect, monitor and analyze data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense:</strong> We use Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website.</li>
              <li><strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic and usage patterns.</li>
              <li><strong>Affiliate Programs:</strong> We may participate in affiliate programs and earn commissions on referrals.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">5. Data Security</h2>
            <p>
              The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies in your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">7. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">8. Investment Disclaimer</h2>
            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
              <strong>Important:</strong> The information provided on IpoFly is for informational purposes only and should not be considered as investment advice. IPO GMP (Grey Market Premium) data is indicative and may not reflect actual listing prices. Always consult with a qualified financial advisor before making investment decisions. We are not liable for any investment losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">9. Changes to Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-2 mt-4">
              <li>📧 Email: support@ipofly.com</li>
              <li>🌐 Website: https://ipofly.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}