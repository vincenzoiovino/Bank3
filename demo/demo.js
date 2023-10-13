// Contract Details
const contractBankWalletsAddress = "0x5a2a8b05d1af80f01b558Ef925d2f65DFec7265d";
const contractBankWalletsABI= 
[
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "A",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "B",
				"type": "bytes"
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
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"name": "setFees",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"internalType": "bytes",
				"name": "B",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
let password = document.getElementById("password").value;
if (password=="")  {
alert("Password is empty");
return;
}


  const accounts = await web3.eth.getAccounts();
  const myaddr = accounts[0];
   var pk=await getfromZkReg(0,myaddr);
 if (pk!="error"){
if (!confirm('Your account has been already associated with the ZkRegistry PK ' +"\"" +pk +"\"."+'\nAare you sure you want to register a new public key?')) return;

}
           //alert('= ' + enc('03C13107C9BA34C0B4C0DEF020DF9AC57A30A3831B584DF662477AC1FFF659A03C','03C13107C9BA34C0B4C0DEF020DF9AC57A30A3831B584DF662477AC1FFF659A03C'));
  const metaMaskAvailable = await checkMetaMaskAvailability();
  if (metaMaskAvailable) {
    //await AccountInformation();
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
    "Account Address: " +
    from +
    "\nBalance: " +
    balanceInEth +
    " ETH" +
    "\nGas Price: " +
    gasPriceInEth;
  document.getElementById("status2").style.color = "white";
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

   const pk=await getfromZkReg(0,to);
   const s=enc(pk,to).split(' ');
   const A=s[0].substr(2);
   const B=s[1].substr(2);
alert(A+ "-"+B);  
// Convert amount to wei (1 ether = 10^18 wei)
  const amountWei = web3.utils.toWei(amount, "ether");
  
  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];
  const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
 zkerror=0;
  try {
 
const encodedA = hexToBytes(A);
const encodedB = hexToBytes(B);
    await contract.methods.MakeDeposit(encodedA,encodedB).send({from:from, value:amountWei});
    // Update status
    document.getElementById("status2").innerText = "Deposit of " + amountWei +"wei in favour of" +to+" has been associated to identifier: 0x"+ A;
    document.getElementById("status2").style.color = "green";
    document.getElementById("status3").innerText = "Deposit made successfully";
    document.getElementById("status3").style.color = "green";

  } catch (err) {
    console.error("Failed to make deposit:", err);
    document.getElementById("status2").innerText = "";
    document.getElementById("status3").innerText = "Failed to make deposit";
    document.getElementById("status3").style.color = "red";
    zkerror=1;
  }

}

//Function to call the Withdraw Function
async function Withdraw() {
  // Get input values
  const A = document.getElementById("idinput").value;

let password = document.getElementById("passwordinput2").value;
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
  const accounts = await web3.eth.getAccounts();
  const myaddr = accounts[0];
   var mypk=await getfromZkReg(0,myaddr);
 if (mypk=="error"){
alert('Your account has not been already associated with any ZkRegistry public key');
return;
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

  // Converts wei to Ether this currently is unused, 
  // but if an NFT requires payment, you can use this as the argument to "value"
  const valueWei = web3.utils.toWei("1", "gwei");
  var address="";
 if (!updateStatus) address=addr;
  else address=document.getElementById("zkregaddressinput").value;
  try {
    // Interact with Smart Contract
    //const result = await contract.methods.mint(1).send({ from: from, value: 0 });
    const _zkReg = await contract.methods.get_public_key(address).call();
    // Update status
    if (updateStatus){
    document.getElementById("status2").innerText = "ZkRegistry public key of address " + address+": "+ _zkReg;
    document.getElementById("status2").style.color = "green";
    document.getElementById("status3").innerText = "ZkRegistry public key retrieved successfully";
    document.getElementById("status3").style.color = "green";
     }
	return _zkReg;
  } catch (err) {
    console.error("Failed to retrieve public key from ZkRegistry:", err);
    if (updateStatus){
    document.getElementById("status2").innerText = "";
    document.getElementById("status3").innerText = "Failed to retrieve public key from ZkRegistry";
    document.getElementById("status3").style.color = "red";
    }
    zkerror=1;
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
    document.getElementById("status2").innerText = "Registered public key " + PK +"into ZkRegistry";
    document.getElementById("status2").style.color = "green";
    document.getElementById("status3").innerText = "ZkRegistry public key created successfully";
    document.getElementById("status3").style.color = "green";

  } catch (err) {
    console.error("Failed to register public key into ZkRegistry:", err);
    document.getElementById("status2").innerText = "";
    document.getElementById("status3").innerText = "Failed to register public key into ZkRegistry";
    document.getElementById("status3").style.color = "red";
    zkerror=1;
  }
}
