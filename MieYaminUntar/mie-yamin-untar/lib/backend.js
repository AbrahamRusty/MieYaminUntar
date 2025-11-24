// Frontend -> Backend API helper
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function postJson(path, body, opts = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: opts.credentials || 'include',
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Network error');
  }
  return res.json();
}

export async function requestOTP(email) {
  return postJson('/api/auth/otp/request', { email });
}

export async function verifyOTP(email, otp) {
  return postJson('/api/auth/otp/verify', { email, otp });
}

export async function walletLogin(address, signature, nonce) {
  return postJson('/api/auth/wallet-login', { address, signature, nonce });
}

export async function getWalletNonce(address) {
  const res = await fetch(`${BACKEND_URL}/api/auth/wallet-nonce?address=${encodeURIComponent(address)}`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed getting nonce');
  }
  return res.json();
}

export async function uploadProof(file) {
  // expects backend at /api/loyalty/upload-proof accepting multipart/form-data
  const form = new FormData();
  form.append('proof', file);

  const res = await fetch(`${BACKEND_URL}/api/loyalty/upload-proof`, {
    method: 'POST',
    body: form,
    credentials: 'include'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Upload failed');
  }
  return res.json();
}

export async function createPurchaseRecord(payload) {
  return postJson('/api/loyalty/purchase', payload);
}

export default {
  requestOTP,
  verifyOTP,
  walletLogin,
  getWalletNonce,
  uploadProof,
  createPurchaseRecord
};
