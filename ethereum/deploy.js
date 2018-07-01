const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const factory = require('../ethereum/build/CampaignFactory.json');


const provider = new HDWalletProvider(
    'empty feature tent thing rabbit bomb slender fiscal hammer differ aspect soup ',
    'https://rinkeby.infura.io/vQ8OFrDgJMf9DcuPYGQw'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(factory.interface))
                      .deploy({data: '0x'+factory.bytecode})
                      .send({from: accounts[0],gas: '5000000'});

                      
    console.log('Campaignfactory is deployed at: ',result.options.address);
};

deploy();


