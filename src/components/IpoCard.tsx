import Link from "next/link";
import Image from "next/image";
import { IPO } from "@/types/ipo";
import { slugify, parseGMP, normalizeCategory, normalizeStatus } from "@/lib/api";

interface IpoCardProps {
  ipo: IPO;
  priority?: boolean;
}

export default function IpoCard({ ipo, priority = false }: IpoCardProps) {
  const slug = slugify(ipo.name);
  const { amountText, percentText, isPositive } = parseGMP(ipo.gmp);
  const category = normalizeCategory(ipo.category);
  const status = normalizeStatus(ipo.status);

  const getStatusBadgeClass = (status: string) => {
    const baseClass = "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full uppercase";
    const statusColors: Record<string, string> = {
      ongoing: `${baseClass} bg-gradient-to-r from-green-50 to-green-100 text-green-800 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-300 border border-green-200 dark:border-green-700`,
      upcoming: `${baseClass} bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700`,
      closed: `${baseClass} bg-gradient-to-r from-red-50 to-red-100 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-300 border border-red-200 dark:border-red-700`,
      listed: `${baseClass} bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 dark:from-purple-900/30 dark:to-purple-800/30 dark:text-purple-300 border border-purple-200 dark:border-purple-700`,
      allotted: `${baseClass} bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 dark:from-orange-900/30 dark:to-orange-800/30 dark:text-orange-300 border border-orange-200 dark:border-orange-700`,
    };
    return statusColors[status] || `${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`;
  };

  return (
    <Link href={`/ipo/${slug}`}>
      <article className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
        <div className="flex justify-between items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            {ipo.logoUrl && (
              <div className="mb-3">
                <div className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 bg-white overflow-hidden">
                  <Image
                    src={`https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}`}
                    alt={`${ipo.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                    priority={priority}
                  />
                </div>
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
              {ipo.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md uppercase">
                {category}
              </span>
              <span className={getStatusBadgeClass(status)}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-slow" />
                {status}
              </span>
            </div>
          </div>

          <div className={`flex-shrink-0 px-3 py-2 rounded-xl text-right ${
            isPositive
              ? "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700"
              : "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border border-red-200 dark:border-red-700"
          }`}>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">GMP</div>
            <div className={`text-base font-bold ${isPositive ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
              {amountText}
            </div>
            {percentText && (
              <div className={`text-xs font-semibold ${isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                {percentText}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-t border-gray-100 dark:border-gray-700">
          {[
            { label: "Issue Price", value: ipo.issuePrice },
            { label: "Lot Size", value: ipo.lotSize },
            { label: "Open Date", value: ipo.issueOpenDate },
            { label: "Close Date", value: ipo.issueCloseDate },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Subscription</div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {ipo.subscription || "—"}
            </div>
          </div>
          <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 flex items-center gap-1">
            View Details
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}