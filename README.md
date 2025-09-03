# XMRT Hub - Your Central Hub for the XMRT DAO Ecosystem

Welcome to **XMRT Hub** - the central platform for interacting with the XMRT DAO ecosystem. This repository provides the core components and functionalities for XMRT Mobile Monero, a privacy-focused cryptocurrency with **real-time mining feed** and live statistics.

🌐 **Live Demo**: [mobilemonero.com](https://mobilemonero.com)

## 🚀 New Features - Live Mining Feed

### Real-Time Mining Statistics
- **Live DAO Statistics**: Real-time hashrate, miner count, and pool performance
- **Live Mining Feed**: Streaming feed of mining events including:
  - Miner connections and disconnections
  - Share submissions with hashrate data
  - Block discoveries and rewards
  - Payout transactions
- **Multi-Source Data Integration**: Fetches real data from SupportXMR pool API and XMRT ecosystem
- **Enhanced CORS Handling**: Multiple proxy fallbacks ensure reliable data access
- **Auto-Refresh**: Updates every 15 seconds for real-time experience

### Technical Improvements
- **Robust API Integration**: Multiple data sources with intelligent fallbacks
- **Real-Time Event Simulation**: Live mining activity feed when connected
- **Enhanced Error Handling**: Graceful degradation with retry mechanisms
- **Mobile-Optimized**: Responsive design maintaining mobile-first approach
- **Status Indicators**: Visual indicators for live/offline connection status

## MobileMonero within the XMRT DAO Context

MobileMonero is an essential part of the XMRT DAO ecosystem, serving as the foundation for generating real-world Monero mining revenue that powers the DAO. It is designed to make private cryptocurrency mining accessible and simple, even on mobile devices.

**Key aspects of MobileMonero's role:**

*   **Revenue Generation**: MobileMonero facilitates the mining of Monero, providing the XMRT DAO with its operational capital.
*   **Accessibility**: By making Monero mining simple and accessible on mobile devices, MobileMonero expands the reach of the XMRT ecosystem and promotes broader participation.
*   **Decentralized Funding**: The revenue generated through MobileMonero ensures that the XMRT DAO is funded in a decentralized manner, aligning with the principles of a true DAO.
*   **Ecosystem Integration**: MobileMonero is not just a mining tool; it's an integral part of the XMRT DAO's economic model, enabling the DAO to govern and allocate the value it generates.
*   **Real-Time Transparency**: Live mining feed provides complete transparency of mining operations and DAO performance.

## 🌟 What is XMRT?

**XMRT Mobile Monero** is a privacy-focused cryptocurrency that enables fast, secure, and untraceable transactions. It is built around Monero and offers enhanced features, including:

*   🔒 **Complete Privacy**: Anonymous and untraceable transactions
*   📱 **Mobile-Optimized**: Designed specifically for smartphones and tablets
*   ⚡ **Fast Transactions**: 2-minute block times vs 10 minutes for traditional Monero
*   🏛️ **DAO Governance**: Community-driven development and decision making
*   📊 **Live Mining Feed**: Real-time mining statistics and activity tracking
*   🌐 **Multi-Language Support**: Available in English and Spanish

## 🚀 Getting Started with XMRT

### For Mobile Users (Android)
1. **Install Termux**: Download from Google Play Store
2. **Install Python**: Run `pkg install python` in Termux
3. **Join MobileMonero**: Execute the provided setup script
4. **Start Mining**: Begin contributing to the XMRT DAO ecosystem

### For PC Users
1. **Download XMRig**: Get the latest version from xmrig.com
2. **Configure Mining**: Set up pool connection to `pool.supportxmr.com:3333`
3. **Use DAO Wallet**: `46UxNFuGM2E3UwmZWWJicaRPoRwqwW4byQkaTHkX8yPcVihp91qAVtSFipWUGJJUyTXgzSqxzDQtNLf2bsp2DX2qCCgC5mg`
4. **Monitor Progress**: Track your contributions via the live mining feed

## 📊 Live Mining Dashboard Features

### Real-Time Statistics
- **DAO Hashrate**: Current mining power of the DAO
- **Pool Performance**: Total pool hashrate and miner count
- **Network Stats**: Block height, difficulty, and last block time
- **Historical Data**: Total hashes, shares, and payout information

### Live Activity Feed
- **Mining Events**: Real-time stream of mining activities
- **Miner Activity**: Join/leave events with hashrate information
- **Block Discoveries**: Instant notification of found blocks and rewards
- **Payouts**: Live tracking of mining reward distributions
- **Share Submissions**: Real-time share acceptance and validation

### Data Sources
- **SupportXMR Pool API**: Primary source for real mining statistics
- **XMRT Ecosystem API**: Integration with autonomous DAO systems
- **Monero Network Data**: Live blockchain information
- **Multiple Proxies**: Ensures reliable data access across different networks

## 🏛️ XMRT Trust DAO

The XMRT Trust DAO is a decentralized autonomous organization (DAO) that governs the development and adoption of XMRT. The DAO empowers the community to make decisions and shape the future of the project.

### Ways to participate in the XMRT ecosystem:

*   **Hold XMRT tokens**: Participate in governance and earn rewards.
*   **Become a validator**: Secure the network and earn block rewards.
*   **Contribute to mining**: Join the mobile mining network and earn XMR.
*   **Monitor the ecosystem**: Use the live mining feed to track DAO performance.
*   **Contribute to the community**: Join discussions, develop tools, and promote XMRT.

## 🛠️ Technical Architecture

### Frontend Technologies
- **React + TypeScript**: Modern, type-safe frontend development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Efficient data fetching and caching
- **Shadcn/ui**: Beautiful, accessible UI components

### API Integration
- **Multi-Proxy Support**: Robust CORS handling with fallbacks
- **Real-Time Updates**: Automatic refresh and live data streaming
- **Error Handling**: Graceful degradation and retry mechanisms
- **Data Validation**: Type-safe API responses and error handling

### Deployment
- **Vercel**: Optimized for modern web applications
- **Mobile-First**: Responsive design for all device types
- **PWA Ready**: Progressive web app capabilities
- **Global CDN**: Fast loading worldwide

## 🔗 Resources:

*   **Website**: [https://mobilemonero.com](https://mobilemonero.com)
*   **Live Mining Dashboard**: [https://xmrtdao.vercel.app](https://xmrtdao.vercel.app)
*   **DAO Registration**: [https://xmrtdao.streamlit.app](https://xmrtdao.streamlit.app)
*   **XMRT DAO Info**: [https://xmrt.vercel.app](https://xmrt.vercel.app)
*   **GitHub Repository**: [https://github.com/epicadventurescr/xmrthub](https://github.com/epicadventurescr/xmrthub)
*   **Support Email**: [xmrtsolutions@gmail.com](mailto:xmrtsolutions@gmail.com)

## 📈 Mining Statistics (Live)

The platform provides real-time mining statistics including:
- Current DAO hashrate and pool performance
- Active miner count and network participation
- Historical mining data and payout information
- Live event feed with mining activities
- Network difficulty and block information

## 🔧 Development

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Setup
```bash
git clone https://github.com/epicadventurescr/xmrthub.git
cd xmrthub
npm install
npm run dev
```

### Features
- Hot reload development server
- TypeScript support with strict type checking
- ESLint and Prettier for code quality
- Responsive design testing
- Real-time API integration testing

## 🤝 Contributing

We welcome contributions to improve the XMRT Hub platform:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly with the live mining feed
5. Submit a pull request

## 📄 License

This project is part of the XMRT DAO ecosystem and follows open-source principles for community development.

**Disclaimer**: XMRT is a decentralized cryptocurrency. Its value and functionality may fluctuate. Mining rewards and DAO participation involve risks. Participate responsibly and understand the technology before investing time or resources.

