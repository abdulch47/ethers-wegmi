import { useState } from "react";
import { ethers } from "ethers";
import { UniswapV2Router } from "@uniswap/v2-periphery";
import { ADDRESS_ZERO } from "./constants";
import ERC20ABI from "./ERC20.json";

// Set up provider, signer, and contract instances
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const routerAddress = '<your_router_contract_address>';
const router = new UniswapV2Router(routerAddress, provider);
const factory = router.factory;

function App() {
  const [amountIn, setAmountIn] = useState("");
  const [amountOutMin, setAmountOutMin] = useState("");
  const [tokenInAddress, setTokenInAddress] = useState("");
  const [tokenOutAddress, setTokenOutAddress] = useState("");
  const [slippagePercentage, setSlippagePercentage] = useState(1);
  const [txHash, setTxHash] = useState("");

  const handleSwap = async () => {
    try {
      const amountInParsed = ethers.utils.parseUnits(amountIn, '<input_token_decimals>');
      const amountOutMinParsed = ethers.utils.parseUnits(amountOutMin, '<output_token_decimals>');
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

      // Set up path (if swapping through multiple pairs)
      const path = [tokenInAddress, tokenOutAddress];

      // Set up gas options
      const gasLimit = 500000; // Adjust to your needs
      const gasPrice = await provider.getGasPrice(); // or set a fixed gas price

      // Set up transaction options
      const transactionOptions = {
        gasLimit,
        gasPrice,
        deadline,
      };

      // Approve router to spend input token
      const tokenIn = new ethers.Contract(tokenInAddress, ERC20ABI, signer);
      await tokenIn.approve(routerAddress, amountInParsed);

      // Call swapExactTokensForTokensSupportingFeeOnTransferTokens
      const pair = await provider.getUncheckedSigner().getContractAddress({
        from: ADDRESS_ZERO,
        nonce: await provider.getTransactionCount(await provider.getSigner().getAddress(), 'pending'),
      });
      const pairAddress = await factory.getPair(tokenInAddress, tokenOutAddress);
      const pairContract = new ethers.Contract(pairAddress, IUniswapV2PairABI, signer);
      const { reserve0, reserve1 } = await pairContract.getReserves();
      const amountOut = await router.getAmountOut(amountInParsed, reserve0, reserve1);
      const amountOutWithSlippage = amountOut.mul(
        ethers.utils.parseUnits('1', 'ether').sub(
          ethers.utils.parseUnits(slippagePercentage.toString(), 'ether')
        )
      );
      const tx = await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        amountInParsed,
        amountOutWithSlippage,
        path,
        pair,
        deadline,
        transactionOptions
      );
      setTxHash(tx.hash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Uniswap V2 Router Example</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSwap();
      }}>
        <label>
          Amount In:
          <input type="text" value={amountIn} onChange={(event) => setAmountIn(event
