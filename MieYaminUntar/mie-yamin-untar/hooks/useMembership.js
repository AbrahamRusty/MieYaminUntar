'use client';

import { useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import { useContract } from './useContract';
import toast from 'react-hot-toast';

export function useMembership() {
  const { account, isConnected } = useWallet();
  const { getMembershipInfo, getIDRXBalance, purchaseMembership, approveIDRX } = useContract();
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [idrxBalance, setIdrxBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && account) {
      loadMembershipData();
    }
  }, [isConnected, account]);

  const loadMembershipData = async () => {
    if (!account) return;

    setIsLoading(true);
    try {
      const [membership, balance] = await Promise.all([
        getMembershipInfo(account),
        getIDRXBalance(account)
      ]);

      setMembershipInfo(membership);
      setIdrxBalance(balance);
    } catch (error) {
      console.error('Error loading membership data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buyMembership = async (tier) => {
    if (!isConnected) {
      toast.error('Silakan hubungkan wallet terlebih dahulu');
      return false;
    }

    const tierPrices = {
      silver: 100,
      gold: 250,
      platinum: 500
    };

    const price = tierPrices[tier.toLowerCase()];
    if (!price) {
      toast.error('Tier membership tidak valid');
      return false;
    }

    // Check if user has enough IDRX
    if (parseFloat(idrxBalance) < price) {
      toast.error(`Saldo IDRX tidak cukup. Dibutuhkan ${price} IDRX, saldo Anda: ${idrxBalance} IDRX`);
      return false;
    }

    setIsLoading(true);
    try {
      // Approve IDRX spending
      const approved = await approveIDRX(price);
      if (!approved) return false;

      // Purchase membership
      const receipt = await purchaseMembership(tier);
      if (receipt) {
        toast.success(`Membership ${tier} berhasil dibeli!`);
        // Reload membership data
        await loadMembershipData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error buying membership:', error);
      toast.error('Gagal membeli membership');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeMembership = async (newTier) => {
    // Similar to buyMembership but for upgrades
    // This would require additional contract logic for upgrades
    toast.info('Fitur upgrade membership akan segera hadir');
    return false;
  };

  const getTierBenefits = (tier) => {
    const benefits = {
      silver: {
        discount: '10%',
        vouchers: 'Bulanan',
        priority: 'Early access menu',
        customMenu: false
      },
      gold: {
        discount: '15%',
        vouchers: 'Mingguan',
        priority: 'Prioritas antrian',
        customMenu: false
      },
      platinum: {
        discount: '20%',
        vouchers: 'Harian',
        priority: 'Prioritas maksimal',
        customMenu: true
      }
    };

    return benefits[tier.toLowerCase()] || null;
  };

  return {
    membershipInfo,
    idrxBalance,
    isLoading,
    loadMembershipData,
    buyMembership,
    upgradeMembership,
    getTierBenefits
  };
}
