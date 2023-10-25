const UpdateDb =  () =>{
var coins;
  db.collection('bank3').find({isConfirmed: true}).toArray( async (err, result) => {
    if (err) return console.log(err);
if (result){
var res=await result;
for (r of res){
const encodedA = await hexToBytes(r._id);
await get_ncoins(encodedA).then(function(value){
coins=value.toString();
console.log("For A:"+r._id+" called get_ncoins that returned: "+coins);
const myquery = { _id: r._id };
const newvalues = { $set: {nCoins:coins } };
  db.collection('bank3').update(myquery, newvalues, (err, result) => {
    if (err) {
     console.log(err);
    return;
    }
  });


});

}
}
  });

}
async function run(){


setInterval(UpdateDb, 8000);

// add a document to the DB collection recording the uncofirmed A
app.get('/unconfirmed/:A', (req, res) => {
  const deposit= {_id: req.params.A,isConfirmed:false,nCoins:-1,date:Date.now(),txn:""};
  console.log(req.params.A);
  console.log("unonfirmed");

  db.collection('bank3').insertOne(deposit, (err, result) => {
    if (err) {
     console.log(err);
 res.status(400).json({
            success: false,
            error: err.message
        });
    return;
    }
    console.log('deposit added to db:'+result);
    res.send("ok");
  });
});
// add a document to the DB collection recording the cofirmed A
app.get('/confirmed/:A/:txn', async (req, res) => {
  console.log(req.params.A);
  console.log(req.params.txn);
// check if req.params.A is confirmed and gets corresponding B, nCoins and possibly sender of the transaction txn
// TODO: add sender
const encodedA = await hexToBytes(req.params.A);
var B="";
var coins="";
get_B(encodedA).then(function(value){
B=value.toString();

if (B=="0x0000000000000000000000000000000000000000000000000000000000000000") {
     console.log("unconfirmed value A not present onchain");
const myquery = { _id: req.params.A };
db.collection('bank3').deleteOne(myquery, function(err, result) {
    if (err) console.log(err); // removal failed, we should retry later
    console.log("entry deleted:"+req.params.A);
  });
 res.status(400).json({
            success: false,
            error: "unconfirmed value A not present onchain"
        });
    return;
    }
  console.log("confirmed with B:"+B);
const myquery = { _id: req.params.A };
const newvalues = { $set: {isConfirmed: true,sender:"", B: B,date:Date.now(),txn:req.params.txn } };
  db.collection('bank3').update(myquery, newvalues, (err, result) => {
    if (err) {
     console.log(err);


 res.status(400).json({
            success: false,
            error: err.message
        });
    return;
    }
    console.log('deposit confirmed into db:'+result);
    res.send("ok");
  });


});
await get_ncoins(encodedA).then(function(value){
coins=value.toString();
console.log("For A:"+req.params.A+" called get_ncoins that returned: "+coins);
const myquery = { _id: req.params.A };
const newvalues = { $set: {nCoins:coins } };
  db.collection('bank3').update(myquery, newvalues, (err, result) => {
    if (err) {
     console.log(err);
// here we have two cases: 1) it fails because the transaction was not confirmed and so the entry was deleted. 2)it  fails for other reasons, in this case should keep on retrying later
    return;
    }
    console.log('updated coins confirmed into db');
  });


});

});


app.get('/deposits', (req, res) => {

  db.collection('bank3').find({isConfirmed: true}).toArray((err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.send(result);
  });
});

}
const contractBankWalletsAddress = "0xC14fdB467Cc1a2C7337B9bDfDC84970E98936796"; // currently on Goerli, switch to Sepolia in the future
const contractBankWalletsABI= [
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
			}
		],
		"name": "get_B",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
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
	}
];

const INFURA_KEY=`https://goerli.infura.io/v3/718b6870be174fa7a36d71442baee8e7`;

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const nocache = require('nocache');
const cors = require('cors');
const { Web3 } = require("web3");
app.use(nocache());
app.use(cors());

// connect to the db and start the express server
let db;
// ***Replace the URL below with the URL for your database***
const url =  'mongodb://localhost:27017/bank3';

 MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
  console.log('listening on 8080');
  });
});
console.log('Bank3 server-side code running');
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(INFURA_KEY,
    ),
  );


/* Test
web3.eth
    .getBlockNumber()
    .then(function (blockNumber) {
        console.log('Test: Get Current block number:', blockNumber);
    })
    .catch(function (error) {
        console.log('Error:', error);
        return;
    });
*/

run();

async function get_B(A) {
    
  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
  
  try {
    // Interact with Smart Contract
    const B = await contract.methods.get_B(A).call();
    console.log("B="+B);
        return B;
  } catch (err) {
    console.error("Failed to retrieve B for value "+A+":", err);
    return "error";
  }
} 

async function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length-1; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
async function get_ncoins(A) {

  // Instantiate a new Contract
  const contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);

  try {
    // Interact with Smart Contract
    const _ncoins = await contract.methods.get_ncoins(A).call();
	return _ncoins;
  } catch (err) {
    console.error("Failed to retrieve ncoins for value "+A+":", err);
    return "error";
  }
}


