const hdWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const {abi, evm}  = require('./compile');


const provider = new hdWalletProvider(
    'erode fever jacket blood space lift liquid agree clump cram fruit pumpkin',
    'rinkeby.infura.io/v3/6e2e115dc6f44593bf5b03d2a1237726'
);

const web3 = new Web3(provider);