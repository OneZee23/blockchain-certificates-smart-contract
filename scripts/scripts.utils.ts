import { ethers } from 'hardhat';
import { ContractsNames, CONTRACTS, NetworkTypes } from './scripts.constants';

export async function attachToContract(contractName: ContractsNames) {
  const network = getNetwork();
  const Token = await ethers.getContractFactory(CONTRACTS[network][contractName].name);
  return Token.attach(CONTRACTS[network][contractName].address);
}

export function getNetwork(): NetworkTypes {
  switch (process.env.HARDHAT_NETWORK) {
    case NetworkTypes.ROPSTEN.toString():
      return NetworkTypes.ROPSTEN;
    case NetworkTypes.MAINNET.toString():
      return NetworkTypes.MAINNET;
    default:
      throw new Error('Unknown network');
  }
}
