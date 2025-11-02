'use client';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900 py-12 md:py-16">
      {/* Animated background elements - subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading - compact */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
          Track IPO <span className="text-yellow-300">Grey Market Premium</span> in Real-Time
        </h1>

        {/* Subheading - concise */}
        <p className="text-base md:text-lg text-indigo-100 max-w-2xl mx-auto">
          Live GMP data, subscription status & detailed analytics for all Indian IPOs
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .animate-blob {
          animation: blob 5s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}