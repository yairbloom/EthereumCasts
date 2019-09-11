pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(address Peer , string _Subject , string _Description) public {
        address newCampaign = new Campaign(msg.sender , Peer , _Subject , _Description);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    address public Peer1;
    address public Peer2;
    string public Subject;
    string public Description;
    uint256 public TotalBalance;

    modifier restricted() {
        require(msg.sender == Peer1 || msg.sender == Peer2);
        _;
    }

    function Campaign(address creator , address Peer , string _Subject , string _Description) public {
        Peer1 = creator;
        Peer2 = Peer;
        Subject = _Subject;
        Description = _Description;
        TotalBalance = 0;
    }


    function MoveToCampaign() public payable {
        TotalBalance = TotalBalance + msg.value;
    }

    function finalize() public restricted {

        if (msg.sender == Peer1)
          Peer2.transfer(this.balance);
        if (msg.sender == Peer2)
          Peer1.transfer(this.balance);
        TotalBalance = 0;
    }

    function getSummary() public view returns (
      address , address  , uint
      ) {
        return (
          Peer1,
          Peer2,
          this.balance
        );
    }

}
