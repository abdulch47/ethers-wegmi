//0x40bE1947e10E6D3E85A152C366551F5CD657862b
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/49d9e455bc5c4f0cb95f452d41da9a93`);
 const walletAddress = "0x40bE1947e10E6D3E85A152C366551F5CD657862b";
 const walletAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "accountBalance",
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
		"inputs": [],
		"name": "getContractBalance",
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
		"inputs": [],
		"name": "getvalue",
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
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "num",
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
				"name": "user",
				"type": "address"
			}
		],
		"name": "sendEth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setvalue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractInteraction =async()=>{
    const walletContract = new ethers.Contract(walletAddress, walletAbi, provider);
    const contractName = await walletContract.name();
    console.log("Contract Name:", contractName);
    const num = await walletContract.getvalue();
    console.log("Number Value:", num);
    const contractBalance = await walletContract.getContractBalance();
    const balanceEth =ethers.utils.formatEther(contractBalance);
    console.log("Account Balance In Eth", balanceEth);
    const userBalance = await walletContract.accountBalance("0x76399c8A5027fD58A1D1b07500ccC8a223BEE0c3");
    const balEthUser =ethers.utils.formatEther(userBalance);
    console.log("Account Balance In Eth", balEthUser);


}

contractInteraction();


