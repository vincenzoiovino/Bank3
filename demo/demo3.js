const SignMessage = "Do not sign this message in any application different than Bank3. The signature will be used as your SECRET PASSWORD!";
// Contract Details
const contractBankWalletsAddress = "0xdf1253E14506a3223e351dDB8EFbC0a008A62989";
const contractBankWalletsABI= 
[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Director",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Fees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "A",
				"type": "bytes"
			},
			{
				"internalType": "bytes32",
				"name": "B",
				"type": "bytes32"
			}
		],
		"name": "MakeDeposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "A",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "C",
				"type": "bytes"
			}
		],
		"name": "MakeWithdrawalKeccac256",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nCoins",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "A",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "C",
				"type": "bytes"
			}
		],
		"name": "MakeWithdrawalSha256",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "deposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "nCoins",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "B",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "A",
				"type": "bytes"
			}
		],
		"name": "get_ncoins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"name": "setFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const contractZkRegAddress = "0xc32498817cC84236D0686D7ee449D2ADB186097B"; 
const contractZkRegABI = [
	{
		"inputs": [],
		"name": "BBJJPK_X_INTERFACE_ID",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BBJJPK_Y_INTERFACE_ID",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BLS12PK_X_INTERFACE_ID",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BLS12PK_Y_INTERFACE_ID",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "POSEIDON_INTERFACE_ID",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "interface_id",
				"type": "uint8"
			}
		],
		"name": "deregister",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deregister_public_key",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "interface_id",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "get_public_key",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "interface_id",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			}
		],
		"name": "register_public_key",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registry",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registry_public_key",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];



var zkerror=0;
const web3 = new Web3(window.ethereum);
// Function to check if MetaMask is available
async function checkMetaMaskAvailability() {
  if (window.ethereum) {
    try {
      // Request access to MetaMask accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return true;
    } catch (err) {
      console.error("Failed to connect to MetaMask:", err);
      return false;
    }
  } else {
    console.error("MetaMask not found");
    return false;
  }
}

// Event listener for MetaMask button
document.getElementById("metamask").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await ConnectWallet();
    await AccountInformation();
    await BankInformation();
  } else {
    // MetaMask not available
    console.error("MetaMask not found");
    // Update status
    document.getElementById("status1").innerText = "MetaMask not found";
    document.getElementById("status1").style.color = "red";
  }
});

//Function to connect to MetaMask
async function ConnectWallet() {
  try {
    // Request access to MetaMask accounts
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Update status
    document.getElementById("status1").innerText = "Connected to MetaMask";
    document.getElementById("status1").style.color = "green";
  } catch (err) {
    // Handle error
    console.error("Failed to connect to MetaMask:", err);
    // Update status
    document.getElementById("status1").innerText =
      "Failed to connect to MetaMask";
    document.getElementById("status1").style.color = "red";
  }
}

// Event Listener for Create public key in ZKReg 
document.getElementById("accountbutton").addEventListener("click", async () => {
  const accounts = await web3.eth.getAccounts();
  const myaddr = accounts[0];
   var pk=await getfromZkReg(0,myaddr);
 if (pk!="error"){
if (!confirm('Your account has been already associated with the ZkRegistry PK ' +"\"" +pk +"\"."+'\nAare you sure you want to register a new public key?')) return;

}
let password=await window.ethereum.request({method: 'personal_sign',params: [SignMessage, myaddr]});
password=password.substr(2).toLowerCase();
if (password=="")  {
alert("Password is empty");
return;
}


  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
const PK=gen(password);
      await ZkRegAddPK(PK)
  }
});

//Function to call the Account Information
async function AccountInformation() {
  const account = await web3.eth.getAccounts();
  const from = account[0];
  const balanceInWei = await web3.eth.getBalance(from);
  const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
  const gasPrice = await web3.eth.getGasPrice();
  const gasPriceInEth = web3.utils.fromWei(gasPrice, "ether");

  // Display the account information
  document.getElementById("status2").innerText =
    "Your account address: " +
    from +
    "\nYour Balance: " +
    balanceInEth +
    " ETH" +
    "\nGas Price: " +
    gasPriceInEth;
  document.getElementById("status2").style.color = "white";
}
async function BankInformation() {
  const from = contractBankWalletsAddress;
  const balanceInWei = await web3.eth.getBalance(from);
  const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

  // Display the account information
  document.getElementById("status3").innerText =
    "Bank3 Address: " +
    from +
    "\nBank3 Balance: " +
    balanceInEth +
    " ETH";
  document.getElementById("status3").style.color = "yellow";
}

// Event Listener for Send Transaction
document.getElementById("sendButton").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await SendFunction();
  }
});

//Function to call the MakeDeposit Function
async function SendFunction() {
  // Get input values
  const to = document.getElementById("addressinput").value;
  const amount = document.getElementById("amountinput").value;

  // Check if both to and amount are provided
  if (!to || !amount) {

    alert("Address and amount are required");
    console.error("To and amount are required");
    return;
  }
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];
   var pk=await getfromZkReg(0,to);
   if (pk=="error") {
alert("Failed to retrieve the public key of address "+to+". This can be due to the fact that the address has not been associated to a public key into the ZKRegistry.");
return;
}
   const s=enc(pk.substr(2),to.substr(2)).split(' ');
   const A=s[0].substr(2);
   const B=s[1].substr(2);
