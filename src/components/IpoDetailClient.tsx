// ============================================
// src/components/IpoDetailClient.tsx - MOBILE OPTIMIZED
// ============================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IPO } from '@/types/ipo';
import { parseGMP, normalizeCategory } from '@/lib/api';
import GmpSparkChart from './GmpSparkChart';

interface IpoDetailClientProps {
  ipo: IPO;
}

export default function IpoDetailClient({ ipo }: IpoDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { amountText, percentText, isPositive } = parseGMP(ipo.gmp);
  const category = normalizeCategory(ipo.category);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'subscription', label: 'Subscription', icon: '📊' },
    { id: 'gmp', label: 'GMP', icon: '📈' },
    { id: 'allotment', label: 'Allotment', icon: '🎯' },
    { id: 'company', label: 'Company', icon: '🏢' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">

        {/* Header - Compact for Mobile */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-start gap-3 sm:gap-6">
              {ipo.logoUrl && (
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl border-2 border-white/20 bg-white p-1 sm:p-2 overflow-hidden flex-shrink-0">
                  <Image
                    src={`https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}`}
                    alt={ipo.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 break-words">{ipo.name}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg uppercase">
                    {category}
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg uppercase">
                    {ipo.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-6 text-center border border-white/20 self-start sm:self-auto">
              <div className="text-xs sm:text-sm text-white/80 font-medium mb-1 sm:mb-2">Current GMP</div>
              <div className={`text-2xl sm:text-4xl font-bold mb-0.5 sm:mb-1 ${isPositive ? "text-green-300" : "text-red-300"}`}>
                {amountText}
              </div>
              {percentText && (
                <div className={`text-sm sm:text-lg font-semibold ${isPositive ? "text-green-200" : "text-red-200"}`}>
                  {percentText}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs - Horizontal Scroll on Mobile */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-x-auto scrollbar-hide">
          <nav className="flex px-2 sm:px-8 min-w-max sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content - Compact Padding */}
        <div className="p-4 sm:p-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">IPO Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: 'Issue Price', value: ipo.issuePrice },
                    { label: 'Lot Size', value: ipo.lotSize },
                    { label: 'Issue Size', value: ipo.issueSize },
                    { label: 'Min Investment', value: ipo.minInvestment },
                    { label: 'Max Retail', value: ipo.maxRetailInvestment },
                    { label: 'Open Date', value: ipo.issueOpenDate },
                    { label: 'Close Date', value: ipo.issueCloseDate },
                    { label: 'Allotment', value: ipo.allotmentDate },
                    { label: 'Listing', value: ipo.listingDate },
                    { label: 'Expected Price', value: ipo.expectedListingPrice, highlight: true },
                  ].map((item, idx) =>
                    item.value && (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">{item.label}</div>
                        <div className={`text-sm sm:text-lg font-bold break-words ${item.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {item.value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {ipo.ipoObjectives && ipo.ipoObjectives.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">IPO Objectives</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {ipo.ipoObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 border-l-4 border-indigo-500">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm sm:text-base">•</span>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* SUBSCRIPTION TAB */}
          {activeTab === 'subscription' && (
            <div>
              {ipo.subscriptionHistory && ipo.subscriptionHistory.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-6 text-center">
                    <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                      Overall: <span className="text-indigo-600 dark:text-indigo-400">{ipo.subscription || '—'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Category-wise</h3>
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                      <table className="w-full min-w-[600px] sm:min-w-0">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Times</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Offered</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Bid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipo.subscriptionHistory.map((sub, idx) => (
                            <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                              <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">{sub.category}</td>
                              <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">{sub.subscriptionTimes}</td>
                              <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{sub.sharesOffered}</td>
                              <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{sub.sharesBid}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 sm:py-20">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 opacity-50">📊</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Data Not Available</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Check back after IPO closes</p>
                </div>
              )}
            </div>
          )}

          {/* GMP HISTORY TAB */}
          {activeTab === 'gmp' && (
            <div className="space-y-6 sm:space-y-8">
              {ipo.gmpHistory && ipo.gmpHistory.length > 0 ? (
                <>
                  <GmpSparkChart history={ipo.gmpHistory} isPositive={isPositive} />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      {
                        label: 'Highest',
                        value: Math.max(...ipo.gmpHistory.map(h => parseFloat(h.gmp || '0')))
                      },
                      {
                        label: 'Lowest',
                        value: Math.min(...ipo.gmpHistory.map(h => parseFloat(h.gmp || '0')))
                      },
                      {
                        label: 'Average',
                        value: ipo.gmpHistory.reduce((acc, h) => acc + parseFloat(h.gmp || '0'), 0) / ipo.gmpHistory.length
                      },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 sm:p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-semibold">{stat.label}</div>
                        <div className={`text-lg sm:text-2xl font-bold ${stat.value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {stat.value >= 0 ? '+' : ''}₹{Math.abs(stat.value).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Historical Data</h3>
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                      <table className="w-full min-w-[500px] sm:min-w-0">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">GMP</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Expected</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipo.gmpHistory.map((item, idx) => {
                            const gmpVal = parseFloat(item.gmp || '0');
                            return (
                              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{item.date}</td>
                                <td className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold ${gmpVal >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {gmpVal >= 0 ? '+' : ''}₹{Math.abs(gmpVal).toLocaleString('en-IN')}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">₹{item.expectedPrice || '—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 sm:py-20">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 opacity-50">📈</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Data Not Available</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Coming soon</p>
                </div>
              )}
            </div>
          )}

          {/* ALLOTMENT TAB */}
          {activeTab === 'allotment' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 sm:p-12 text-center">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎯</div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Check Allotment Status</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Find out if you've been allotted shares</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl sm:text-4xl">📅</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">Allotment</div>
                    <div className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 break-words">
                      {ipo.allotmentDate || "TBA"}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl sm:text-4xl">📋</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">Listing</div>
                    <div className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 break-words">
                      {ipo.listingDate || "TBA"}
                    </div>
                  </div>
                </div>
              </div>

              {ipo.registrarName && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Registrar Info</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p className="break-words"><strong>Name:</strong> {ipo.registrarName}</p>
                    {ipo.registrarPhone && <p><strong>Phone:</strong> {ipo.registrarPhone}</p>}
                    {ipo.registrarEmail && <p className="break-all"><strong>Email:</strong> {ipo.registrarEmail}</p>}
                    {ipo.registrarWebsite && (
                      <a
                        href={ipo.registrarWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
                      >
                        Check Status
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COMPANY TAB */}
          {activeTab === 'company' && (
            <div className="space-y-6 sm:space-y-8">
              {ipo.companyDescription && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">About</h3>
                  <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{ipo.companyDescription}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Contact</h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {[
                    { icon: '📍', label: 'Address', value: ipo.address },
                    { icon: '📞', label: 'Phone', value: ipo.phone },
                    { icon: '✉️', label: 'Email', value: ipo.email },
                    { icon: '🌐', label: 'Website', value: ipo.website, isLink: true },
                  ].map((item, idx) =>
                    item.value && (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-6 flex items-start gap-3 sm:gap-4 border border-gray-200 dark:border-gray-700">
                        <div className="text-xl sm:text-3xl">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">{item.label}</div>
                          {item.isLink ? (
                            <a
                              href={item.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm sm:text-base text-indigo-600 dark:text-indigo-400 hover:underline break-all font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-words">{item.value}</div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back Button - Compact */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-8">
          <Link href="/" className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}