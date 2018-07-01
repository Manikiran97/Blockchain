/*Whole purpose of this file is to create the instance of web3(installed version) with injected web3 provider */
const Web3 = require('web3');

let web3;
if(typeof window != 'undefined' && typeof window.web3 != 'undefined'){
    //typeof window != 'undefined' --> Checks if we are in browser
    //typeof window.web3 != 'undefined'Checks if Metamask is available
    web3 = new Web3(window.web3.currentProvider);
}else{
    //Page renders at server side or Metamask is not available
    const provider = new Web3.providers.HttpProvider(
        //This is the URL of the Infura remote node that we have access to.
        'https://rinkeby.infura.io/vQ8OFrDgJMf9DcuPYGQw'
    );

    web3 = new Web3(provider);
}

export default web3;

