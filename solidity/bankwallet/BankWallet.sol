// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Bank3: BankWallet
 * @dev Implements the Bank3 protocol for Wallets described here:
 * https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
  */


contract BankWallet {

   

    struct Deposit {
        uint256 nCoins; // the amount of coins (in wei units) to be transferred
        bytes32 B; // the value B

    }
    address public Director;
    uint256 public Fees;
    //uint public Id;
    mapping(bytes => Deposit) public deposits; // each deposit is associated with an identifier
    address payable owner;

    /** 
     * @dev At construction time we can set some fees and the receiver of the fees
     * @param fees the amount of fees to be paid to the Bank Director
     */
    constructor(uint256 fees) {
        Director = msg.sender;
        Fees=fees;
        //Id=0;

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
     * @dev Make a deposit annotated with identifier id of msg.value coins with deposit CT=(A,B)
     * @param A and B byte arrays representing the deposit
     * 
     * The parameter calldata is not used on purpose, it will appear on ether scans
     * so one can use it off-chain to compute the proof needed for a withdrawal but the contract does not use it directly
     */
    function MakeDeposit(bytes calldata A, bytes32 B) external  payable
    {
 
       require(deposits[A].B==0);
       deposits[A].nCoins=msg.value;
       deposits[A].B=B;
       //id=Id++;
    }


    /*
     * @dev Make a withdrawal for nCoins in favour of the Wallet with address addr
     * and presents as proof of the rights to withdraw the value C that refers to the deposit identified by identifier A
     * @param nCoins is the quantity to withdraw in wei, addr is the address of the Wallet from which to perform the withdrawal, A is the identifier of the deposit we refer to and C is the proof of the right to withdraw
     */
    function MakeWithdrawalSha256(uint256 nCoins, address addr, bytes calldata A, bytes calldata C) external {
        
 bytes32 xor= sha256(abi.encodePacked(addr)) ^ sha256(C);
require((xor == deposits[A].B));
 

require(deposits[A].nCoins>=nCoins);

deposits[A].nCoins-=nCoins;
payable(addr).transfer(nCoins);
    }


/** 
     * @dev Make a withdrawal for deposits[A].nCoins in favour of the wallet with address addr
     * and presents as proof of the rights to withdraw the value C that refers to the deposit identified by identifier A. It is similar to MakeWithdrawalSha256 except that it uses kecca256 rather than sha256 and withdraws the maximum amount of deposited coins for this identifier.
     * @param addr is the address in favour of which to perform the withdrawal, A is the identifier of the deposit we refer to and C is the proof of the right to withdraw
     */
//    function MakeWithdrawalKeccac256(uint nCoins, address addr, bytes calldata A, bytes calldata C) external {
    function MakeWithdrawalKeccac256(bytes calldata A, address addr,  bytes calldata C) external {
        
 bytes32 xor= keccak256(abi.encodePacked(addr)) ^ keccak256(C);

require((xor == deposits[A].B));

//require(deposits[A].nCoins>=nCoins);

//deposits[A].nCoins-=nCoins;
uint nCoins=deposits[A].nCoins;
deposits[A].nCoins=0;
payable(addr).transfer(nCoins);

    }
 

}

