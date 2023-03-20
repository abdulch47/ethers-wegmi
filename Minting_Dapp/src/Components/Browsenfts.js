import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { CiCircleInfo } from "react-icons/ci";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import axios from "axios";
import MyToken from "./Contractabi/MyToken.json";
import { ethers } from "ethers";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MarketPlace } from "./Contractabi/contractaddress";
import Display from "../Display";
import { Link } from "react-router-dom";



const BrowseNFTS = () => {
    const notify = () => toast("Clicked!");
  const [show, setShow] = useState();
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tempAdd, setTempAdd] = useState("");
  const { data: signer } = useSigner();
  const [nav, setNav] = useState(true);



  let totalCount;
  let contract;

  if (signer) {
    contract = new ethers.Contract(MarketPlace, MyToken, signer);
  }
  const moralisCall = async () => {
    try {
      await axios
        .get(
          "https://deep-index.moralis.io/api/v2/nft/0xb1E61eE9495577969eb6a1A3e6CE0899BC2421f6/" +
            count +
            "/owners?chain=mumbai&format=decimal",

          {
            headers: {
              accept: "application/json",
              "X-API-Key":
                "EKCGcAtwCHT6hJkhRVEwwWf4XyNoAnRaqKi902XXalVoGcLLMkxI8zB6E39d5I0l",
            },
          }
        )
        .then(async (res) => {
          setShow(await res.data.result[0]);
          setName(await res.data.result[0].name);

          setTempAdd(await signer.getAddress());
          setAddress(await res.data.result[0].owner_of);
          console.log(tempAdd);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    moralisCall();
  }, [count]);
  const onUppClickHandeler = async () => {
    notify();
    totalCount = await contract.totalSupply();

    totalCount = ethers.utils.formatUnits(totalCount, "wei");
    if (count != totalCount - 1) {
      setCount(0);

      setCount(count + 1);
    }
  };

  const onDownClickHandeler = async () => {
   notify();
    if (count <=1 ) {
        setAddress("");
        setName("");
      }

     else {
      setCount(count - 1);
    }
  };

  return (
    <>
     {/* ******Header********* */}
     <div className="text-white flex justify-between px-6 mt-4 bg-[#1e1e1e] py-2">
        <h1 className=" text-gray-300 text-[26px]  ">Logo</h1>
        <div className="flex ">
          <ul className="flex gap-10">
          <Link to="/">
              <li className="">
                <CiCircleInfo className="hidden sm:block my-auto opacity-[10%]" size={40} />
              </li>
            </Link>
            <Link to="/browse">
              <li className="  text-gray-300 opacity-[100%] text-[26px]">
                NFTS
              </li>
            </Link>
            <Link to="/mint">
              <li className=" hidden sm:block text-gray-300 opacity-[10%] text-[26px] ">
                Mint
              </li>
            </Link>
           
           
          </ul>

          <div onClick={() => setNav(!nav)} className="block md:hidden">
            {!nav ? (
              <AiOutlineClose size={30} />
            ) : (
              <FiChevronDown size={30} className="mt-2 -ml-8" />
            )}
          </div>
          <div
            className={
              !nav
                ? "fixed left-0 top-0 w-[30%] border-r h-40 bg-black ease-in-out duration-500"
                : "fixed left-[100%]"
            }
          >
            <ul className=" gap-10">
            <Link to="/">
                <li className="p-4 uppercase font-bold "><CiCircleInfo size={40}/></li>
              </Link>
              <Link to="/mint">
                <li className="p-4 uppercase font-bold ">Mint</li>
              </Link>

             
            </ul>
          </div>
        </div>
        <Display />
      </div>
      <div className="bg-[#1e1e1e] h-screen">
      <ToastContainer />
        <div className="flex gap-10 my-10 justify-center sm:ml-24 ml-0">
          <div>
            <div className="bg-[#c0cfc7] h-[231.89px] w-full sm:px-28 px-20 mx-auto my-10"></div>
          </div>
          <div className="my-auto">
            {count ? (
              <button className="bg-[#c0cfc7] opacity-[70%] w-[63px] h-[67px] p-2 my-2 hover:">
                <BsFillCaretUpFill size={50} onClick={onUppClickHandeler} />
              </button>
            ) : (
              <button className="bg-[#c0cfc7] opacity-[10%] w-[63px] h-[67px] p-2 my-2 hover:">
                <BsFillCaretUpFill size={50} onClick={onUppClickHandeler} />
              </button>
            )}
            <br />
            {count ? (
              <button className="bg-[#c0cfc7] opacity-[70%] w-[63px] h-[67px] p-2 my-2 hover:">
                <BsFillCaretDownFill size={50} onClick={onDownClickHandeler} />
              </button>
            ) : (
              <button className="bg-[#c0cfc7] opacity-[10%] w-[63px] h-[67px] p-2 my-2 hover:">
                <BsFillCaretDownFill size={50} onClick={onDownClickHandeler} />
              </button>
            )}
          </div>
        </div>
      {address ? <p className="text-center  text-[#c0cfc7]  text-lg bg-[#1e1e1e]">  {name}
        </p> : ""}  
         
        <div className="rounded-full  bg-[#2d2f2d] text-xs text-[#cdcfc7] w-[109px] h-[18px] mx-auto">
          <p className="text-center">
            {address.toLocaleLowerCase() != tempAdd.toLocaleLowerCase()
              ? "Owner: " + address.slice(0, 4) + "..." + address.slice(-4)
              : (address ? ("Owner: You"): ("Owner: ---"))}
               
          </p>
        </div>
        {address &&
          (address.toLocaleLowerCase() != tempAdd.toLocaleLowerCase() ? (
            <div>
              <button className="bg-[#c0cfc7] px-4 py-2 flex justify-center text-[#090d0b] my-10 mx-auto">
                View On Opensea
              </button>
            </div>
          ) : (
            <div className="sm:flex justify-center gap-2 ">
              <Link to="/cut">
                <button className="bg-[#c0cfc7] px-4 py-2  text-[#090d0b] my-10 ">
                  Cut Size
                </button>
              </Link>
              <Link to="/edit">
                <button className="bg-[#c0cfc7] px-4 py-2  text-[#090d0b] my-10 ">
                  Edit Content
                </button>
              </Link>
              <button className="bg-[#c0cfc7] px-4 py-2  text-[#090d0b] my-10 ">
                View On Opensea
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default BrowseNFTS;
