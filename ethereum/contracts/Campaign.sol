pragma solidity 0.4.24;

contract CampaignFactory{
    
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public{
        deployedCampaigns.push(new Campaign(minimumContribution,msg.sender));
    }

    
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address receipient;
        bool complete;
        uint approvalCount;
        //This mapping contains the list of approvals that got for this particular request
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    /*This mapping contains the list of authorized approvers who can vote for a request
      We are Not using arrays for approvers because there can be 1000s of approvers for one campaign. 
      To check if a user is approver we need to loop over the entire array and this will cost lot of gas.
      Insted of arrays we can use mapping because lookup in mapping is cost effective.
    */
    mapping(address => bool) public approvers;
    uint public approversCount;
    uint public minimumContribution;

    
    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }   
    
    constructor(uint _minimumContribution, address creator) public {
        minimumContribution = _minimumContribution;
        manager = creator;
    }
    
    
    function contribute() public payable{
        require(msg.value>=minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(
        string _description,uint _value,address _recepient) public onlyManager {
        Request memory request = Request({
        description: _description,
        value: _value,
        receipient: _recepient,
        complete: false,
        approvalCount:0
        });
        
        
        requests.push(request);
    }
    function approveRequest(uint index) public{
        Request storage request = requests[index];
        //Check if the sender is approver
        require(approvers[msg.sender]);
        //Check if user didnt voted previously for the request
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender]= true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public{
        Request storage request = requests[index];
        //Check if approvals are > 50%
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        request.receipient.transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns(
                    uint,uint,uint,uint,address){
        
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
            );
    }
    
    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
    
}