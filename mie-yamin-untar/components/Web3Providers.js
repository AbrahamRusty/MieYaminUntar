'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';
import { useEffect, useState } from 'react';

// 1. Get projectId from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// 2. Create wagmiConfig with disabled features to avoid API calls
const metadata = {
  name: 'Mie Yamin Loyalty',
  description: 'Program loyalitas Mie Yamin dengan Web3 dan NFT membership',
  url: 'https://mie-yamin-untar.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(), // Use injected connector first (MetaMask)
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
    // Disable WalletConnect to avoid API key issues in development
    // walletConnect({ projectId }), // WalletConnect as fallback
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // Enable SSR support
});

// 3. Create QueryClient
const queryClient = new QueryClient();

export function Web3ModalProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      // 4. Create modal only on client side with disabled features to avoid API calls
      createWeb3Modal({
        wagmiConfig: config,
        projectId,
        chains: [mainnet, sepolia],
        themeMode: 'light',
        themeVariables: {
          '--w3m-font-family': 'Inter, sans-serif',
          '--w3m-accent': '#007bff',
        },
        enableAnalytics: false, // Disable analytics to avoid API calls
        enableOnramp: false, // Disable onramp features
        featuredWalletIds: [], // Disable featured wallets
        includeWalletIds: [], // Only show injected wallets
        excludeWalletIds: [], // Don't exclude any wallets
        allWallets: 'HIDE', // Hide all wallets list to avoid API calls
      });
    } catch (error) {
      console.warn('Web3Modal initialization warning:', error);
      // Continue without Web3Modal if initialization fails
    }
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
