export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Real-time IPO GMP
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-slide-up">
          Track IPO Grey Market Premium
          <span className="block text-yellow-300">in Real-Time</span>
        </h1>

        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Monitor upcoming and ongoing IPOs with live GMP data, subscription status,
          and detailed analytics. Make informed investment decisions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">Real-Time</div>
            <div className="text-white/80 text-sm">Live Updates</div>
          </div>
          <div className="h-12 w-px bg-white/30 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">Accurate</div>
            <div className="text-white/80 text-sm">GMP Data</div>
          </div>
          <div className="h-12 w-px bg-white/30 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">Free</div>
            <div className="text-white/80 text-sm">Always</div>
          </div>
        </div>
      </div>
    </section>
  );
}