'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IPO } from '@/types/ipo';
import { parseGMP, normalizeCategory } from '@/lib/api';

interface DetailModalProps {
  ipo: IPO;
  onClose: () => void;
}

export default function DetailModal({ ipo, onClose }: DetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { amountText, percentText, isPositive } = parseGMP(ipo.gmp);
  const category = normalizeCategory(ipo.category);

  const tabs = ['overview', 'subscription', 'allotment', 'company'];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-start gap-6 mb-6">
            {ipo.logoUrl && (
              <div className="w-20 h-20 rounded-lg border-2 border-white/20 bg-white p-2 overflow-hidden flex-shrink-0">
                <Image
                  src={`https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}`}
                  alt={ipo.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{ipo.name}</h1>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-semibold uppercase">
                  {category}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-semibold uppercase">
                  {ipo.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-sm text-white/80 mb-2">Current GMP</div>
            <div className={`text-4xl font-bold mb-1 ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
              {amountText}
            </div>
            {percentText && (
              <div className={`text-lg font-semibold ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                {percentText}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <nav className="flex overflow-x-auto px-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">IPO Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Issue Price', value: ipo.issuePrice },
                    { label: 'Lot Size', value: ipo.lotSize },
                    { label: 'Issue Size', value: ipo.issueSize },
                    { label: 'Min Investment', value: ipo.minInvestment },
                    { label: 'Open Date', value: ipo.issueOpenDate },
                    { label: 'Close Date', value: ipo.issueCloseDate },
                    { label: 'Allotment Date', value: ipo.allotmentDate },
                    { label: 'Listing Date', value: ipo.listingDate },
                    { label: 'Expected Price', value: ipo.expectedListingPrice, highlight: true },
                  ].map((item, idx) =>
                    item.value && (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.label}</div>
                        <div className={`text-lg font-bold ${item.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {item.value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {ipo.ipoObjectives && ipo.ipoObjectives.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">IPO Objectives</h3>
                  <ul className="space-y-3">
                    {ipo.ipoObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-50">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Subscription Data Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-400">Check back after IPO opens</p>
            </div>
          )}

          {activeTab === 'allotment' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Check Your Allotment Status</h3>
                <p className="text-gray-600 dark:text-gray-400">Find out if you've been allotted shares</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 flex items-center gap-4">
                  <div className="text-4xl">📅</div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Allotment Date</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {ipo.allotmentDate || "To be announced"}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 flex items-center gap-4">
                  <div className="text-4xl">📋</div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Listing Date</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {ipo.listingDate || "To be announced"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-8">
              {ipo.companyDescription && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About Company</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{ipo.companyDescription}</p>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: '📍', label: 'Address', value: ipo.address },
                    { icon: '📞', label: 'Phone', value: ipo.phone },
                    { icon: '✉️', label: 'Email', value: ipo.email },
                    { icon: '🌐', label: 'Website', value: ipo.website, isLink: true },
                  ].map((item, idx) =>
                    item.value && (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 flex items-start gap-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.label}</div>
                          {item.isLink ? (
                            <a
                              href={item.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline break-all"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-gray-900 dark:text-gray-100 break-words">{item.value}</div>
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
      </div>
    </div>
  );
}