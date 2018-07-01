import web3 from './web3';
import  Campaign from './build/Campaign.json'

import react, { Component} from 'react';

export default (campaignAddress) =>{
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        campaignAddress);
};



