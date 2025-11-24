import { ethers } from 'ethers';

const DEFAULT_PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_ADDRESS || '0x0000000000000000000000000000000000000000';

export async function sendEtherPayment(signer, to = DEFAULT_PAYMENT_ADDRESS, amountEth) {
  if (!signer) throw new Error('No signer available');
  if (!amountEth) throw new Error('Amount is required');

  const value = ethers.parseEther(String(amountEth));
  const tx = await signer.sendTransaction({ to, value });
  const receipt = await tx.wait();
  return receipt;
}

export async function sendERC20Transfer(signer, tokenAddress, to, amount, abi) {
  if (!signer) throw new Error('No signer available');
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  const tx = await contract.transfer(to, amount);
  const receipt = await tx.wait();
  return receipt;
}

export default { sendEtherPayment, sendERC20Transfer };
