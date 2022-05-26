import chai from 'chai';
import { ethers } from 'hardhat';
import { CertificatesRouter } from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { CertificatesRouterHelpers } from '../scripts/certificates-router.helpers';

const { expect } = chai;

describe('CertificatesRouter', function () {
  let certificatesRouter: CertificatesRouter;

  let admin: SignerWithAddress;
  let user: SignerWithAddress;
  let anotherUser: SignerWithAddress;
  let relayer: SignerWithAddress;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    admin = accounts[0];
    user = accounts[1];
    anotherUser = accounts[2];
    relayer = accounts[3];

    certificatesRouter = await CertificatesRouterHelpers.deployAndInitialize(admin, relayer.address);
  });

  it('Any address gets version', async function () {
    const version = 1;
    expect(await certificatesRouter.connect(user).version()).to.equal(version);
  });

  it('MANAGER can create new certificate for another address', async function () {
    const to = user.address;
    const ipfsHash = '0xSomeHash';
    const certificateDescription = 'Hello world!';

    await expect(certificatesRouter.connect(relayer).createCertificate(to, ipfsHash, certificateDescription))
      .to.emit(certificatesRouter, 'Created')
      .withArgs(to, ipfsHash, certificateDescription);
  });

  it('not MANAGER can not create new certificate for another address', async function () {
    const to = user.address;
    const ipfsHash = '0xSomeHash';
    const certificateDescription = 'Hello world!';

    await expect(certificatesRouter.connect(user).createCertificate(to, ipfsHash, certificateDescription)).to.reverted;
  });

  it('error on create same certificates more then one time', async function () {
    const to = user.address;
    const anotherTo = anotherUser.address;
    const ipfsHash = '0xSomeHash';
    const anotherIpfsHash = '0xSomeHash';
    const certificateDescription = 'Hello world!';

    const tx = await certificatesRouter.connect(relayer).createCertificate(to, ipfsHash, certificateDescription);
    await tx.wait();

    await expect(certificatesRouter.connect(relayer).createCertificate(to, anotherIpfsHash, certificateDescription))
      .to.revertedWith("CertificatesRouter: such a certificate has already been issued before");

    await expect(certificatesRouter.connect(relayer).createCertificate(anotherTo, ipfsHash, certificateDescription))
      .to.revertedWith("CertificatesRouter: such a certificate has already been issued before");

    await expect(certificatesRouter.connect(relayer).createCertificate(to, ipfsHash, certificateDescription))
      .to.revertedWith("CertificatesRouter: such a certificate has already been issued before");
  });
});
