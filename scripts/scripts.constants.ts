export enum NetworkTypes {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten',
}

export enum ContractsNames {
  CERTIFICATES_ROUTER = 'CertificatesRouter',
}

export const CONTRACTS = {
  [NetworkTypes.ROPSTEN]: {
    [ContractsNames.CERTIFICATES_ROUTER]: {
      name: ContractsNames.CERTIFICATES_ROUTER,
      address: '',
    },
  },
  [NetworkTypes.MAINNET]: {
    [ContractsNames.CERTIFICATES_ROUTER]: {
      name: ContractsNames.CERTIFICATES_ROUTER,
      address: '',
    },
  },
}

export const RELATERS = {
  [NetworkTypes.ROPSTEN]: [
    '0x451aAD07f92C31f0724c76383Da21E289Abb89EE',
  ],
  [NetworkTypes.MAINNET]: [
    '0x451aAD07f92C31f0724c76383Da21E289Abb89EE',
  ],
}
