# Deployment Checklist - Mie Yamin Loyalty System

## Pre-Deployment Setup

### 1. Environment Variables
- [ ] **Backend .env**: Configure all required variables
  - [ ] MONGODB_URI (MongoDB Atlas connection string)
  - [ ] JWT_SECRET (strong random string)
  - [ ] SENDGRID_API_KEY or EMAIL_USER/EMAIL_PASS
  - [ ] RPC_URL (Infura/Alchemy Sepolia endpoint)
  - [ ] PRIVATE_KEY (service wallet private key)
  - [ ] GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET
  - [ ] FRONTEND_URL

- [ ] **Frontend .env.local**: Configure public variables
  - [ ] NEXT_PUBLIC_API_URL
  - [ ] NEXT_PUBLIC_RPC_URL
  - [ ] NEXT_PUBLIC_IDRX_CONTRACT_ADDRESS
  - [ ] NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  - [ ] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

### 2. External Services Setup
- [ ] **MongoDB Atlas**
  - [ ] Create cluster
  - [ ] Whitelist IP addresses (0.0.0.0/0 for development)
  - [ ] Create database user
  - [ ] Get connection string

- [ ] **SendGrid**
  - [ ] Create account
  - [ ] Verify sender email
  - [ ] Generate API key
  - [ ] Configure domain authentication (optional)

- [ ] **Infura/Alchemy**
  - [ ] Create account
  - [ ] Get Sepolia RPC URL
  - [ ] Fund account with Sepolia ETH

- [ ] **Google OAuth**
  - [ ] Create Google Cloud project
  - [ ] Enable Google+ API
  - [ ] Create OAuth 2.0 credentials
  - [ ] Configure authorized redirect URIs

- [ ] **WalletConnect**
  - [ ] Create project
  - [ ] Get Project ID

## Smart Contract Deployment

### 3. Contract Deployment
- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Configure networks in hardhat.config.js**
  - [ ] Sepolia network with private key
  - [ ] Etherscan API key for verification

- [ ] **Deploy contracts**
  ```bash
  npx hardhat run scripts/deploy.js --network sepolia
  ```

- [ ] **Verify contracts on Etherscan**
  ```bash
  npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
  ```

- [ ] **Update .env files with contract addresses**
  - [ ] IDRX_CONTRACT_ADDRESS
  - [ ] NFT_CONTRACT_ADDRESS

### 4. Contract Testing
- [ ] **Run tests**
  ```bash
  npx hardhat test
  ```

- [ ] **Test deployments on local network**
  ```bash
  npx hardhat node
  npx hardhat run scripts/deploy.js --network localhost
  ```

## Backend Deployment

### 5. Backend Setup
- [ ] **Install dependencies**
  ```bash
  cd backend
  npm install
  ```

- [ ] **Test database connection**
  ```bash
  node -e "require('./server.js').testDB()"
  ```

- [ ] **Test email service**
  - [ ] Send test OTP email
  - [ ] Verify SendGrid/nodemailer configuration

- [ ] **Configure service wallet**
  - [ ] Import private key to wallet
  - [ ] Fund wallet with Sepolia ETH
  - [ ] Verify wallet can interact with deployed contracts

### 6. Backend Testing
- [ ] **Start backend server**
  ```bash
  npm start
  ```

- [ ] **Test endpoints**
  - [ ] POST /auth/otp/request
  - [ ] POST /auth/otp/verify
  - [ ] GET /loyalty/packages
  - [ ] POST /loyalty/create-order (with JWT)

## Frontend Deployment

### 7. Frontend Setup
- [ ] **Install dependencies**
  ```bash
  cd mie-yamin-untar
  npm install
  ```

- [ ] **Configure Bootstrap SCSS**
  - [ ] Update color variables for branding
  - [ ] Import custom SCSS files

- [ ] **Test Web3 connections**
  - [ ] MetaMask integration
  - [ ] WalletConnect modal
  - [ ] Contract interactions

### 8. Frontend Testing
- [ ] **Start development server**
  ```bash
  npm run dev
  ```

