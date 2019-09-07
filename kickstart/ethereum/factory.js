import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9f6C4A463dA29457eed4cc2C0963e93180A5F984'
);

export default instance;
