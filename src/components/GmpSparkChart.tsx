'use client';

import { GmpHistory } from '@/types/ipo';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface GmpSparkChartProps {
  history: GmpHistory[];
  isPositive: boolean;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      gmp: number;
      fullDate: string;
    };
  }>;
}

export default function GmpSparkChart({ history, isPositive }: GmpSparkChartProps) {
  const chartData = history?.map((item: GmpHistory) => ({
    date: new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    gmp: parseFloat(item.gmp || '0') || 0,
    fullDate: item.date,
  })) || [];

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <div className="text-5xl mb-3">📊</div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Chart data coming soon</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const { gmp, fullDate } = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-indigo-500/30 shadow-2xl">
          <p className="text-white text-sm font-bold">{new Date(fullDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          <p className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {gmp >= 0 ? '+' : ''}₹{gmp.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">GMP Trend</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">Last {chartData.length} days movement</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGmp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="gmp"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorGmp)"
            dot={{ fill: isPositive ? '#10b981' : '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}