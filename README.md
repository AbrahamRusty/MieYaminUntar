# Mie Yamin Loyalty System

Sistem loyalitas lengkap untuk UMKM Mie Yamin dengan integrasi blockchain untuk pembelian membership menggunakan token IDRX dan penerimaan NFT sebagai bukti kepemilikan.

## 🏗️ Arsitektur

### Frontend (Next.js + Bootstrap 5)
- **Framework**: Next.js 13 (App Router)
- **Styling**: Bootstrap 5 dengan SCSS modular
- **Web3**: Ethers.js, WalletConnect, MetaMask
- **State Management**: React Query/SWR
- **UI Components**: Bootstrap modals, cards, tabs

### Backend (Node.js + Express)
- **Runtime**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT, Google OAuth, Web3 wallet signature
- **Email**: SendGrid/nodemailer untuk OTP
- **Rate Limiting**: Express rate limit

### Smart Contracts (Solidity + Hardhat)
- **ERC-20**: IDRX Token untuk pembayaran
- **ERC-721**: Membership NFT dengan tier system
- **Testing**: Hardhat + Chai
- **Deployment**: Sepolia testnet

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Infura/Alchemy account untuk RPC
- SendGrid account untuk email
- MetaMask wallet

### 1. Clone & Install
```bash
git clone <repository>
cd mie-yamin-loyalty

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../mie-yamin-untar
npm install

# Install smart contract dependencies
cd ..
npm install
```

### 2. Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Frontend
cp mie-yamin-untar/.env.local.example mie-yamin-untar/.env.local
# Edit mie-yamin-untar/.env.local with your values
```

### 3. Deploy Smart Contracts
```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Copy contract addresses to .env files
```

### 4. Start Services
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd mie-yamin-untar
npm run dev

# Terminal 3: Smart Contracts (optional for local testing)
npx hardhat node
```

## 📁 Project Structure

```
/mie-yamin-loyalty
├── contracts/              # Smart contracts
│   ├── IDRXToken.sol
│   └── MembershipNFT.sol
├── scripts/                # Deployment scripts
├── test/                   # Contract tests
├── backend/                # Express API server
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Email, auth helpers
│   └── server.js
└── mie-yamin-untar/        # Next.js frontend
    ├── app/               # Next.js app router
    ├── components/        # React components
    ├── hooks/             # Custom hooks
    └── styles/            # Bootstrap SCSS
```

## 🔧 Configuration

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
SENDGRID_API_KEY=SG...
RPC_URL=https://sepolia.infura.io/v3/...
PRIVATE_KEY=0x...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/...
NEXT_PUBLIC_IDRX_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

## 🧪 Testing

### Smart Contracts
```bash
npx hardhat test
```

### Backend
```bash
cd backend
npm test
```

## 🚢 Deployment

### Smart Contracts
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Backend
```bash
cd backend
npm run build
# Deploy to your server/Vercel/etc
```

### Frontend
```bash
cd mie-yamin-untar
npm run build
npm start
# Or deploy to Vercel/Netlify
```

## 📚 API Documentation

### Authentication
- `POST /auth/otp/request` - Request OTP
- `POST /auth/otp/verify` - Verify OTP
- `GET /auth/google` - Google OAuth
- `POST /auth/wallet-login` - Web3 wallet login

### Loyalty
- `GET /loyalty/packages` - Get membership tiers
- `POST /loyalty/create-order` - Create purchase order
- `POST /loyalty/verify-payment` - Verify blockchain payment
- `GET /loyalty/dashboard` - User dashboard data

## 🔐 Security Features

- JWT authentication dengan expiration
- Rate limiting untuk OTP requests
- Input validation dan sanitization
- CORS protection
- Helmet untuk security headers
- bcrypt untuk password hashing

## 🎨 UI Features

- Responsive Bootstrap 5 design
- Dark mode support
- Indonesian language interface
- Modal-based login flow
- Toast notifications
- Loading states dan error handling

## 📋 Roadmap

- [ ] Email OTP verification
- [ ] Google OAuth integration
- [ ] Web3 wallet connection
- [ ] IDRX token payments
- [ ] NFT minting dan metadata
- [ ] User dashboard
- [ ] Membership upgrade system
- [ ] Transaction history
- [ ] Reward points system

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@mieyamin.com or join our Discord community.
