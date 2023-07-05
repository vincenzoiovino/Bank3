// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.7 .0 < 0.9 .0;



contract GenericDAO
{
  receive () external payable
  {
  }

  fallback () external payable
  {
  }
  mapping (uint = >uint256) public proposals;	// maps a proposal number t to an integer n
  // if n==0 this means that proposal t was rejected
  // if n>0 this means that proposal t was accepted and refers to withdraw n coins 
  bytes public PK;		// PK of the DAO represented as compressed EC point

  function getPK () external view returns (bytes memory pk)
  {
    pk = PK;
  }

  function ApproveProposal (uint t, uint256 nCoins) external
  {
    proposals[t] = nCoins;

  }

  function setPK (bytes calldata pk) external
  {
    PK = pk;
  }

  function isWithdrawalApproved (uint t, uint256 nCoins) external view
    returns (bool isapproved)
  {
    if (proposals[t] == 0)
      isapproved = false;
    else if (proposals[t] >= nCoins)
      isapproved = true;
    else
      isapproved = false;
  }

}
