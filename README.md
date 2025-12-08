# The Emerald Standard

A blockchain-based platform for authenticating and tokenizing Panjshir Valley emeralds. Each NFT represents a real, scanned emerald stone with immutable provenance on the Polygon blockchain.

## Features

### 🌟 Public Features (No Authentication Required)
- **Browse Gallery**: View all available emerald NFTs with images, grades, and specifications
- **Learn About Process**: Understand our certification and tokenization workflow
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices

### 👤 Authenticated User Features
- **Mint NFTs**: Connect wallet and mint certified emerald NFTs
- **View Collection**: Browse your owned emerald NFTs with metadata
- **Blockchain Integration**: Direct interaction with Polygon smart contracts

### 🔧 Admin Features
- **Scanner Interface**: Access hardware bridge instructions and recent scans
- **Inventory Management**: Full CMS control over emerald database through Payload admin panel
- **User Management**: Manage user accounts and roles

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Payload CMS 3.0 with PostgreSQL
- **Blockchain**: Polygon (MATIC) with custom ERC-721 smart contract
- **Storage**: IPFS for permanent image and metadata storage
- **Authentication**: Built-in Payload authentication with role-based access
- **Hardware Bridge**: Python script with OpenCV for emerald scanning

## User Roles

### Regular Users (`role: 'user'`)
- Can browse the emerald gallery
- Can mint NFTs using connected wallet
- Can view their NFT collection
- Cannot access admin or scanner features

### Admin Users (`role: 'admin'`)
- All regular user permissions
- Can access scanner interface and instructions
- Can manage emerald inventory through CMS
- Can access full admin panel for system management

## Collections

### Users
- Email, first name, last name
- Role-based authentication (user/admin)
- Default role: 'user'

### Emeralds
- Stone ID, weight, grade, origin
- High-resolution scan images
- IPFS hash for metadata
- Token ID and minting status
- Blockchain provenance

### Media
- Image upload and management for emerald scans
- Alt text for accessibility

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- Python 3.8+ with OpenCV
- PostgreSQL database (Vercel Postgres recommended)
- MetaMask wallet for NFT minting

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-emerald-standard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Configure your environment variables:
   ```env
   PAYLOAD_SECRET=your-secret-key
   POSTGRES_URL=your-postgres-connection-string
   PINATA_API_KEY=your-pinata-api-key
   PINATA_SECRET_KEY=your-pinata-secret-key
   POLYGON_RPC_URL=https://polygon-rpc.com/
   MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
   PRIVATE_KEY=your-wallet-private-key
   CONTRACT_ADDRESS=deployed-contract-address
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### First Time Setup

1. **Create Admin User**: Visit `/admin` to create your first admin user
2. **Deploy Smart Contract**: Use Hardhat to deploy the EmeraldStandard contract
3. **Configure Scanner**: Set up your digital microscope and run the Python script
4. **Add Emeralds**: Use the scanner to certify and add emeralds to inventory

## API Endpoints

### Emeralds
- `POST /api/ingest` - Upload scanned emerald data (admin/hardware bridge)
- `GET /api/user-nfts` - Get user's minted NFTs (authenticated)

### Built-in Payload Endpoints
- `/api/users` - User management
- `/api/emeralds` - Emerald inventory management
- `/api/media` - Media upload/management
- `/admin` - Admin panel access

## Application Flow

### For Visitors (Unauthenticated)
1. **Gallery**: Browse available emerald NFTs
2. **Learn**: Read about certification process
3. **Sign Up**: Create account to start minting

### For Regular Users
1. **Connect Wallet**: Link MetaMask to the platform
2. **Browse & Mint**: Select emeralds and mint NFTs
3. **View Collection**: Track owned NFTs in personal dashboard

### For Admin Users
1. **Scanner Setup**: Access hardware bridge instructions
2. **Inventory Management**: Add/edit emerald data through CMS
3. **Monitor System**: Track minting activity and user engagement

## Hardware Bridge Setup

### Python Dependencies
```bash
pip install opencv-python requests
```

### Running the Scanner
```bash
python src/scanner_client.py
```

The script will:
1. Initialize camera/microscope
2. Capture high-resolution images
3. Upload to backend API
4. Generate IPFS metadata
5. Store in database for minting

## Smart Contract

### Deployment
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

### Contract Features
- ERC-721 standard compliance
- Limited supply (2,300 tokens)
- Gas-optimized minting
- Admin controls for metadata URI
- Fund withdrawal functionality

## Security Features

- **Role-based Access Control**: Proper separation of user and admin permissions
- **IPFS Permanence**: Immutable image and metadata storage
- **Blockchain Verification**: On-chain ownership records
- **Hardware Authentication**: Physical scanning prevents duplication

## Deployment

### Using Payload Cloud
1. Connect your repository to Payload Cloud
2. Configure environment variables
3. Deploy automatically with PostgreSQL

### Using Vercel
1. Connect repository to Vercel
2. Configure Vercel Postgres database
3. Set environment variables
4. Deploy with custom build command

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm generate:types  # Generate TypeScript types
pnpm lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:
- Check the [Payload CMS documentation](https://payloadcms.com/docs)
- Review the Polygon documentation
- Open an issue in the repository

---

**Built with ❤️ using Payload CMS, Next.js, and Polygon**