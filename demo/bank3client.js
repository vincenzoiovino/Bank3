//const CHAIN_ID=5; // Goerli = 5, Sepolia = 11155111
const CHAIN_ID = 11155111; // Goerli = 5, Sepolia = 11155111
//const CHAIN="Goerli"; 
const CHAIN = "Sepolia";
var passwordSaved = [];

function addRowHandlers() {
    var rows = document.getElementById("scantable").rows;
    for (var i = 0; i < rows.length; i++) {
        rows[i].onclick = function() {
            return function() {
                var id = this.cells[0].innerHTML;
                document.getElementById("idinput").value = id;
            };
        }(rows[i]);
    }
}
const last = document.getElementById('last');
const provider = await new ethers.providers.Web3Provider(window.ethereum);

const setDots = () => {
    setTimeout(() => last.innerHTML = ".", 100);
    setTimeout(() => last.innerHTML = "..", 500);
    setTimeout(() => last.innerHTML = "...", 900);

}
const setWaitDeposit = () => {
    setTimeout(() => last.innerHTML = ".", 100);
    setTimeout(() => last.innerHTML = "Pls wait for.", 500);
    setTimeout(() => last.innerHTML = "Pls wait for confirm.", 900);
    setTimeout(() => last.innerHTML = "Pls wait for confirmation..", 1300);
    setTimeout(() => last.innerHTML = "Pls wait for confirmation of deposit...", 1700);
    setTimeout(() => last.innerHTML = "Pls wait for confirmation of deposit and save the identifier...", 2100);

}
const setWaitWithdrawal = () => {
    setTimeout(() => last.innerHTML = ".", 100);
    setTimeout(() => last.innerHTML = "Pls wait for.", 500);
    setTimeout(() => last.innerHTML = "Pls wait for confirm.", 900);
    setTimeout(() => last.innerHTML = "Pls wait for confirmation..", 1300);
    setTimeout(() => last.innerHTML = "Pls wait for confirmation of withdrawal...", 1700);

}
var waitdepositinterval = "";
var waitwithdrawalinterval = "";
var publicKey = "";

