pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(address peer , string _Subject , string _Description) public {
        address newCampaign = new Campaign(msg.sender , peer , _Subject , _Description);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    address public peer1;
    address public peer2;
    string public Subject;
    string public Description;
    uint256 public TotalBalance;

    modifier restricted() {
        require(msg.sender == peer1 || msg.sender == peer2);
        _;
    }

    function Campaign(address creator , address peer , string _Subject , string _Description) public {
        peer1 = creator;
        peer2 = peer;
        Subject = _Subject;
        Description = _Description;
        TotalBalance = 0;
    }


    function MoveToCampaign() public payable {
        TotalBalance = TotalBalance + msg.value;
    }

    function finalize() public restricted {

        if (msg.sender == peer1)
          peer2.transfer(TotalBalance);
        if (msg.sender == peer2)
          peer1.transfer(TotalBalance);
        TotalBalance = 0;
    }
}
