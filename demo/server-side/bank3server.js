const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const nocache = require('nocache');
const cors = require('cors');
const {
    Web3
} = require("web3");

//const CHAIN="goerli";
const CHAIN = "sepolia";
const KEY = "https://" + CHAIN + ".infura.io/v3/89235f1ec0f84511ade8dcf9aa9529f1"; // infura api key
//const KEY = "https://eth-goerli.g.alchemy.com/v2/PgVwse_L8RTZIig5vGWjG5gYYVPFfZ2w"; // alchemy api key

// Configuring the connection to an Ethereum node
const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
    new Web3.providers.HttpProvider(KEY, network),
);

app.use(nocache());
app.use(cors());

// connect to the db and start the express server
// ***Replace the URL below with the URL for your database***
const url = 'mongodb://127.0.0.1:27017/bank3';
const client = new MongoClient(url);
let db;

async function db_connect() {
    console.log('Connecting to MongoDB');
    try {
        await client.connect();

        db = client.db();
        console.log('Connected to MongoDB');

        /* Test, if you need it
        databasesList = await db.admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        */

        // start the express web server listening on 8000
        app.listen(8000, () => {
            console.log('Listening on 8000');
        });

        console.log('Bank3 server-side code running');
    } catch (e) {
        console.error(e);
    }


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
}

// TODO: scanner based on new transactions onchain.
//const contractBankWalletsAddress = "0xf03eB7b77Efe402c6e1721a17f9527F178Fc34f8"; // old contract on Goerli
//const contractBankWalletsAddress = "0xc32498817cC84236D0686D7ee449D2ADB186097B"; // old contract on Sepolia
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

async function UpdateDb() {
    var contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
    var coins = [];

    //let totaldocs = await db.collection('bank3').countDocuments();
    //console.log("UDB", "Document#: " + totaldocs);

    try {
        let alldocs = await db.collection('bank3').find({isFinalized: false}).toArray();

        alldocs.forEach(function(doc) {
            let encodedA = hexToBytes(doc._id);
            contract.methods.get_all(encodedA).call().then(function(contractData) {
                const myquery = {
                    _id: doc._id
                };
                let coins = doc.nCoins;

                var bData = contractData.B;
                if (bData === "error" || bData === "0x0000000000000000000000000000000000000000000000000000000000000000") return;

                var ncoins = contractData.nCoins;
                if (doc.isConfirmed === true && doc.nCoins === ncoins) return;
		var isfinalized=false;
                if (doc.UpdatednCoins && (doc.UpdatednCoins != "") && (doc.UpdatednCoins != ncoins)) {
                    coins = doc.UpdatednCoins;
		    isfinalized=true;
                }

                const newvalues = {
                    $set: {
                        isConfirmed: true,
                        B: bData.substr(2),
                        UpdatednCoins: "" + ncoins,
                        nCoins: "" + coins,
			isFinalized: isfinalized,
                    }
                };

                db.collection('bank3').updateOne(myquery, newvalues).then(function(result) {
                    if (result.modifiedCount !== 0) {
                        console.log("UDB", "Update request for ID:" + doc._id + " corresponding to B: " + bData + " and nCoins: " + ncoins);
                        console.log("UDB", `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
                    }
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function start_server() {
    // add a document to the DB collection recording the uncofirmed A
    app.get('/unconfirmed/:A', async (req, res) => {
        // For upsert (currently faulty
        //const options = { upsert: true };
        //const filter = { _id: req.params.A };
        if ((await db.collection('bank3').countDocuments({
                _id: req.params.A
            })) !== 0) {
            res.send("ok").status(200);
        } else {

            const deposit = {
                _id: req.params.A,
                isConfirmed: false,
                isFinalized: false,
                nCoins: "-1",
                date: Date.now(),
                txn: "",
            };
            console.log("unconfirmed request for " + req.params.A);

            // For upsert (currently faulty
            //db.collection('bank3').updateOne(filter, deposit, options, (err, result) => {
            await db.collection('bank3').insertOne(deposit, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        success: false,
                        error: err.message
                    });
                    return;
                }
                console.log('deposit added to db:' + result);
            });
            res.send("ok").status(200);
        }
    });

    // add a document to the DB collection recording the confirmed A
    app.get('/confirmed/:A/:txn', async (req, res) => {
        if ((await db.collection('bank3').countDocuments({
                _id: req.params.A
            })) === 0) {
            res.send("no unconfirmed found").status(200);
        } else {
            var contract = new web3.eth.Contract(contractBankWalletsABI, contractBankWalletsAddress);
            try {
                console.log("confirmed request for A:" + req.params.A + " and txn:" + req.params.txn);
                const encodedA = await hexToBytes(req.params.A);
                var B = "";
                var coins = "";
                var tx = await web3.eth.getTransaction("0x" + req.params.txn);
                var bn = tx.blockNumber;
                await contract.methods.get_all(encodedA).call(null, bn).then(async function(value, error) {
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
                        db.collection('bank3').deleteOne(myquery, function(err, _) {
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
                            isFinalized: false,
                            sender: tx.from,
                            B: value.B.substr(2),
                            nCoins: value.nCoins.toString(),
                            UpdatednCoins: "",
                            date: Date.now(),
                            blockNumber: "" + bn,
                            txn: req.params.txn,
                        }
                    };
                    db.collection('bank3').updateOne(myquery, newvalues).then((result) => {
                        console.log('deposit confirmed into db:' + result);
                        res.send("ok").status(200);
                    }).catch((err) => {
                        if (err) {
                            console.log("Error:" + err);

                            res.status(400).json({
                                success: false,
                                error: err.message
                            });
                            return;
                        }


                    });
                });
            } catch (err) {
                console.log(err);
            }
        }
    });

    app.get('/deposits', async (req, res) => {
        if ((await db.collection('bank3').countDocuments({
                isConfirmed: true
            })) === 0) {
            console.log("No documents found!");
            res.send('[{}]').status(200);
        } else {
            thedata = await db.collection('bank3').find({
                isConfirmed: true
            }).toArray((err, result) => {
                if (err) {
                    console.log("Error:" + err);

                    res.status(400).json({
                        success: false,
                        error: err.message
                    });
                }
            });
            res.send(thedata).status(200);
        }
    });
}

function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length - 1; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

db_connect();
start_server();

setInterval(UpdateDb, 8000);
