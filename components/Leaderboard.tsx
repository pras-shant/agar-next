import React from 'react';

const data = [
  { rank: 1, player: 'acie', winnings: '85.12 SOL' },
  { rank: 2, player: 'belle', winnings: '73.45 SOL' },
  { rank: 3, player: 'cyrus', winnings: '61.78 SOL' },
  { rank: 4, player: 'diana', winnings: '50.32 SOL' },
  { rank: 5, player: 'elias', winnings: '40.21 SOL' },
  { rank: 6, player: 'fiona', winnings: '30.15 SOL' },
];

export const Leaderboard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 h-1/2">
      <div className='flex justify-between'>
        <h2 className="text-lg font-semibold mb-2">🏅 Bread Winners</h2>
        <div className="flex gap-2 mb-2">
          <button className="px-2 py-1 text-sm bg-gray-200 rounded">1D</button>
          <button className="px-2 py-1 text-sm bg-gray-300 rounded font-bold">7D</button>
          <button className="px-2 py-1 text-sm bg-gray-200 rounded">1M</button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            {/* Add horizontal padding (px-2 or px-4) to your table headers */}
            <th className="text-left px-4 py-2">Rank</th>
            <th className="text-left px-4 py-2">Player</th>
            <th className="text-right px-4 py-2">Winnings</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.rank}>
              {/* Add horizontal padding (px-2 or px-4) to your table data cells */}
              <td className="px-4 py-2">#{entry.rank}</td>
              <td className="px-4 py-2">{entry.player}</td>
              <td className="text-right px-4 py-2">{entry.winnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};