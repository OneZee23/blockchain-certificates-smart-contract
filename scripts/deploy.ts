import {ethers} from "hardhat";
import * as hre from "hardhat";
import { CONTRACTS } from './scripts.constants';
import { getNetwork } from './scripts.utils';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Network:", getNetwork());

  const doDeployCertificatesRouter = false;
  const contracts = CONTRACTS[getNetwork()];

  if (doDeployCertificatesRouter) {
    const Contract = await ethers.getContractFactory(contracts.CertificatesRouter.name);
    const contract = await Contract.deploy();
    await contract.deployTransaction.wait(5);
    console.log("=================== New CertificatesRouter address: ===================", contract.address);
    await hre.run('verify:verify', {
      address: contract.address,
      contract: "contracts/CertificatesRouter.sol:CertificatesRouter",
      constructorArguments: [],
    });
  }
}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
