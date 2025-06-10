import React from 'react';

const messages = [
  { name: 'Sirni', message: "Let's do this! I'm unstoppable!", time: '3m', avatar: 'https://via.placeholder.com/30' },
  { name: 'Beanie', message: "I'm dominating this arena! 😍", time: '3m', avatar: 'https://via.placeholder.com/30' },
  { name: 'Jamie', message: "I'm on a rampage!\nGet ready to be crushed!", time: '2m', avatar: 'https://via.placeholder.com/30' },
  { name: 'Ryuk', message: "easy win, no challenge here!", time: '2m', avatar: 'https://via.placeholder.com/30' },
  { name: 'Sirni', message: "Let's do this! I'm unstoppable!", time: '2m', avatar: 'https://via.placeholder.com/30' },
  { name: 'Beanie', message: "I'm dominating this arena! 😍", time: '30s', avatar: 'https://via.placeholder.com/30' },
  { name: 'Jamie', message: "I'm on a rampage!\nGet ready to be crushed!", time: '15s', avatar: 'https://via.placeholder.com/30' },
  { name: 'Ryuk', message: "easy win, no challenge here!", time: '10s', avatar: 'https://via.placeholder.com/30' },
  { name: 'Ryuk', message: "haha gg ez", time: 'Now', avatar: 'https://via.placeholder.com/30' },
];

export const ChatBox = () => {
  return (
    <div className=" h-full bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col font-mono text-xs">

      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-800">Global Chat</h2>
        <button className="text-gray-500 hover:text-gray-700 font-bold">Close</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 relative">
       

        <div className='flex flex-col gap-3'>
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start mb-2">
              <img src={msg.avatar} alt="avatar" className="w-7 h-7 rounded-full mr-2 bg-gray-300" />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-gray-800">{msg.name}</span>
                  <span className="text-[0.65rem] text-gray-400 leading-none">{msg.time}</span>
                </div>
                <p className="text-gray-700 leading-tight whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-300 rounded-full my-4 mr-2">
          <div className="h-1/3 bg-gray-500 rounded-full cursor-pointer">
          </div>
        </div> */}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 bg-indigo-500 text-white rounded-md font-semibold text-sm hover:bg-indigo-600 transition-colors">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};