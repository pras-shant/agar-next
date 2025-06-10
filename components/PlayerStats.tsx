import React from 'react';

export const PlayerStats = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md ">
      <h2 className="text-lg font-semibold mb-2">Player Statistics</h2>
      <div className="text-center text-gray-600">
        <div className="text-9xl mb-2">↺</div>
        <p>Connect your wallet to view your player statistics...</p>
        <button className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Connect Wallet</button>
      </div>
    </div>
  );
};
