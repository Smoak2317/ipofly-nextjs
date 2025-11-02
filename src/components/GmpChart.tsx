'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GmpHistory } from '@/types/ipo';

interface GmpChartProps {
  history: GmpHistory[];
}

export default function GmpChart({ history }: GmpChartProps) {
  const data = history.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    gmp: parseFloat(item.gmp || '0') || 0,
    ipoPrice: parseFloat(item.ipoPrice || '0') || 0,
  }));

  const isPositive = data.length > 0 && data[data.length - 1].gmp >= (data[0]?.gmp || 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              background: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
          />
          <Line
            type="monotone"
            dataKey="gmp"
            stroke={isPositive ? '#16a34a' : '#ef4444'}
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}