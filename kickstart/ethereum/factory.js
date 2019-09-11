import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1c18176A7d11b4a8feaefF607Dbb479A4e55A353'
);

export default instance;
