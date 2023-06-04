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
  mapping (uint = >uint) public proposals;	// maps a proposal number t to an integer n
  // if n==0 this means that proposal t was rejected
  // if n>0 this means that proposal t was accepted and refers to withdraw n coins 
  string public PK;		// PK of the DAO represented as hexadecimal string 
  // encoding an EC point in compressed form

  function getPK () external view returns (string memory pk)
  {
    pk = PK;
  }

  function ApproveProposal (uint t, uint256 nCoins) external
  {
    proposals[t] = nCoins;

  }
  function setPK (string calldata pk) internal
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
