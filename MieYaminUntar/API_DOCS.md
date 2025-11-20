# Mie Yamin Loyalty API Documentation

## Base URL
```
http://localhost:5000 (development)
https://api.mieyamin.com (production)
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### Request OTP
**POST** `/auth/otp/request`

Request a 6-digit OTP code via email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "OTP dikirim ke email Anda"
}
```

**Rate Limit:** 1 request per minute per email

### Verify OTP
**POST** `/auth/otp/verify`

Verify OTP code and create/login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": null,
    "membershipTier": "none"
  }
}
```

### Google OAuth
**GET** `/auth/google`

Initiate Google OAuth login flow.

**Response:** Redirects to Google OAuth

### Google OAuth Callback
**GET** `/auth/google/callback`

Handle Google OAuth callback.

**Response:** Redirects to frontend with token

### Wallet Login
**POST** `/auth/wallet-login`

Login using Web3 wallet signature.

**Request Body:**
```json
{
  "address": "0x1234...",
  "signature": "0x5678...",
  "nonce": "random_nonce_string"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "walletAddress": "0x1234...",
    "name": "Wallet 0x1234...5678",
    "membershipTier": "none"
  }
}
```

---

## Loyalty Endpoints

### Get Membership Packages
**GET** `/loyalty/packages`

Get available membership tiers and pricing.

**Response (200):**
```json
{
  "silver": {
    "price": 100,
    "benefits": ["Diskon 20%", "Voucher mingguan", "Request menu"]
  },
  "gold": {
    "price": 250,
    "benefits": ["Diskon 20%", "Voucher mingguan", "Request menu", "Prioritas"]
  },
  "platinum": {
    "price": 500,
    "benefits": ["Diskon 20%", "Voucher mingguan", "Request menu", "Custom menu", "Prioritas"]
  }
}
```

### Create Order
**POST** `/loyalty/create-order`

Create a new membership purchase order.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "tier": "silver"
}
```

**Response (200):**
```json
{
  "orderId": "order_id",
  "amount": 100
}
```

### Verify Payment
**POST** `/loyalty/verify-payment`

Verify blockchain payment and mint NFT.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "orderId": "order_id",
  "txHash": "0x1234..."
}
```

**Response (200):**
```json
{
  "success": true,
  "tokenId": 1,
  "tier": "silver",
  "message": "Membership berhasil dibeli!"
}
```

### Upgrade Membership
**POST** `/loyalty/upgrade`

Upgrade existing membership to higher tier.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "newTier": "gold"
}
```

**Response (200):**
```json
{
  "message": "Upgrade berhasil!"
}
```

### Get Dashboard Data
**GET** `/loyalty/dashboard`

Get user dashboard information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "user": {
    "email": "user@example.com",
    "name": "User Name",
    "membershipTier": "silver",
    "membershipTokenId": 1
  },
  "transactions": [
    {
      "txHash": "0x1234...",
      "type": "purchase",
      "amount": 100,
      "token": "IDRX",
      "tier": "silver",
      "status": "confirmed",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "orders": [
    {
      "tier": "silver",
      "amount": 100,
      "status": "confirmed",
      "txHash": "0x1234...",
      "tokenId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "rewards": []
}
```

---

## Error Responses

All endpoints may return the following error formats:

**400 Bad Request:**
```json
{
  "error": "Email diperlukan"
}
```

**401 Unauthorized:**
```json
{
  "error": "Token diperlukan"
}
```

**429 Too Many Requests:**
```json
{
  "error": "Terlalu banyak permintaan. Coba lagi nanti."
}
```

**500 Internal Server Error:**
```json
{
  "error": "Gagal mengirim OTP"
}
```

---

## Rate Limiting

- OTP requests: 1 per minute per email
- General API: 100 requests per 15 minutes per IP
- Authentication attempts: 5 per hour per IP

---

## Data Models

### User
```javascript
{
  email: String (required, unique),
  googleId: String,
  walletAddress: String (lowercase),
  name: String,
  avatar: String,
  isEmailVerified: Boolean (default: false),
  membershipTier: String (enum: ['none', 'silver', 'gold', 'platinum']),
  membershipTokenId: Number,
  createdAt: Date,
  lastLogin: Date
}
```

### Order
```javascript
{
  userId: ObjectId (ref: User),
  tier: String (enum: ['silver', 'gold', 'platinum']),
  amount: Number,
  status: String (enum: ['pending', 'confirmed', 'failed']),
  txHash: String,
  tokenId: Number,
  createdAt: Date,
  confirmedAt: Date
}
```

### Transaction
```javascript
{
  userId: ObjectId (ref: User),
  txHash: String (unique),
  type: String (enum: ['purchase', 'upgrade', 'reward']),
  amount: Number,
  token: String (enum: ['IDRX', 'points']),
  tier: String (enum: ['silver', 'gold', 'platinum']),
  status: String (enum: ['pending', 'confirmed', 'failed']),
  blockNumber: Number,
  gasUsed: String,
  createdAt: Date
}
```

---

## WebSocket Events (Future)

Real-time updates for:
- Payment confirmations
- NFT minting status
- Reward notifications
