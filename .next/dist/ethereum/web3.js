'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*Whole purpose of this file is to create the instance of web3(installed version) with injected web3 provider */
var Web3 = require('web3');

var web3 = void 0;
if (typeof window != 'undefined' && typeof window.web3 != 'undefined') {
    //typeof window != 'undefined' --> Checks if we are in browser
    //typeof window.web3 != 'undefined'Checks if Metamask is available
    web3 = new Web3(window.web3.currentProvider);
} else {
    //Page renders at server side or Metamask is not available
    var provider = new Web3.providers.HttpProvider(
    //This is the URL of the Infura remote node that we have access to.
    'https://rinkeby.infura.io/vQ8OFrDgJMf9DcuPYGQw');

    web3 = new Web3(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFx3ZWIzLmpzIl0sIm5hbWVzIjpbIldlYjMiLCJyZXF1aXJlIiwid2ViMyIsIndpbmRvdyIsImN1cnJlbnRQcm92aWRlciIsInByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsSUFBTSxPQUFPLEFBQVAsQUFBTjs7QUFFQSxJQUFJLFlBQUo7QUFDQSxJQUFHLE9BQU8sQUFBUCxVQUFpQixBQUFqQixlQUFnQyxPQUFPLE9BQU8sQUFBZCxRQUFzQixBQUF6RCxhQUFxRSxBQUNqRTtBQUNBO0FBQ0E7V0FBTyxJQUFJLEFBQUosS0FBUyxPQUFPLEFBQVAsS0FBWSxBQUFyQixBQUFQLEFBQ0g7QUFKRCxPQUlLLEFBQ0Q7QUFDQTtRQUFNLFdBQVcsSUFBSSxLQUFLLEFBQUwsVUFBZSxBQUFuQixBQUNiO0FBQ0E7QUFGYSxBQUFqQixBQUtBOztXQUFPLElBQUksQUFBSixLQUFTLEFBQVQsQUFBUCxBQUNIO0FBRUQ7O2tCQUFlLEFBQWYiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiJFOi9NYW5pIEZvbGRlci9CbG9ja2NoYWluL0V0aGVyZXVtX1VkZW15X1Byb2plY3RzL1Byb2plY3QzX0tpY2tzdGFydCJ9