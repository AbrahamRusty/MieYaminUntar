# Payment Flow Debugging Guide

## Issue: Payment Modal Stuck After Confirming

If clicking "Konfirmasi Pembayaran" doesn't proceed and the modal gets stuck, follow these debugging steps:

### Step 1: Check Browser Console Logs
1. Open DevTools: `F12` or `Cmd+Option+I` (macOS)
2. Go to the **Console** tab
3. Look for logs starting with `[PaymentModal]` or `[useContract]`
4. These logs will show where the payment flow is getting stuck

### Common Issues & Solutions

#### Issue: `[PaymentModal.wallet] purchaseMembership returned: null`
**Cause**: Contract is not initialized or there's an error in the contract call.

**Solution**:
1. Check that wallet is connected and signer is available
2. Verify environment variables in `mie-yamin-untar/.env.local`:
   ```
   NEXT_PUBLIC_LOYALTY_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_IDRX_TOKEN_ADDRESS=0x...
   NEXT_PUBLIC_MEMBERSHIP_NFT_ADDRESS=0x...
   ```
3. Check contract ABI files exist:
   - `mie-yamin-untar/contracts/MieYaminLoyaltyABI.json`
   - `mie-yamin-untar/contracts/IDRXToken.json`
   - `mie-yamin-untar/contracts/MembershipNFT.json`

#### Issue: `[useContract] Error: Kontrak loyalty belum terinisialisasi`
**Cause**: Signer is not properly initialized or contract ABI failed to load.

**Solution**:
1. Ensure wallet is properly connected
2. Check that signer is passed to `useContract(signer)` hook
3. Verify contract ABI JSON files have correct syntax (valid JSON)

#### Issue: Network/RPC Error
**Cause**: The RPC endpoint is unreachable or incorrect.

**Solution**:
1. Check `NEXT_PUBLIC_RPC_URL` in environment
2. Test the RPC endpoint manually:
   ```bash
   curl -X POST https://your-rpc-endpoint \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
   ```

#### Issue: Insufficient Gas / Balance
**Cause**: The wallet doesn't have enough ETH for transaction.

**Solution**:
1. Check browser console for transaction revert errors
2. Ensure wallet has enough ETH for:
   - Transaction value (membership price in IDRX/tier tokens)
   - Gas fees

### Step 2: Check Backend Logs
If PaymentModal shows success but backend doesn't receive the record:

1. Check backend logs (where you ran `npm run dev` in backend folder)
2. Look for requests to `/api/loyalty/purchase`
3. Verify `BACKEND_URL` is correctly set in frontend `.env.local`

### Step 3: Manual Testing

#### Test Wallet Connection
```javascript
// Open browser console (F12) and paste:
const { ethers } = require('ethers');
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const address = await signer.getAddress();
console.log('Connected address:', address);
```

#### Test Contract Call
```javascript
// After ensuring signer is ready, test contract call:
const abi = [...]; // paste ABI from your contract JSON
const contract = new ethers.Contract(contractAddress, abi, signer);
const tx = await contract.purchaseMembership('silver', { value: ethers.parseEther('100') });
console.log('Tx hash:', tx.hash);
```

### Step 4: Enable Verbose Logging
Edit the payment modal file and uncomment detailed logs to trace execution:

```javascript
// In PaymentModal.js, logs are already added with [PaymentModal] prefix
// Just watch the console output carefully during payment flow
```

### Common Log Patterns

#### Successful Flow
```
[PaymentModal.wallet] Starting payment: tier=silver, price=100
[PaymentModal.wallet] Calling purchaseMembership()...
[useContract.purchaseMembership] Sending tx for tier=silver, price=1e+20
[useContract.purchaseMembership] Tx sent: 0x...
[useContract.purchaseMembership] Tx confirmed ...
[PaymentModal.wallet] purchaseMembership returned: ...
[PaymentModal.wallet] Got txHash: 0x...
[PaymentModal.wallet] Recording purchase on backend...
[PaymentModal.wallet] Purchase recorded
[PaymentModal.wallet] Moving to step 4 (complete)
```

#### Failed Flow (Contract Error)
```
[PaymentModal.wallet] Starting payment: tier=silver, price=100
[PaymentModal.wallet] Calling purchaseMembership()...
[useContract.purchaseMembership] Sending tx for tier=silver, price=1e+20
[useContract] Error: revert reason or error message
[PaymentModal.wallet] Error: Transaksi gagal...
```

### Need More Help?

1. Check browser DevTools Network tab to see actual API requests/responses
2. Verify that `web3.sendEtherPayment()` is working for cart payments
3. Test with a simpler flow first (e.g., try QRIS payment) to isolate the issue
4. Check that all smart contract addresses are correct and deployed on the network

---

**Last Updated**: Nov 24, 2025
**Files Modified for Better Debugging**:
- `components/UI/PaymentModal.js` - Added detailed console logs
- `components/UI/CartModal.js` - Added detailed console logs for crypto payment
- `hooks/useContract.js` - Added detailed console logs in purchaseMembership
