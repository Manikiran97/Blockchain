const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');


const provider= ganache.provider();
const web3= new Web3(provider);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign= require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;


beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});



    

describe('Kickstart',() => {
    it('deploys Campaign and Campaign Factory',async() => {
        assert.ok(campaign.options.address);
        assert.ok(factory.options.address);    
    });

    it('who deployed the contract is the manager', async() =>{
        assert.equal(accounts[0], await campaign.methods.manager().call());
    });

    it('allows people to contribute money and marks them as approvers', async() => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '101'
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('allows manager to create a request', async() => {
        await campaign.methods.createRequest(
            'description','100',accounts[1]).send({
                from: accounts[0],
                gas: '1000000'
            });
        const request = await campaign.methods.requests(0).call();    
        assert.equal('description',request.description);
    });

    it('processes requests', async()=> {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '101'
        });
        await campaign.methods.contribute().send({
            from: accounts[2],
            value: '101'
        });
        await campaign.methods.contribute().send({
            from: accounts[3],
            value: '101'
        });

        await campaign.methods.createRequest(
            'description','100',accounts[1]).send({
                from: accounts[0],
                gas: '1000000'
            });

        await campaign.methods.approveRequest(0).send({
                from: accounts[1]
        });

        await campaign.methods.approveRequest(0).send({
                from: accounts[2]
        });

        await campaign.methods.approveRequest(0).send({
                from: accounts[3]
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0]
        });

        const request = await campaign.methods.requests(0).call();    
        assert(request.complete);

    });




});