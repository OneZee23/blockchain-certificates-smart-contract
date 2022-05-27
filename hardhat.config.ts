import dotenv from 'dotenv';

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";

import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import { HardhatUserConfig } from 'hardhat/types';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    ropsten: {
      url: process.env.ETHEREUM_ROPSTEN_URL || "",
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: !!process.env.CRYPTO_WALLET_PRIVATE_KEY ? [ process.env.CRYPTO_WALLET_PRIVATE_KEY ] : [],
    },
    mainnet: {
      url: process.env.ETHEREUM_MAINNET_URL || "",
      chainId: 137,
      gasPrice: 20000000000,
      accounts: !!process.env.CRYPTO_WALLET_PRIVATE_KEY ? [ process.env.CRYPTO_WALLET_PRIVATE_KEY ] : [],
    },
  },
  etherscan: {
    apiKey: process.env.SCAN_API_KEY,
  },

};
export default config;
