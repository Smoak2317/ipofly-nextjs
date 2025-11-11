// src/components/AIDashboard.tsx
'use client';

import { useState, useMemo } from 'react';
import { IPO } from '@/types/ipo';
import IpoCard from './IpoCard';

interface AIDashboardProps {
  allIpos: IPO[];
}

export default function AIDashboard({ allIpos }: AIDashboardProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  // AI Analysis Statistics
  const stats = useMemo(() => {
    const analyzedIpos = allIpos.filter(ipo => ipo.aiAnalysis);
    const totalIpos = allIpos.length;

    const recommendationCounts = analyzedIpos.reduce((acc, ipo) => {
      const rec = ipo.aiAnalysis!.rating;
      acc[rec] = (acc[rec] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const riskCounts = analyzedIpos.reduce((acc, ipo) => {
      const risk = ipo.aiAnalysis!.riskLevel;
      acc[risk] = (acc[risk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgScore = analyzedIpos.reduce((sum, ipo) => sum + ipo.aiAnalysis!.score, 0) / analyzedIpos.length;

    return {
      totalIpos,
      analyzedIpos: analyzedIpos.length,
      analysisCoverage: (analyzedIpos.length / totalIpos) * 100,
      recommendationCounts,
      riskCounts,
      avgScore: Math.round(avgScore * 10) / 10
    };
  }, [allIpos]);

  // Filter IPOs based on AI criteria
  const filteredIpos = useMemo(() => {
    let filtered = allIpos;

    // AI Recommendation Filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(ipo =>
        ipo.aiAnalysis && ipo.aiAnalysis.rating === activeFilter
      );
    }

    // Risk Level Filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter(ipo =>
        ipo.aiAnalysis && ipo.aiAnalysis.riskLevel === riskFilter
      );
    }

    return filtered.sort((a, b) => {
      // Sort by AI score if available, then by status
      const aScore = a.aiAnalysis?.score || 0;
      const bScore = b.aiAnalysis?.score || 0;
      return bScore - aScore;
    });
  }, [allIpos, activeFilter, riskFilter]);

  const recommendationFilters = [
    { value: 'all', label: 'All IPOs', color: 'bg-gray-500' },
    { value: 'STRONG_APPLY', label: 'Strong Apply', color: 'bg-green-500' },
    { value: 'APPLY', label: 'Apply', color: 'bg-green-400' },
    { value: 'CONSIDER_APPLYING', label: 'Consider', color: 'bg-yellow-500' },
    { value: 'NEUTRAL', label: 'Neutral', color: 'bg-gray-400' },
    { value: 'AVOID', label: 'Avoid', color: 'bg-orange-500' },
  ];

  const riskFilters = [
    { value: 'all', label: 'All Risks' },
    { value: 'LOW', label: 'Low Risk' },
    { value: 'LOW_TO_MEDIUM', label: 'Low-Medium' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'MEDIUM_TO_HIGH', label: 'Medium-High' },
    { value: 'HIGH', label: 'High Risk' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      {/* AI Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">AI IPO Analyzer</h1>
            <p className="text-indigo-100 text-sm sm:text-base">
              Powered by advanced algorithms to help you make better IPO investment decisions
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[140px]">
            <div className="text-2xl font-bold">{stats.avgScore}</div>
            <div className="text-sm text-indigo-200">Avg AI Score</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalIpos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total IPOs</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.analyzedIpos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">AI Analyzed</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(stats.analysisCoverage)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Coverage</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.recommendationCounts['STRONG_APPLY'] || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Top Picks</div>
        </div>
      </div>

      {/* AI Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">AI Recommendation Filters</h2>

        {/* Recommendation Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recommendation</h3>
          <div className="flex flex-wrap gap-2">
            {recommendationFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === filter.value
                    ? `${filter.color} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Filters */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Risk Level</h3>
          <div className="flex flex-wrap gap-2">
            {riskFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setRiskFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  riskFilter === filter.value
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {filteredIpos.length} IPOs Found
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sorted by AI Score
          </div>
        </div>

        {filteredIpos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">No IPOs Match Your Filters</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIpos.map((ipo, index) => (
              <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}