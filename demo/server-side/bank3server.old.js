// this version works with mongodb@2.2.19
// TODO: scanner based on new transactions onchain.
//const contractBankWalletsAddress = "0xf03eB7b77Efe402c6e1721a17f9527F178Fc34f8"; // old contract on Goerli
//const contractBankWalletsAddress = "0xc32498817cC84236D0686D7ee449D2ADB186097B"; // old contract on Sepolia
var PORT = 8081;
const contractBankWalletsAddress = "0x06bBC56579D73d7E5C556f67D5c2D3eE66a79EA7"; // contract on Sepolia
const contractBankWalletsABI = [{
        "inputs": [{
            "internalType": "uint256",
            "name": "fees",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
        "name": "get_all",
        "outputs": [{
            "components": [{
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
            "internalType": "struct BankWallet.Deposit",
            "name": "",
            "type": "tuple"
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
    }
];

//const CHAIN="goerli";
const CHAIN = "sepolia";
async function UpdateDb() {
    var contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
    var coins = [];
    db.collection('bank3').find({}).toArray(async (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!result) return;
        var r;
        var encodedA;
        for (r of result) {
            encodedA = hexToBytes(r._id);
            await contract.methods.get_all(encodedA).call().then(function(s) {
                //console.log(s);
                var B = s.B;
                var ncoins = s.nCoins;
                if (r.isConfirmed == true && r.nCoins == ncoins) {
                    console.log("update request for A:" + r._id + " exiting with no change because r.nCoins=" + r.nCoins + " and onchain nCoins=" + ncoins);
                    return;
                }
                if (B == "error") {
                    console.log("update request for A:" + r._id + " unable to get corresponding B");
                    return;
                }
                if (B == "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    console.log("update request for A:" + r._id + " getting corresponding B=0");
                    const myquery = {
                        _id: r._id
                    };
                    /* TODO: after many tries we should delete the entry                   
                         db.collection('bank3').deleteOne(myquery, function(err, result) {
                        if (err) console.log(err); // removal failed, we should retry later
                        console.log("entry deleted:" + r._id);
                    });
		    */
                    return;
                }
                console.log("update request for A:" + r._id + " corresponding to B: " + B + " and nCoins: " + ncoins);
                const myquery = {
                    _id: r._id
                };
                var coins = "";
                if (r.UpdatednCoins && r.UpdatednCoins != "" && (r.UpdatednCoins != ncoins)) coins = r.UpdatednCoins;
                else coins = r.nCoins;
                const newvalues = {
                    $set: {
                        isConfirmed: true,
                        B: s.B.substr(2),
                        UpdatednCoins: "" + ncoins,
                        nCoins: "" + coins,
                    }
                };
                db.collection('bank3').update(myquery, newvalues, (err, result) => {
                    if (err) {
                        console.log(err);


                        return;
                    }
                    console.log('deposit update into db');
                });
            });
        }



    });


}
async function run() {



    // add a document to the DB collection recording the uncofirmed A
    app.get('/unconfirmed/:A', (req, res) => {
        const deposit = {
            _id: req.params.A,
            isConfirmed: false,
            nCoins: "-1",
            date: Date.now(),
            txn: "",
        };
        console.log("unonfirmed request for " + req.params.A);

        db.collection('bank3').insertOne(deposit, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    success: false,
                    error: err.message
                });
                return;
            }
            console.log('deposit added to db');
            res.send("ok");
        });
    });
    // add a document to the DB collection recording the confirmed A
    app.get('/confirmed/:A/:txn', async (req, res) => {
        var contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
        try {
            console.log("confirmed request for A:" + req.params.A + " and txn:" + req.params.txn);
            const encodedA = await hexToBytes(req.params.A);
            var B = "";
            var coins = "";
            var tx = await web3.eth.getTransaction("0x" + req.params.txn);
            var bn = tx.blockNumber;
            await contract.methods.get_all(encodedA).call(null, bn).then(function(value, error) {
                if (error) {
                    console.log(error);
                    return;
                }
                B = value.B.toString();
                if (B == "error") {
                    console.log("confirmed request for A:" + req.params.A + " unable to get corresponding B for transaction txn:" + tx + " in bn:" + bn);
                    return;
                }
                if (B == "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    console.log("confirmed request for A:" + req.params.A + " getting corresponding B=0 for transaction txn:" + tx + " in bn:" + bn);
                    const myquery = {
                        _id: req.params.A
                    };
                    db.collection('bank3').deleteOne(myquery, function(err, result) {
                        if (err) console.log(err); // removal failed, we should retry later
                        console.log("entry deleted:" + req.params.A);
                    });
                    res.status(400).json({
                        success: false,
                        error: "unconfirmed value A not present onchain"
                    });
                    return;
                }
                // from now we can assume that there exists and there will exist one and only one transaction onchain with value A=req.params.A
                console.log("confirmed request for A:" + req.params.A + " corresponding to B: " + value.B + " and nCoins: " + value.nCoins + " for transaction txn:" + tx + " in bn:" + bn);
                const myquery = {
                    _id: req.params.A
                };
                const newvalues = {
                    $set: {
                        isConfirmed: true,
                        sender: tx.from,
                        B: value.B.substr(2),
                        nCoins: value.nCoins.toString(),
                        UpdatednCoins: "",
                        date: Date.now(),
                        blockNumber: "" + bn,
                        txn: req.params.txn,
                    }
                };
                db.collection('bank3').update(myquery, newvalues, (err, result) => {
                    if (err) {
                        console.log(err);


                        res.status(400).json({
                            success: false,
                            error: err.message
                        });
                        return;
                    }
                    console.log('deposit confirmed into db for value ' + req.params.A);
                    res.send("ok");
                });
            });
        } catch (err) {}
    });


    app.get('/deposits', (req, res) => {

        db.collection('bank3').find({
            isConfirmed: true
        }).toArray((err, result) => {
            if (err) return console.log(err);
            //console.log(result);
            res.send(result);
        });
    });
}

const KEY = "https://" + CHAIN + ".infura.io/v3/89235f1ec0f84511ade8dcf9aa9529f1"; // infura api key
//const KEY = "https://eth-goerli.g.alchemy.com/v2/PgVwse_L8RTZIig5vGWjG5gYYVPFfZ2w"; // alchemy api key

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const nocache = require('nocache');
const cors = require('cors');
const {
    Web3
} = require("web3");
app.use(nocache());
app.use(cors());

// connect to the db and start the express server
let db;
// ***Replace the URL below with the URL for your database***
const url = 'mongodb://localhost:27017/bank3';

MongoClient.connect(url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
    // start the express web server listening on PORT
    app.listen(PORT, () => {
        console.log('listening on ' + PORT);
    });
});
console.log('Bank3 server-side code running');
// Configuring the connection to an Ethereum node
const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
    new Web3.providers.HttpProvider(KEY, network),
);




function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length - 1; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

run();
setInterval(UpdateDb, 8000);