- [ ] **Test user flows**
  - [ ] Header "Connect Wallet" button
  - [ ] Login modal (Google + Wallet options)
  - [ ] Pricing page with IDRX prices
  - [ ] "Buy with IDRX" buttons
  - [ ] Dashboard tabs and data display

## Integration Testing

### 9. End-to-End Testing
- [ ] **Complete user journey**
  - [ ] Connect wallet
  - [ ] Approve IDRX spending
  - [ ] Purchase membership
  - [ ] Verify NFT minting
  - [ ] Check dashboard updates

- [ ] **Email OTP flow**
  - [ ] Request OTP
  - [ ] Receive email
  - [ ] Verify OTP
  - [ ] JWT token generation

- [ ] **Google OAuth flow**
  - [ ] Redirect to Google
  - [ ] OAuth callback
  - [ ] User creation/login

### 10. Security Testing
- [ ] **API security**
  - [ ] JWT token validation
  - [ ] Rate limiting
  - [ ] Input validation
  - [ ] CORS configuration

- [ ] **Blockchain security**
  - [ ] Contract access controls
  - [ ] Reentrancy protection
  - [ ] Input validation in contracts

## Production Deployment

### 11. Production Environment
- [ ] **Backend deployment**
  - [ ] Choose hosting (Railway, Render, Heroku, VPS)
  - [ ] Configure production environment variables
  - [ ] Set up SSL certificate
  - [ ] Configure reverse proxy (nginx)

- [ ] **Frontend deployment**
  - [ ] Choose hosting (Vercel, Netlify, AWS S3)
  - [ ] Configure build settings
  - [ ] Set up custom domain
  - [ ] Configure environment variables

- [ ] **Database**
  - [ ] MongoDB Atlas production cluster
  - [ ] Configure backup policies
  - [ ] Set up monitoring

### 12. Monitoring & Logging
- [ ] **Set up monitoring**
  - [ ] Application performance monitoring
  - [ ] Error tracking (Sentry)
  - [ ] Database monitoring
  - [ ] Blockchain transaction monitoring

- [ ] **Configure logging**
  - [ ] Backend request/response logs
  - [ ] Error logs with stack traces
  - [ ] Blockchain transaction logs

## Post-Deployment

### 13. Final Checks
- [ ] **Contract ownership**
  - [ ] Transfer contract ownership to multisig wallet
  - [ ] Set up MINTER_ROLE for backend wallet

- [ ] **Token distribution**
  - [ ] Mint initial IDRX supply to treasury
  - [ ] Set up token distribution mechanism

- [ ] **Documentation**
  - [ ] Update README with deployment instructions
  - [ ] Create user guides
  - [ ] Set up support channels

### 14. Go-Live
- [ ] **Soft launch**
  - [ ] Limited user access
  - [ ] Monitor for issues
  - [ ] Collect feedback

- [ ] **Full launch**
  - [ ] Public announcement
  - [ ] Marketing campaign
  - [ ] Community engagement

## Emergency Procedures

### Rollback Plan
- [ ] **Contract rollback**: Pause contracts if critical issues
- [ ] **Backend rollback**: Deploy previous version
- [ ] **Frontend rollback**: Rollback to previous deployment

### Incident Response
- [ ] **Security incidents**: Immediate contract pausing
- [ ] **Data breaches**: User notification within 72 hours
- [ ] **Service outages**: Status page updates

## Maintenance

### Regular Tasks
- [ ] **Weekly**: Review logs and error rates
- [ ] **Monthly**: Update dependencies and security patches
- [ ] **Quarterly**: Security audit and penetration testing

### Monitoring Alerts
- [ ] **Critical**: Contract exploits or hacks
- [ ] **High**: Service downtime > 5 minutes
- [ ] **Medium**: Failed transactions or API errors
- [ ] **Low**: Performance degradation

---

## Quick Reference

### Contract Addresses (Update after deployment)
- IDRX Token: `0x...`
- Membership NFT: `0x...`

### Key Endpoints
- Backend API: `https://api.mieyamin.com`
- Frontend: `https://mieyamin.com`

### Support Contacts
- Technical: tech@mieyamin.com
- Business: support@mieyamin.com
- Security: security@mieyamin.com
