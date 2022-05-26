import { ethers } from 'hardhat';
import { CertificatesRouter } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { CONTRACTS, ContractsNames, NetworkTypes } from './scripts.constants';

export namespace CertificatesRouterHelpers {
  const MANAGER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MANAGER'));

  export async function deploy(deployer: SignerWithAddress): Promise<CertificatesRouter> {
    const CONTRACT_NAME = CONTRACTS[NetworkTypes.ROPSTEN][ContractsNames.CERTIFICATES_ROUTER].name;
    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME, deployer);
    const contract = (await contractFactory.deploy()) as CertificatesRouter;
    await contract.deployed();
    return contract;
  }

  export async function deployAndInitialize(deployer: SignerWithAddress, manager: string): Promise<CertificatesRouter> {
    const certificatesRouter = await deploy(deployer);
    const grantRoleTx = await certificatesRouter.connect(deployer).grantRole(MANAGER_ROLE, manager);
    await grantRoleTx.wait();
    return certificatesRouter;
  }

}
