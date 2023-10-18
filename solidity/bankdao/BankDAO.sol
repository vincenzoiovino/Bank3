// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Bank DAO
 * @dev Implements the Bank of DAO protocol described here:
 * https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
  */

contract GenericDAO {
       
    // a generic DAO that participates in the Bank DAO protocol
    // should implement this function that takes two integers, t and nCoins
    // the function should output 1 iff the proposal number t in the DAO was in favour of 
    // withdrawing nCoins from the Bank
    function isWithdrawalApproved(uint, uint256) public returns (bool)  { }
}

contract BankDAO {

   

    struct Deposit {
        uint256 nCoins; // the amount of coins (in wei units) to be transferred
        bytes B; // the value B

    }
    address public Director;
    uint256 public Fees;
    uint public Id;
    mapping(uint => Deposit) public deposits; // each deposit is associated with an identifier
    address payable owner;
    mapping(address=>uint) public lock_proposal; // check if a given proposal of a given DAO has been already used for withdrawal

    /** 
     * @dev At construction time we can set some fees and the receiver of the fees
     * @param fees the amount of fees to be paid to the Bank Director
     */
    constructor(uint256 fees) {
        Director = msg.sender;
        Fees=fees;
        Id=0;

    }
/** 
     * @dev The Director can later set fees for deposits - not implemented yet
     * @param fees the amount of fees to be paid to the Bank Director
     */
function setFees(uint256 fees) external {
    require (msg.sender==Director);
    Fees=fees;
}

/** 
     * @dev Check if the proposal number t in the DAO with address addr concerned the withdrawal of >=nCoins coins and was accepted
     * @param t the proposal number, nCoins the number of coins, addr the address of the DAO from which to withdraw
     */
    function isWithdrawalApproved(uint t, uint256 nCoins, address addr) internal 
        returns  (bool isapproved)
     {
       require(t>lock_proposal[addr]); // if it is the first proposal t should be 1. If the proposal was already used it will be refused, otherwise t should be greater than the previous proposal. 
                                        // So, currently a proposal should be withdrawn before the next one is approved.
        GenericDAO D;
        D=GenericDAO(addr);

        isapproved=D.isWithdrawalApproved(t,nCoins );
        if (isapproved) lock_proposal[addr]=t;
       return isapproved;
     }

    /** 
     * @dev Make a deposit annotated with identifier id of msg.value coins with deposit CT=(A,B)
     * @param A and B byte array representing the deposit
     * @return id the identifier id
     * The parameter calldata is not used on purpose, it will appear on ether scans
     * so one can use it off-chain to compute the proof needed for a withdrawal but the contract does not use it directly
     */
    function MakeDeposit(string calldata A, bytes calldata B) external  payable
    returns  (uint id) {

       deposits[Id].nCoins=msg.value;
       deposits[Id].B=B;
       id=Id++;
    }


    /** 
     * @dev Make a withdrawal that was accepted for >=nCoins in proposal number t on the DAO with address addr
     * and presents as proof of the rights to withdraw the value C that refers to the deposit identified by identifier id
     * @param t is the number of the proposal, nCoins the quantity to withdraw in wei, addr is the address of the DAO from which to withdraw, id is the identifier of the deposit we refer to and C is the proof of the right to withdraw
     */
    function MakeWithdrawalSha256(uint t, uint256 nCoins, address addr, uint id, bytes calldata C) external {
        
 bytes32 xor= sha256(abi.encodePacked(addr)) ^ sha256(C);
require((xor == bytes32(deposits[id].B)));
 

require(isWithdrawalApproved(t,nCoins,addr)); 

require(deposits[id].nCoins>=nCoins);

deposits[id].nCoins-=nCoins;
payable(addr).transfer(nCoins);
    }

/** 
     * @dev Make a withdrawal that was accepted for >=nCoins in proposal number t on the DAO with address addr
     * and presents as proof of the rights to withdraw the value C that refers to the deposit identified by identifier id. It is identical to MakeWithdrawalSha256 except that it uses kecca256 rather than sha256.
     * @param t is the number of the proposal, nCoins the quantity to withdraw in wei, addr is the address of the DAO from which to withdraw, id is the identifier of the deposit we refer to and C is the proof of the right to withdraw
     */
    function MakeWithdrawalKeccac256(uint t, uint256 nCoins, address addr, uint id, bytes calldata C) external {
        
 bytes32 xor= keccak256(abi.encodePacked(addr)) ^ keccak256(C);
require((xor == bytes32(deposits[id].B)));
 

require(isWithdrawalApproved(t,nCoins,addr)); 

require(deposits[id].nCoins>=nCoins);

deposits[id].nCoins-=nCoins;
payable(addr).transfer(nCoins);
    }
 

}
