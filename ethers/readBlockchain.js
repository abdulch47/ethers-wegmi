import ethers from "ethers"
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/49d9e455bc5c4f0cb95f452d41da9a93`);


const querryBlockchain = async () => {
    // const block = await provider.getBlockNumber();
    // console.log("Curent Block Number:", block);
    const balance = await provider.getBalance("0x76399c8A5027fD58A1D1b07500ccC8a223BEE0c3");
    console.log("Account Balance", balance);
    const balanceEth =ethers.utils.formatEther(balance);
    console.log("Account Balance In Eth", balanceEth);

};
querryBlockchain();
