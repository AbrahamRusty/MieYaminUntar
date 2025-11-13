'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import IDRXTokenABI from '@/contracts/IDRXToken.json';
import MembershipNFTABI from '@/contracts/MembershipNFT.json';
import MieYaminLoyaltyABI from '@/contracts/MieYaminLoyaltyABI.json';
import toast from 'react-hot-toast';

export function useContract(signer) {
  const [idrxContract, setIdrxContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [loyaltyContract, setLoyaltyContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Contract addresses (these should come from environment variables)
  const CONTRACT_ADDRESSES = {
    IDRX_TOKEN: process.env.NEXT_PUBLIC_IDRX_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
    MEMBERSHIP_NFT: process.env.NEXT_PUBLIC_MEMBERSHIP_NFT_ADDRESS || '0x0000000000000000000000000000000000000000',
    LOYALTY_CONTRACT: process.env.NEXT_PUBLIC_LOYALTY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
  };

  useEffect(() => {
    if (signer) {
      initializeContracts();
    }
  }, [signer]);

  const initializeContracts = async () => {
    try {
      // Initialize IDRX Token contract
      const idrx = new ethers.Contract(
        CONTRACT_ADDRESSES.IDRX_TOKEN,
        IDRXTokenABI.abi,
        signer
      );
      setIdrxContract(idrx);

      // Initialize Membership NFT contract
      const nft = new ethers.Contract(
        CONTRACT_ADDRESSES.MEMBERSHIP_NFT,
        MembershipNFTABI.abi,
        signer
      );
      setNftContract(nft);

      // Initialize Loyalty contract
      const loyalty = new ethers.Contract(
        CONTRACT_ADDRESSES.LOYALTY_CONTRACT,
        MieYaminLoyaltyABI,
        signer
      );
      setLoyaltyContract(loyalty);

    } catch (error) {
      console.error('Error initializing contracts:', error);
      toast.error('Gagal menginisialisasi kontrak');
    }
  };

  const approveIDRX = async (amount) => {
    if (!idrxContract) {
      toast.error('Kontrak IDRX belum terinisialisasi');
      return false;
    }

    setIsLoading(true);
    try {
      const tx = await idrxContract.approve(CONTRACT_ADDRESSES.LOYALTY_CONTRACT, amount);
      await tx.wait();
      toast.success('IDRX berhasil di-approve');
      return true;
    } catch (error) {
      console.error('Error approving IDRX:', error);
      toast.error('Gagal approve IDRX');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseMembership = async (tier) => {
    if (!loyaltyContract) {
      toast.error('Kontrak loyalty belum terinisialisasi');
      return null;
    }

    const tierPrices = {
      silver: ethers.parseEther('100'),
      gold: ethers.parseEther('250'),
      platinum: ethers.parseEther('500')
    };

    const price = tierPrices[tier.toLowerCase()];
    if (!price) {
      toast.error('Tier tidak valid');
      return null;
    }

    setIsLoading(true);
    try {
      const tx = await loyaltyContract.purchaseMembership(tier, { value: price });
      const receipt = await tx.wait();
      toast.success('Membership berhasil dibeli!');
      return receipt;
    } catch (error) {
      console.error('Error purchasing membership:', error);
      toast.error('Gagal membeli membership');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipInfo = async (address) => {
    if (!nftContract) return null;

    try {
      const balance = await nftContract.balanceOf(address);
      if (balance > 0) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(address, 0);
        const tier = await nftContract.getTier(tokenId);
        return { tokenId: tokenId.toString(), tier };
      }
      return null;
    } catch (error) {
      console.error('Error getting membership info:', error);
      return null;
    }
  };

  const getIDRXBalance = async (address) => {
    if (!idrxContract) return '0';

    try {
      const balance = await idrxContract.balanceOf(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting IDRX balance:', error);
      return '0';
    }
  };

  return {
    idrxContract,
    nftContract,
    loyaltyContract,
    isLoading,
    approveIDRX,
    purchaseMembership,
    getMembershipInfo,
    getIDRXBalance
  };
}
