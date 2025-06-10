
 "use client";

import React from 'react';
import { Leaderboard } from '@/components/Leaderboard';
import { PlayerStats } from '@/components/PlayerStats';
import { ChatBox } from '@/components/ChatBox';
import { WalletConnect } from '@/components/WalletConnect';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-2 p-4 px-30 bg-gray-100 min-h-screen font-sans">
      <div className="col-span-1">
        <Leaderboard />
        <PlayerStats />
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center">
        <WalletConnect />
      </div>

      <div className="col-span-1">
        <ChatBox />
      </div>
    </main>
  );
}