//console.log(to); 
//console.log("pk: "+pk+" s:"+enc(pk.substr(2),to.substr(2))+" A:"+A+" B:"+B);
// Convert amount to wei (1 ether = 10^18 wei)
  const amountWei = web3.utils.toWei(amount, "ether");
  
  const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
 zkerror=0;
  try {
 
const encodedA = hexToBytes(A);
const encodedB = hexToBytes(B);
    await contract.methods.MakeDeposit(encodedA,encodedB).send({from:from, value:amountWei});
    // Update status
    document.getElementById("status4").innerText = "Deposit of " + amountWei +"wei in favour of " +to+" has been associated to identifier: 0x"+ A;
    document.getElementById("status4").style.color = "yellow";
    document.getElementById("status5").innerText = "Deposit made successfully";
    document.getElementById("status5").style.color = "yellow";

  } catch (err) {
    console.error("Failed to make deposit:", err);
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "Failed to make deposit";
    document.getElementById("status5").style.color = "red";
    zkerror=1;
  }

}

//Function to call the Withdraw Function
async function Withdraw() {
  // Get input values
  const A = document.getElementById("idinput").value;

  const accounts = await web3.eth.getAccounts();
  const myaddr = accounts[0];
let password=await window.ethereum.request({method: 'personal_sign',params: [SignMessage, myaddr]});
password=password.substr(2).toLowerCase();
if (password=="")  {
alert("Password is empty");
return;
}
  // Check if both to and amount are provided
  if (!A || !password) {

    alert("Identifier and password are required");
    console.error("identifier and password are required");
    return;
  }
   var mypk=await getfromZkReg(0,myaddr);
 if (mypk=="error"){
alert('Your account has not been already associated with any ZkRegistry public key');
return;
}

   const C=witness(A.substr(2),password);
  const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
 zkerror=0;
  try {
 
const encodedA = hexToBytes(A.substr(2));
const encodedC = hexToBytes(C.substr(2));
//const message = 'I like tacos and I approved of this message';
//console.log(await window.ethereum.request({
//      method: 'personal_sign',
//      params: [message, myaddr],
//}));
var ncoins="";   
await get_ncoins(encodedA).then(function(value){ ncoins= value.toString();});
    await contract.methods.MakeWithdrawalKeccac256(encodedA,myaddr,encodedC).send({from:myaddr, value:0});
    // Update status
    document.getElementById("status4").style.color = "green";
    document.getElementById("status4").innerText= "Withdrawal made successfully";
    document.getElementById("status5").innerText = "You received "+ ncoins+ "wei in your account";
    document.getElementById("status5").style.color = "green";

  } catch (err) {
    console.error("Failed to make withdrawal:", err);
    document.getElementById("status5").style.color = "red";
    document.getElementById("status4").style.color = "red";
    document.getElementById("status4").innerText = "";
    document.getElementById("status4").innerText = "Failed to make withdrawal";
    zkerror=1;
  }

}

// Event Listener for ZkReg Button
/*
document.getElementById("zkregaddressButton").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await getfromZkReg(1,"");
  }
});
*/

// Event Listener for Withdraw Button
document.getElementById("receiveButton").addEventListener("click", async () => {
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    await Withdraw();
  }
});

async function getfromZkReg(updateStatus,addr) {

  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractZkRegABI, contractZkRegAddress);

  var address="";
 if (!updateStatus) address=addr;
  else address=document.getElementById("zkregaddressinput").value;
  try {
    // Interact with Smart Contract
    //const result = await contract.methods.mint(1).send({ from: from, value: 0 });
    const _zkReg = await contract.methods.get_public_key(address).call();
    // Update status
    if (updateStatus){
    document.getElementById("status4").innerText = "ZkRegistry public key of address " + address+": "+ _zkReg;
    document.getElementById("status4").style.color = "green";
    document.getElementById("status5").innerText = "ZkRegistry public key retrieved successfully";
    document.getElementById("status5").style.color = "green";
     }
	return _zkReg;
  } catch (err) {
    console.error("Failed to retrieve public key from ZkRegistry:", err);
    if (updateStatus){
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "Failed to retrieve public key from ZkRegistry";
    document.getElementById("status5").style.color = "red";
    }
    zkerror=1;
    return "error";
  }
}

async function get_ncoins(A) {

  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);

  try {
    // Interact with Smart Contract
    const _ncoins = await contract.methods.get_ncoins(A).call();
    //console.log(_ncoins);
	return _ncoins;
  } catch (err) {
    console.error("Failed to retrieve ncoins for value "+A+":", err);
    return "error";
  }
}


function toHex(txt){
    const encoder = new TextEncoder();
    return Array
        .from(encoder.encode(txt))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}
function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length-1; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
async function ZkRegAddPK(PK) {
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];
  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractZkRegABI, contractZkRegAddress);
 zkerror=0;
  try {
    // Interact with Smart Contract
 
const encoded = hexToBytes(PK.substr(2));
   
     await contract.methods.register_public_key(encoded).send({from:from, value:0});

    // Update status
    document.getElementById("status4").innerText = "Registered public key " + PK +"into ZkRegistry";
    document.getElementById("status4").style.color = "green";
    document.getElementById("status5").innerText = "ZkRegistry public key created successfully";
    document.getElementById("status5").style.color = "green";

  } catch (err) {
    console.error("Failed to register public key into ZkRegistry:", err);
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "Failed to register public key into ZkRegistry";
    document.getElementById("status5").style.color = "red";
    zkerror=1;
  }
}
