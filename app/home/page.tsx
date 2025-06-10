"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  const connectWallet = () => {
    // Placeholder wallet connection logic
    setWalletConnected(true);
    alert("Wallet Connected!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-3 border rounded-md w-full"
          placeholder="Enter your name"
        />
        <button
          onClick={connectWallet}
          disabled={walletConnected}
          className={`w-full p-3 rounded-md ${
            walletConnected
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}