document.getElementById("instructions").addEventListener("click", async () => {
    document.getElementById("status2").style.color = "white";
    document.getElementById("status3").style.color = "white";
    document.getElementById("status4").style.color = "white";
    document.getElementById("status5").style.color = "white";
    status2.innerText = "";
    status3.innerText = "";
    status4.innerText = "";
    status5.innerText = "";
    setTimeout(() => status2.innerText = "*Connect*\nClick on", 100);
    setTimeout(() => status2.innerText = "*Connect*\nClick on \"Connect and Get Info\" to connect", 300);
    setTimeout(() => status2.innerText = "*Connect*\nClick on \"Connect and Get Info\" to connect to your Wallet and get information", 500);
    setTimeout(() => status2.innerText = "*Connect*\nClick on \"Connect and Get Info\" to connect to your Wallet and get information about yours and Bank3's accounts.", 700);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to be able", 900);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits", 1100);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register.", 1300);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\n", 1500);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\nYou will be asked to sign a special message.\n", 1700);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\nYou will be asked to sign a special message.\nThe signature of the message will be used.\n", 1900);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\nYou will be asked to sign a special message.\nThe signature of the message will be used as your secret key.\n", 2100);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\nYou will be asked to sign a special message.\nThe signature of the message will be used as your secret key. Don't sign the same message in any other app or website!", 2200);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\nYou will be asked to sign a special message.\nThe signature of the message will be used as your secret key. Don't sign the same message in any other app or website!\nFinally, you will be asked to confirm the transaction.", 2400);
    setTimeout(() => status3.innerText = "*Registration (withdrawal only)*\nIn order to ease the reception of deposits you first need to register. Click on \"Add public key to ZKRegistry\".\nYou will be asked to sign a special message.\nThe signature of the message will be used as your secret key. Don't sign the same message in any other app or website!\nFinally, you will be asked to confirm the transaction.\nAlternatively click on \"Show my public key\" to display your own public key and communicate it privately to the users who want to make deposits for you.", 2500);

    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input", 2700);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver", 2900);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver and the amount of ETH (e.g., 0.001)", 3100);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver and the amount of ETH (e.g., 0.001) you want to transfer", 3300);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver and the amount of ETH (e.g., 0.001) you want to transfer and click on \"Make deposit\" and confirm the transaction.\n", 3500);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver and the amount of ETH (e.g., 0.001) you want to transfer and click on \"Make deposit\" and confirm the transaction.\nDo not close or refresh the window. When the transaction will be onchain (it can take up to 1min)", 3700);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver and the amount of ETH (e.g., 0.001) you want to transfer and click on \"Make deposit\" and confirm the transaction.\nDo not close or refresh the window. When the transaction will be onchain (it can take up to 1min) you will get an identifier.\nThis is the receipt that you need to", 3900);
    setTimeout(() => status4.innerText = "*Deposits*\nTo make a deposit input the address of the receiver and the amount of ETH (e.g., 0.001) you want to transfer and click on \"Make deposit\" and confirm the transaction.\nDo not close or refresh the window. When the transaction will be onchain (it can take up to 1min) you will get an identifier.\nThis is the receipt that you need to share with the receiver to allow him/her to withdraw the deposit.", 4100);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier", 4300);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.", 4500);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.\nAfter each deposit or withdraw you can click on", 4700);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.\nAfter each deposit or withdraw you can click on \"Connect and Get Info\" to see your updated balance.", 4900);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.\nAfter each deposit or withdraw you can click on \"Connect and Get Info\" to see your updated balance.\n\n*Scanner*\nClick on \"Scan\"", 5100);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.\nAfter each deposit or withdraw you can click on \"Connect and Get Info\" to see your updated balance.\n\n*Scanner*\nClick on \"Scan\" for getting a list of all deposits in favour of you", 5300);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.\nAfter each deposit or withdraw you can click on \"Connect and Get Info\" to see your updated balance.\n\n*Scanner*\nClick on \"Scan\" for getting a list of all deposits in favour of you. You will be asked to sign the special message (see above) used as your secret key.", 5500);
    setTimeout(() => status5.innerText = "*Withdrawals*\nTo withdraw a deposit input the identifier, click on \"Withdraw\" and confirm the transaction.\nAfter each deposit or withdraw you can click on \"Connect and Get Info\" to see your updated balance.\n\n*Scanner*\nClick on \"Scan\" for getting a list of all deposits in favour of you. You will be asked to sign the special message (see above) used as your secret key.\nClick on an identifier in the list to copy it to the \"Withdraw\" box.", 5700);

});

var dotsinterval = setInterval(setDots, 1000);

