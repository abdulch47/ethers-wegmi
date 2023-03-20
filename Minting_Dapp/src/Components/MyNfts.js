import React, { useState, useEffect } from "react";
import {useAccount} from 'wagmi'
import axios from "axios";
import { ethers } from "ethers";
import { TbArrowBackUp } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const MyNfts = () => {
  const [show, setShow] = useState();
  
  const {isConnected } = useAccount()

  

  useEffect(() => {
    if (isConnected) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          
          axios
            .get(
              "https://deep-index.moralis.io/api/v2/"+ result[0] +"/nft?chain=mumbai&format=decimal&token_addresses%5B0%5D=0xb1E61eE9495577969eb6a1A3e6CE0899BC2421f6",{
                headers: {
                  accept: "application/json",
                  "X-API-Key":
                    "EKCGcAtwCHT6hJkhRVEwwWf4XyNoAnRaqKi902XXalVoGcLLMkxI8zB6E39d5I0l",
                },
              }
            )
            .then((res) => {
              setShow(res.data.result);
              console.log(show);
            });
        });
    } else {
      setShow([]);
      console.log("Connect MetaMask Please");
    }
  }, [isConnected]);

  return (
    <>
    <div className="text-white flex justify-between sm:mx-8 mx-4 my-2 bg-[#1e1e1e] py-2">
    <Link to="/mint">
      <h1 className="my-auto text-gray-300 text-lg flex gap-2">
        <TbArrowBackUp className="my-auto" />
        Back
      </h1>
    </Link>

  </div>
    <div className="bg-[#1e1e1e] h-full">
    
      

      <h1 className="text-center text-[#c0cfc7] mt-20 text-[35px] bg-[#1e1e1e]">
        My NFTS
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center my-10">
   
        {show?.map((item, index) => (
          <div key={index}>
            <div className="bg-[#c0cfc7] sm:h-[325.25px] sm:w-[325.25px] h-[300px] w-[300px] mx-auto my-2" />

            <h1 className="text-[#c0cfc7] opacity-[70%] text-center text-lg">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
</>  );
};

export default MyNfts;
