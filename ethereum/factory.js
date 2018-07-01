import web3 from'./web3';
import  CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
                        JSON.parse(CampaignFactory.interface),
                        '0x012B1aDCE95453625945c70E0ad9505AeAD19E3B');

export default instance;