const SignMessage = "Do not sign this message in any application different than Bank3. The signature will be used as your SECRET PASSWORD!";
const PublicKeyMessage = "Bank3: this signature will be used only to get your public key.";
// Contract Details
//const contractBankWalletsAddress = "0xf03eB7b77Efe402c6e1721a17f9527F178Fc34f8"; // contract on Goerli
// const contractBankWalletsAddress = "0x4d4F9E4A5d2e178B91d3BE81fB16D59F49099cb1"; // old contract on Sepolia
const contractBankWalletsAddress = "0xc32498817cC84236D0686D7ee449D2ADB186097B"; // contract on Sepolia
const contractBankWalletsABI = [{
        "inputs": [{
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
        "inputs": [{
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
        "inputs": [{
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
        "inputs": [{
            "internalType": "uint256",
            "name": "fees",
            "type": "uint256"
        }],
        "name": "setFees",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "fees",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
        }],
        "name": "deposits",
        "outputs": [{
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
        "inputs": [],
        "name": "Director",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Fees",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes",
            "name": "A",
            "type": "bytes"
        }],
        "name": "get_B",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes",
            "name": "A",
            "type": "bytes"
        }],
        "name": "get_ncoins",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];

//const contractZkRegAddress = "0xc32498817cC84236D0686D7ee449D2ADB186097B"; // contract on Goerli
const contractZkRegAddress = "0x4e9EAf3F2e2A1Bf76c94D041efe96B54bDC8A093"; // contract on Sepolia
const contractZkRegABI = [{
        "inputs": [],
        "name": "BBJJPK_X_INTERFACE_ID",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "BBJJPK_Y_INTERFACE_ID",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "BLS12PK_X_INTERFACE_ID",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "BLS12PK_Y_INTERFACE_ID",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "POSEIDON_INTERFACE_ID",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint8",
            "name": "interface_id",
            "type": "uint8"
        }],
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
        "inputs": [{
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
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "addr",
            "type": "address"
        }],
        "name": "get_public_key",
        "outputs": [{
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "inputs": [{
            "internalType": "bytes",
            "name": "value",
            "type": "bytes"
        }],
        "name": "register_public_key",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "registry_public_key",
        "outputs": [{
            "internalType": "bytes",
            "name": "value",
            "type": "bytes"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];



var zkerror = 0;
const web3 = new Web3(window.ethereum);
// Function to check if MetaMask is available
async function checkMetaMaskAvailability() {
    if (window.ethereum) {
        try {
            // Request access to MetaMask accounts
            await window.ethereum.request({
                method: "eth_requestAccounts"
            });
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

document.getElementById("metamask").addEventListener("click", async () => {
    const metaMaskAvailable = await checkMetaMaskAvailability();
    if (metaMaskAvailable) {
        await ConnectWallet();
        await AccountInformation();
        await BankInformation();
    } else {
        console.error("MetaMask not found");
        // Update status
        document.getElementById("status1").innerText = "MetaMask not found";
        document.getElementById("status1").style.color = "red";
    }
});
document.getElementById("plus").addEventListener("click", async () => {
    const metaMaskAvailable = await checkMetaMaskAvailability();
    if (metaMaskAvailable) {
        await ConnectWallet();
        await AccountInformation();
        await BankInformation();
    } else {
        console.error("MetaMask not found");
        // Update status
        document.getElementById("status1").innerText = "MetaMask not found";
        document.getElementById("status1").style.color = "red";
    }
});
document.getElementById("minus").addEventListener("click", async () => {

    document.getElementById("status2").innerText = "";
    document.getElementById("status3").innerText = "";
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "";
    clearInterval(waitdepositinterval);
    clearInterval(waitwithdrawalinterval);
    clearInterval(dotsinterval);
    dotsinterval = setInterval(setDots, 1000);
});

async function ConnectWallet() {
    try {
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        var chainId = "";
        await web3.eth.net.getId().then(netId => {
            chainId = netId;
        })
        if (chainId == CHAIN_ID) {
            document.getElementById("status1").innerText = "Connected to MetaMask (" + CHAIN + " Testnet)";
            document.getElementById("status1").style.color = "green";
        } else {
            document.getElementById("status1").style.color = "red";
            document.getElementById("status1").innerText = "Connected to MetaMask but not on " + CHAIN + " Testnet. Switch to " + CHAIN + " to use the dAPP. It can be necessary to restart the browser";
        }
    } catch (err) {
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
    var pk = await getfromZkReg(0, myaddr);
    console.log(pk);
    if (pk != "error" && pk != "0x") {
        if (!await swal('Yor account has been already associated with the ZkRegistry PK ' + "\"" + pk + "\"." + '\nAre you sure you want to register the public key again?', {
                buttons: [true, true],
                icon: "warning",
            })) return;
    }
    var password;
    if (passwordSaved[myaddr]) password = passwordSaved[myaddr];
    else {
        password = await window.ethereum.request({
            method: 'personal_sign',
            params: [SignMessage, myaddr]
        });
        // TODO: check if the signature representation is portable in the sense that it will stay the same independently of different or future Wallet versions. Otherwise use just the r value of the ECDSA signature
        password = password.substr(2).toLowerCase();
        passwordSaved[myaddr] = password;
    }
    if (password == "") {
        swal("Password is empty", {
            icon: "error",
        });
        return;
    }


    const metaMaskAvailable = await checkMetaMaskAvailability();
    if (metaMaskAvailable) {
        const PK = gen(password);
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
    /*
    if (publicKey==""){
    const signature=await window.ethereum.request({method: 'personal_sign',params: [PublicKeyMessage, from]});
    publicKey =await ethers.utils.recoverPublicKey(web3.eth.accounts.hashMessage(PublicKeyMessage), signature);
    publicKey =await ethers.utils.computePublicKey(publicKey,true);
    }
    */

    publicKey = await getfromZkReg(0, from);
    if (publicKey == "0x" || publicKey == "error") publicKey = "not registered yet. Click on \"Show my public key\" to display your public key.";
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "";
    // Display the account information
    document.getElementById("status2").innerText =
        "Your account address: " +
        from +
        "\nPublic key associated to your address in the ZKRegistry: " +
        publicKey +
        "\nYour Balance: " +
        balanceInEth +
        " ETH" +
        "\nGas Price: " +
        gasPriceInEth;
    document.getElementById("status2").style.color = "white";
}
async function BankInformation() {
    const from = contractBankWalletsAddress;
    try {
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
    } catch (error) {
        document.getElementById("status3").style.color = "red";
        document.getElementById("status3").innerText = "Failed to retrieve the Bank3 Balance at address " + from;
    }
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
    var to = document.getElementById("addressinput").value;
    var publickey = document.getElementById("publickeyinput").value;
    const amount = document.getElementById("amountinput").value;

    // Check if both to and amount are provided
    if (!to || !amount) {

        swal("Address and amount are required", {
            icon: "error",
        });
        console.error("To and amount are required");
        return;
    }
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    var pk;
    if (publickey == "") {
        pk = await getfromZkReg(0, to);
        if (pk == "error" || pk == "") {
            swal("Failed to retrieve the public key of address " + to + ". This can be due to the fact that the address has not been associated to a public key into the ZKRegistry.", {
                icon: "error",
            });
            return;
        }
    }
    // give possibility to use PK to make deposits
    else pk = publickey;
    //console.log(pk);

    const s = enc(pk.substr(2), to.substr(2)).split(' ');
    const A = s[0].substr(2);
    const B = s[1].substr(2);
    //console.log(to); 
    //console.log("pk: "+pk+" s:"+enc(pk.substr(2),to.substr(2))+" A:"+A+" B:"+B);
    // Convert amount to wei (1 ether = 10^18 wei)
    const amountWei = web3.utils.toWei(amount, "ether");

    document.getElementById("status2").innerText = "";
    document.getElementById("status3").innerText = "";
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "";
    const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
    zkerror = 0;
    try {

        const encodedA = hexToBytes(A);
        const encodedB = hexToBytes(B);
        clearInterval(dotsinterval);
        clearInterval(waitdepositinterval);
        clearInterval(waitwithdrawalinterval);
        waitdepositinterval = setInterval(setWaitDeposit, 2700);
        var gasUsed = 0;
        var dbErr = 0;
        try {
            await fetch('http://localhost:8080/unconfirmed/' + A)
                .then(function(response) {
                    if (!response.ok) {
                        if (response.status == 400) {
                            swal("Duplicate key in Bank3 db. This event is very rare. Try again", {
                                icon: "error",
                            });
                            dbErr = 1;
                        } else
                            swal("Bank3 db unavailable. Try later", {
                                icon: "error",
                            });
                        throw ("Bank3 db unavailable. Try later");
                    }

                });
        } catch (err) {
            if (!dbErr) {

                if (!await swal('Bank3 db currently unavailable. If you continue the receiver might not be able to find the deposit if the identifier is lost. Are you sure you want to continue?', {
                        buttons: [true, true],
                        icon: "warning",
                    }))
                    throw ("Bank3 db unavailable. Try later");

            }

        }
        var txn = "";
        await contract.methods.MakeDeposit(encodedA, encodedB).send({
            from: from,
            value: amountWei
        }).on("confirmation", function(confirmationNumber, receipt) {
            console.log("confirmationNumber", confirmationNumber);
            gasUsed = confirmationNumber.receipt.gasUsed;
            txn = confirmationNumber.receipt.transactionHash;
            try {
                fetch('http://localhost:8080/confirmed/' + A + '/' + txn.substr(2))
                    .then(function(response) {
                        console.log(response);
                    });
            } catch (err) {
                console.log(err);
            }

        });
        //console.log("gasUsed="+gasUsed+"txn="+txn);
        clearInterval(waitdepositinterval);
        clearInterval(dotsinterval);
        dotsinterval = setInterval(setDots, 1000);
        // Update status
        document.getElementById("status4").innerText = "Deposit of " + amount + " ETH in favour of " + to + " has been associated to identifier: 0x" + A;
        document.getElementById("status4").style.color = "yellow";
        document.getElementById("status5").innerText = "Gas Consumed: " + gasUsed;
        document.getElementById("status5").style.color = "yellow";

    } catch (err) {
        clearInterval(waitdepositinterval);
        clearInterval(waitwithdrawalinterval);
        clearInterval(dotsinterval);
        dotsinterval = setInterval(setDots, 1000);
        console.error("Failed to make deposit:", err);
        document.getElementById("status4").innerText = "";
        document.getElementById("status5").innerText = "Failed to make deposit";
        document.getElementById("status5").style.color = "red";
        zkerror = 1;
    }

}

//Function to call the Withdraw Function
async function Withdraw() {
    // Get input values
    const A = document.getElementById("idinput").value;
    if (!A) {

        swal("Identifier is required", {
            icon: "error",
        });
        console.error("identifier is required");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const myaddr = accounts[0];
    var password;
    if (passwordSaved[myaddr]) password = passwordSaved[myaddr];
    else {
        password = await window.ethereum.request({
            method: 'personal_sign',
            params: [SignMessage, myaddr]
        });
        password = password.substr(2).toLowerCase();
        passwordSaved[myaddr] = password;
    }
    if (password == "") {
        swal("Password is empty", {
            icon: "error",
        });
        return;
    }
    // Check if both to and amount are provided
    var mypk = await getfromZkReg(0, myaddr);
    if (mypk == "error") {
        swal('Your account has not been already associated with any ZkRegistry public key', {
            icon: "error",
        });
        return;
    }

    const C = witness(A.substr(2), password);
    const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
    zkerror = 0;
    document.getElementById("status2").innerText = "";
    document.getElementById("status3").innerText = "";
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "";
    try {

        const encodedA = hexToBytes(A.substr(2));
        const encodedC = hexToBytes(C.substr(2));
        //const message = 'I like tacos and I approved of this message';
        //console.log(await window.ethereum.request({
        //      method: 'personal_sign',
        //      params: [message, myaddr],
        //}));
        clearInterval(dotsinterval);
        clearInterval(waitdepositinterval);
        clearInterval(waitwithdrawalinterval);
        waitwithdrawalinterval = setInterval(setWaitWithdrawal, 2300);
        var ncoins = "";
        var gasUsed = 0;
        await get_ncoins(encodedA).then(function(value) {
            ncoins = value.toString();
        });
        await contract.methods.MakeWithdrawalKeccac256(encodedA, myaddr, encodedC).send({
            from: myaddr,
            value: 0
        }).on("confirmation", function(confirmationNumber, receipt) {
            console.log("confirmationNumber", confirmationNumber);
            gasUsed = confirmationNumber.receipt.gasUsed;
        });

        clearInterval(waitwithdrawalinterval);
        clearInterval(dotsinterval);
        dotsinterval = setInterval(setDots, 1000);
        // Update status
        document.getElementById("status4").style.color = "green";
        document.getElementById("status4").innerText = "You received " + web3.utils.fromWei(ncoins, "ether") + " ETH in your account";
        document.getElementById("status5").innerText = "Gas Consumed: " + gasUsed;
        document.getElementById("status5").style.color = "green";

    } catch (err) {
        clearInterval(waitwithdrawalinterval);
        clearInterval(waitdepositinterval);
        clearInterval(dotsinterval);
        dotsinterval = setInterval(setDots, 1000);
        console.error("Failed to make withdrawal:", err);
        document.getElementById("status5").style.color = "red";
        document.getElementById("status4").style.color = "red";
        document.getElementById("status4").innerText = "";
        document.getElementById("status4").innerText = "Failed to make withdrawal";
        zkerror = 1;
    }

}



document.getElementById("showpkbutton").addEventListener("click", async () => {
    const accounts = await web3.eth.getAccounts();
    const myaddr = accounts[0];
    var password;
    if (passwordSaved[myaddr]) password = passwordSaved[myaddr];
    else {
        password = await window.ethereum.request({
            method: 'personal_sign',
            params: [SignMessage, myaddr]
        });
        password = password.substr(2).toLowerCase();
        passwordSaved[myaddr] = password;
    }
    const PK = gen(password);
    document.getElementById("status2").innerText = "Your public key: " + PK;
    document.getElementById("status2").style.color = "yellow";
    document.getElementById("status3").innerText = "";
    document.getElementById("status4").innerText = "";
    document.getElementById("status5").innerText = "";
});


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


function _iswithdrawable(a, b, addr, pwd) {
    return 1;
}

document.getElementById("scanButton").addEventListener("click", async () => {
    var option = 1;
    if (document.getElementById("menu").value == "Option 1") option = 1;
    else option = 2;
    var _res;
    try {
        await fetch('http://localhost:8080/deposits')
            .then(function(response) {
                if (!response.ok) {
                    swal("Bank3 db unavailable. Try later", {
                        icon: "error",
                    });
                }
                _res = response.json();
                console.log(_res);
            });
    } catch (err) {
        swal("Bank3 db unavailable. Try later", {
            icon: "error",
        });
        document.querySelector("table tbody").innerHTML = "<tr><th></th><td></td><td></td><td></td><td></td></tr>";

    }
    var myaddr = "";
    if (_res) {
        try {
            const accounts = await web3.eth.getAccounts();
            myaddr = accounts[0];
        } catch (err) {
            swal("You first need to connect your wallet", {
                icon: "error",
            });

        }
        var password;
        if (passwordSaved[myaddr]) password = passwordSaved[myaddr];
        else {
            password = await window.ethereum.request({
                method: 'personal_sign',
                params: [SignMessage, myaddr]
            });
            password = password.substr(2).toLowerCase();
            passwordSaved[myaddr] = password;
        }
        if (password == "") {
            swal("Password is empty", {
                icon: "error",
            });
            return;
        }
        var res = await _res;
        var r;
        var t = "";
        var flag = 0;
        for (r of res) {
            var coins;
            var date;
            var sender;
            var txn;
            if (!r.txn || r.txn == "") txn = "n/a (try later)";
            if (!r.sender || r.sender == "") sender = "n/a (try later)";
            else sender = r.sender;
            if (option == 2 && sender.toLowerCase() != myaddr.toLowerCase()) continue;
            if (option == 1 && (!r.B || !myaddr || iswithdrawable(r._id, r.B, myaddr.substr(2), password) != "1")) continue;
            flag = 1;
            var tr = "<tr>";
            tr += "<th>0x" + r._id + "</th>";
            tr += "<td>" + sender + "</td>";
            if (!r.nCoins || r.nCoins == -1)
                tr += "<td>n/a (try later)</td>";
            else if (r.UpdatednCoins && r.UpdatednCoins != r.nCoins)
                tr += "<td>" + web3.utils.fromWei(r.nCoins, "ether") + " (already claimed)</td>";
            else tr += "<td>" + web3.utils.fromWei(r.nCoins, "ether") + "</td>";
            tr += "<td>" + new Date(r.date).toLocaleString() + "</td>";
            if (r.txn == "") tr += "<td>n/a</td>";
            else tr += "<td>" + "<a href=\"https://" + CHAIN + ".etherscan.io/tx/0x" + r.txn + "\"target=\"_blank\">" + r.txn + "</a>" + "</td>";
            tr += "</tr>";
            t += tr;
        }
        if (flag) {
            document.querySelector("table tbody").innerHTML = t;
            addRowHandlers();
        } else document.querySelector("table tbody").innerHTML = "<tr><th></th><td></td><td></td><td></td><td></td></tr>";
    }
});






async function getfromZkReg(updateStatus, addr) {

    // Instantiate a new Contract
    const contract = new web3.eth.Contract(contractZkRegABI, contractZkRegAddress);

    var address = "";
    if (!updateStatus) address = addr;
    else address = document.getElementById("zkregaddressinput").value;
    try {
        const _zkReg = await contract.methods.get_public_key(address).call();
        // Update status
        if (updateStatus) {
            document.getElementById("status4").innerText = "ZkRegistry public key of address " + address + ": " + _zkReg;
            document.getElementById("status4").style.color = "green";
            document.getElementById("status5").innerText = "ZkRegistry public key retrieved successfully";
            document.getElementById("status5").style.color = "green";
        }
        return _zkReg;
    } catch (err) {
        console.error("Failed to retrieve public key from ZkRegistry:", err);
        if (updateStatus) {
            document.getElementById("status4").innerText = "";
            document.getElementById("status5").innerText = "Failed to retrieve public key from ZkRegistry";
            document.getElementById("status5").style.color = "red";
        }
        zkerror = 1;
        return "error";
    }
}

async function get_ncoins(A) {

    // Instantiate a new Contract
    const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);

    try {
        const _ncoins = await contract.methods.get_ncoins(A).call();
        //console.log(_ncoins);
        return _ncoins;
    } catch (err) {
        console.error("Failed to retrieve ncoins for value " + A + ":", err);
        return "error";
    }
}


function toHex(txt) {
    const encoder = new TextEncoder();
    return Array
        .from(encoder.encode(txt))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length - 1; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
async function ZkRegAddPK(PK) {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    // Instantiate a new Contract
    const contract = new web3.eth.Contract(contractZkRegABI, contractZkRegAddress);
    zkerror = 0;
    try {

        const encoded = hexToBytes(PK.substr(2));

        await contract.methods.register_public_key(encoded).send({
            from: from,
            value: 0
        });

        // Update status
        document.getElementById("status4").innerText = "Registered public key " + PK + "into ZkRegistry";
        document.getElementById("status4").style.color = "green";
        document.getElementById("status5").innerText = "ZkRegistry public key created successfully";
        document.getElementById("status5").style.color = "green";

    } catch (err) {
        console.error("Failed to register public key into ZkRegistry:", err);
        document.getElementById("status4").innerText = "";
        document.getElementById("status5").innerText = "Failed to register public key into ZkRegistry";
        document.getElementById("status5").style.color = "red";
        zkerror = 1;
    }
}

// TODO: implement a function that periodically cycles over all confirmed transactions and update them if they are withdrawn (the amount of coins changed to 0)
