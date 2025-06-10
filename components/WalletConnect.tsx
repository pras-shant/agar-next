import Image from 'next/image';
import React from 'react';
import { ConnectButton } from "@/components/ConnectButton";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useState } from "react";

import type { Provider } from "@reown/appkit-adapter-solana";

export const WalletConnect = () => {
      const [name, setName] = useState<string>("");
      const [nonce, setNonce] = useState<string | null>(null);
      const [signature, setSignature] = useState<string | null>(null);
      const [verificationResult, setVerificationResult] = useState<string | null>(null);
    
      const { address, caipAddress, isConnected, embeddedWalletInfo } = useAppKitAccount();
        const { walletProvider } = useAppKitProvider<Provider>("solana");
    
    
      console.log(address, 'address', caipAddress, isConnected, embeddedWalletInfo);
    const fetchNonce = async (): Promise<void> => {
      try {
        // Step 1: Call createNonce API
        const createNonceResponse = await fetch(`http://localhost:3000/api/users/generate-nonce`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_address: address }),
        });
        if (!createNonceResponse.ok) throw new Error("Failed to create nonce");

          const data = await createNonceResponse.json();
        setNonce( data.nonce);
        console.log("Fetched nonce:", data.nonce);
      } catch (error) {
        console.error("Error in nonce workflow:", error);
      }
    };
    
    
    const handleSignMessage = async (): Promise<void> => {
      if (!nonce) {
        console.error("Nonce is required to sign the message.");
        return;
      }
    
      try {
    
        if (!walletProvider || !address) {
          throw new Error("Wallet provider or address is not available.");
        }
    
        // Encode the message to be signed
        const message = `Hello Reown AppKit! Nonce: ${nonce}`;
        const encodedMessage = new TextEncoder().encode(message);
    
        console.log("Signing message:", message);
    
        // Sign the message using the wallet provider
        const signedMessage = await walletProvider.signMessage(encodedMessage);
        console.log(signedMessage,'signed message')
        if (!signedMessage) {
          throw new Error("Message signing failed");
        }
        const hexSignature = Array.from(new Uint8Array(signedMessage))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    console.log("Signed message (Hex):", hexSignature);
        // Set the signature state
        setSignature(hexSignature);
        console.log("Signed message:", signedMessage);
      } catch (error) {
        console.error("Error signing message:", error);
      }
    };
    
    
    
    //   function SignMessage() {
    //   // 0. Get account and provider
    //   const { address } = useAppKitAccount();
    //   const { walletProvider } = useAppKitProvider<Provider>("solana");
    
    //   // 1. Create a function to sign a message
    //   async function onSignMessage() {
    //     try {
    //       if (!walletProvider || !address) {
    //         throw Error("user is disconnected");
    //       }
    
    //       // 2. Encode message and sign it
    //       const encodedMessage = new TextEncoder().encode("Hello from AppKit");
    //       const signature = await walletProvider.signMessage(encodedMessage);
    
    //       console.log(signature);
    //     } catch (err) {
    //       // Handle Error Here
    //     }
    //   }
    
    //   // 3. Create a button to trigger the function
    //   return <button onClick={onSignMessage}>Sign Message</button>;
    // }
      const verifySignature = async (): Promise<void> => {
        if (!nonce || !signature || !address) {
          console.error("Nonce, signature, and address are required for verification.");
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:3000/api/users/verify-signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: `Hello Reown AppKit! Nonce: ${nonce}`,
              signature,
              expectedAddress: address,
              nonce,
            }),
          });
    
          if (!response.ok) throw new Error("Signature verification failed");
    
          const data = await response.json();
          setVerificationResult(data.recoveredAddress ? "Signature verified successfully!" : "Verification failed");
          console.log("Verification result:", data);
        } catch (error) {
          console.error("Error verifying signature:", error);
        }
      };
  return (
    <div className="bg-white p-4 h-full rounded-lg shadow-md w-full max-w-md text-center">
      {/* <div className=" flex flex-col mb-2">
        <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto"></div>

        <div className="font-bold mt-2">Guest</div>
        <div className="text-sm text-gray-500">Rank</div>
      </div> */}
    <div >
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
 
         <ConnectButton />
 
         {isConnected && (
           <div className="mt-4 space-y-2">
             <button
               onClick={fetchNonce}
               className="bg-blue-500 text-white py-2 px-4 rounded-md"
             >
               Fetch Nonce
             </button>
             <button
               onClick={handleSignMessage}
               disabled={!nonce}
               className="bg-green-500 text-white py-2 px-4 rounded-md"
             >
               Sign Message
             </button>
             <button
               onClick={verifySignature}
               disabled={!nonce || !signature}
               className="bg-purple-500 text-white py-2 px-4 rounded-md"
             >
               Verify Signature
             </button>
           </div>
         )}
 
         {verificationResult && (
           <p className="mt-4 text-green-600 text-sm">{verificationResult}</p>
         )}
       </div>
     </div>
        </div>
    // </div>
  );
};

