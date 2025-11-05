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

        {/* Header - Ultra Compact for Mobile */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 p-3 sm:p-8">
          {/* Mobile: Single Row Layout */}
          <div className="flex items-center gap-2 sm:gap-6 lg:hidden">
            {ipo.logoUrl && (
              <div className="w-10 h-10 rounded-lg border border-white/20 bg-white p-0.5 overflow-hidden flex-shrink-0">
                <Image
                  src={`https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}`}
                  alt={ipo.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold text-white mb-1 truncate">{ipo.name}</h1>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold rounded uppercase">
                  {category}
                </span>
                <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold rounded uppercase">
                  {ipo.status}
                </span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 text-center border border-white/20 flex-shrink-0">
              <div className="text-[9px] text-white/80 font-medium mb-0.5">GMP</div>
              <div className={`text-base font-bold ${isPositive ? "text-green-300" : "text-red-300"}`}>
                {amountText}
              </div>
              {percentText && (
                <div className={`text-[10px] font-semibold ${isPositive ? "text-green-200" : "text-red-200"}`}>
                  {percentText}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden lg:flex items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              {ipo.logoUrl && (
                <div className="w-20 h-20 rounded-xl border-2 border-white/20 bg-white p-2 overflow-hidden flex-shrink-0">
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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 break-words">{ipo.name}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-lg uppercase">
                    {category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-lg uppercase">
                    {ipo.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <div className="text-sm text-white/80 font-medium mb-2">Current GMP</div>
              <div className={`text-4xl font-bold mb-1 ${isPositive ? "text-green-300" : "text-red-300"}`}>
                {amountText}
              </div>
              {percentText && (
                <div className={`text-lg font-semibold ${isPositive ? "text-green-200" : "text-red-200"}`}>
                  {percentText}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs - Perfectly Centered & Fixed Width */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <nav className="flex justify-center sm:justify-start px-1 sm:px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="text-[10px] sm:text-sm leading-tight">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content - Ultra Compact */}
        <div className="p-2 sm:p-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-8">
              <div>
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">IPO Details</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { label: 'Price', value: ipo.issuePrice },
                    { label: 'Lot', value: ipo.lotSize },
                    { label: 'Size', value: ipo.issueSize },
                    { label: 'Min Inv', value: ipo.minInvestment },
                    { label: 'Max Retail', value: ipo.maxRetailInvestment },
                    { label: 'Open', value: ipo.issueOpenDate },
                    { label: 'Close', value: ipo.issueCloseDate },
                    { label: 'Allotment', value: ipo.allotmentDate },
                    { label: 'Listing', value: ipo.listingDate },
                    { label: 'Expected', value: ipo.expectedListingPrice, highlight: true },
                  ].map((item, idx) =>
                    item.value && (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-4">
                        <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1 font-semibold truncate">{item.label}</div>
                        <div className={`text-xs sm:text-lg font-bold break-words ${item.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {item.value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {ipo.ipoObjectives && ipo.ipoObjectives.length > 0 && (
                <div>
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">Objectives</h3>
                  <ul className="space-y-2">
                    {ipo.ipoObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 sm:gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 sm:p-4 border-l-2 sm:border-l-4 border-indigo-500">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-base mt-0.5">•</span>
                        <span className="text-xs sm:text-base text-gray-700 dark:text-gray-300">{obj}</span>
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
                <div className="space-y-3 sm:space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-6 text-center">
                    <div className="text-xs sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                      Overall: <span className="text-indigo-600 dark:text-indigo-400">{ipo.subscription || '—'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">Category-wise</h3>

                    {/* Mobile: Card Layout (No Horizontal Scroll) */}
                    <div className="lg:hidden space-y-2">
                      {ipo.subscriptionHistory.map((sub, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{sub.category}</span>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded">
                              {sub.subscriptionTimes}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Offered: </span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300">{sub.sharesOffered}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Bid: </span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300">{sub.sharesBid}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop: Table Layout */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Category</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Times</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Offered</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Bid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipo.subscriptionHistory.map((sub, idx) => (
                            <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                              <td className="px-6 py-3 font-semibold text-gray-900 dark:text-gray-100">{sub.category}</td>
                              <td className="px-6 py-3 font-bold text-indigo-600 dark:text-indigo-400">{sub.subscriptionTimes}</td>
                              <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{sub.sharesOffered}</td>
                              <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{sub.sharesBid}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-20">
                  <div className="text-3xl sm:text-6xl mb-2 sm:mb-4 opacity-50">📊</div>
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">Not Available</h3>
                  <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">After IPO closes</p>
                </div>
              )}
            </div>
          )}

          {/* GMP HISTORY TAB */}
          {activeTab === 'gmp' && (
            <div className="space-y-4 sm:space-y-8">
              {ipo.gmpHistory && ipo.gmpHistory.length > 0 ? (
                <>
                  <GmpSparkChart history={ipo.gmpHistory} isPositive={isPositive} />



                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {[
                      {
                        label: 'High',
                        value: Math.max(...ipo.gmpHistory.map(h => parseFloat(h.gmp || '0')))
                      },
                      {
                        label: 'Low',
                        value: Math.min(...ipo.gmpHistory.map(h => parseFloat(h.gmp || '0')))
                      },
                      {
                        label: 'Avg',
                        value: ipo.gmpHistory.reduce((acc, h) => acc + parseFloat(h.gmp || '0'), 0) / ipo.gmpHistory.length
                      },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">{stat.label}</div>
                        <div className={`text-xs sm:text-2xl font-bold ${stat.value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {stat.value >= 0 ? '+' : ''}₹{Math.abs(stat.value).toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">History</h3>

                    {/* Mobile: Card Layout (No Horizontal Scroll) */}
                    <div className="lg:hidden space-y-2">
                      {ipo.gmpHistory.map((item, idx) => {
                        const gmpVal = parseFloat(item.gmp || '0');
                        return (
                          <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.date}</span>
                              <span className={`text-sm font-bold px-2 py-0.5 rounded ${gmpVal >= 0 ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30' : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30'}`}>
                                {gmpVal >= 0 ? '+' : ''}₹{Math.abs(gmpVal).toFixed(0)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              Expected: <span className="font-semibold text-gray-900 dark:text-gray-100">₹{item.expectedPrice || '—'}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Desktop: Table Layout */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Date</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">GMP</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Expected</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipo.gmpHistory.map((item, idx) => {
                            const gmpVal = parseFloat(item.gmp || '0');
                            return (
                              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{item.date}</td>
                                <td className={`px-6 py-3 font-bold ${gmpVal >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {gmpVal >= 0 ? '+' : ''}₹{Math.abs(gmpVal).toFixed(0)}
                                </td>
                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">₹{item.expectedPrice || '—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-20">
                  <div className="text-3xl sm:text-6xl mb-2 sm:mb-4 opacity-50">📈</div>
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">Not Available</h3>
                  <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">Coming soon</p>
                </div>
              )}
            </div>
          )}

          {/* ALLOTMENT TAB */}
          {activeTab === 'allotment' && (
            <div className="space-y-4 sm:space-y-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-12 text-center">
                <div className="text-3xl sm:text-6xl mb-2 sm:mb-4">🎯</div>
                <h3 className="text-sm sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">Check Allotment</h3>
                <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">Find your allotment status</p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-xl sm:text-4xl">📅</div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1 font-semibold">Allotment</div>
                    <div className="text-xs sm:text-xl font-bold text-gray-900 dark:text-gray-100 break-words">
                      {ipo.allotmentDate || "TBA"}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-xl sm:text-4xl">📋</div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1 font-semibold">Listing</div>
                    <div className="text-xs sm:text-xl font-bold text-gray-900 dark:text-gray-100 break-words">
                      {ipo.listingDate || "TBA"}
                    </div>
                  </div>
                </div>
              </div>

              {ipo.registrarName && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-3 sm:p-6 text-white">
                  <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-4">Registrar</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-base">
                    <p className="break-words"><strong>Name:</strong> {ipo.registrarName}</p>
                    {ipo.registrarPhone && <p><strong>Phone:</strong> {ipo.registrarPhone}</p>}
                    {ipo.registrarEmail && <p className="break-all"><strong>Email:</strong> {ipo.registrarEmail}</p>}
                    {ipo.registrarWebsite && (
                      <a
                        href={ipo.registrarWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 sm:mt-4 px-3 sm:px-6 py-1.5 sm:py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-xs sm:text-base"
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
            <div className="space-y-4 sm:space-y-8">
              {ipo.companyDescription && (
                <div>
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">About</h3>
                  <p className="text-xs sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{ipo.companyDescription}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">Contact</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-4">
                  {[
                    { icon: '📍', label: 'Address', value: ipo.address },
                    { icon: '📞', label: 'Phone', value: ipo.phone },
                    { icon: '✉️', label: 'Email', value: ipo.email },
                    { icon: '🌐', label: 'Website', value: ipo.website, isLink: true },
                  ].map((item, idx) =>
                    item.value && (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-6 flex items-start gap-2 sm:gap-4 border border-gray-200 dark:border-gray-700">
                        <div className="text-xl sm:text-3xl">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1 font-semibold">{item.label}</div>
                          {item.isLink ? (
                            <a
                              href={item.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs sm:text-base text-indigo-600 dark:text-indigo-400 hover:underline break-all font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-xs sm:text-base text-gray-900 dark:text-gray-100 break-words">{item.value}</div>
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

        {/* Back Button - Ultra Compact */}
        <div className="px-2 sm:px-8 pb-2 sm:pb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-xs sm:text-base">
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}