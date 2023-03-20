import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import MyToken from "./Contractabi/MyToken.json";
import { MarketPlace } from "./Contractabi/contractaddress";
import { useAccount, useSigner } from "wagmi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Display from "../Display";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";

const Mint = () => {
  const [nav, setNav] = useState(true);

  const notify = () => toast("Successfully Minted");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState();
  const [priceForMint, setPriceForMint] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [status, setStatus] = useState("You are eligible to mint");
  const { address } = useAccount();
  const { data: signer } = useSigner();

  let contract;

  if (signer) {
    contract = new ethers.Contract(MarketPlace, MyToken, signer);
  }

  const Price = async () => {
    setPrice(await contract.price());
  };
  const haha = async () => {
    setPriceForMint(
      ethers.utils.formatEther((await contract.price()).toString() * count)
    );
  };
  console.log("Contractsssssssssssssss:", contract);

  useEffect(() => {
    Price();
  }, [signer]);

  useEffect(() => {
    haha();
  }, [contract]);

  const onUppClickHandeler = async () => {
    setCount(count + 1);
    setTotalPrice((count + 1) * parseInt(price).toString());

    console.log(totalPrice);
  };

  const onDownClickHandeler = () => {
    if (count >= 1) {
      setCount(count - 1);
      setTotalPrice((count - 1) * parseInt(Number(price)));
    }
  };
  const MintNFTS = async () => {
    setStatus("Continue in your wallet");
    try {
      setLoading(true);

      contract
        .safeMint(address, "/././", count, {
          value: ethers.utils.parseEther(priceForMint),
        })
        .then(() => {
          setLoading(false);
          notify();
          setStatus("Your NFt has been planted");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>  
     {/* ******Header********* */}
     <div className="text-white flex justify-between px-6 mt-4 bg-[#1e1e1e] py-2">
        <h1 className=" text-gray-300 text-[26px]  ">Logo</h1>
        <div className="flex ">
          <ul className="flex gap-10">
          <Link to="/browse">
              <li className=" hidden sm:block text-gray-300 opacity-[10%] text-[26px] ">
                NFTS
              </li>
            </Link>
        
            <Link to="/mint">
              <li className="  text-gray-300 opacity-[100%] text-[26px]">
                Mint
              </li>
            </Link>
            <Link to="/">
              <li className="">
                <CiCircleInfo className="hidden sm:block my-auto opacity-[10%]" size={40} />
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
            <Link to="/browse">
                <li className="p-4 uppercase font-bold ">NFTS</li>
              </Link>
            <Link to="/">
                <li className="p-4 uppercase font-bold "><CiCircleInfo size={40}/></li>
              </Link>
              

             
            </ul>
          </div>
        </div>
        <Display />
      </div>
    
      <div className="mx-auto">
        <ToastContainer position="top-center" />
        <h1 className="flex justify-center text-left  text-[#c0cfc7] mt-20 text-[35px] opacity-[70%]">
          Ready To Mint
        </h1>

        <div className="flex gap-10 justify-center sm:ml-24 ml-0">
          <div>
            <div className="bg-[#c0cfc7] h-[231.89px] w-full sm:px-28 px-24 mx-auto my-10"></div>
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
            <p className="text-[#c0cfc7] text-[40px] text-center mt-0 mb-0">
              {count}
            </p>
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
        <h1 className="flex  justify-center text-left text-[#c0cfc7]  text-[24px] mt-1">
          {status}
        </h1>
        <button className="bg-[#c0cfc7] flex justify-center mx-auto  text-[26px] p-3 opacity-[70%] text-[#090d0b] my-10">
          {!loading ? (
            status === "Your NFt has been planted" ? (
              <Link to="/nfts">View Your NFTS</Link>
            ) : count == 0 ? (
              "Mint - Incomplete"
            ) : (
              <>
                <div onClick={MintNFTS}>Mint - {totalPrice} WEI</div>
              </>
            )
          ) : (
            "Loading"
          )}
        </button>
      </div>
    </>
  );
};

export default Mint;
