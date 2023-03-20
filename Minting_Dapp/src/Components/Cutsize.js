import React from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { TbArrowBackUp } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import Display from "../Display";
const Cutsize = () => {
  return (
    <div className="bg-[#1e1e1e] h-full">
      <div className="text-white flex justify-between sm:mx-8 mx-4 my-2 bg-[#1e1e1e] py-2">
        <Link to="/browse">
          <h1 className="my-auto text-gray-300 text-lg flex gap-2">
            <TbArrowBackUp className="my-auto" />
            Back
          </h1>
        </Link>
        <Display/>

      </div>
      <div className="flex justify-center">
        <div>
          <div className="flex sm:gap-24 gap-16 justify-left my-20 sm:mx-10 mx-2">
            <div>
              <p className="text-center  text-[#c0cfc7]  text-lg bg-[#1e1e1e] opacity-[70%]">
                NFT#123
              </p>
              <div className="rounded-full text-center bg-[#2d2f2d] text-xs text-[#cdcfc7] w-[99px] h-[18px] mx-auto">
                <p>Owner: You</p>
              </div>
            </div>
            <div className="my-auto flex gap-2">
              <p className="text-center  text-[#c0cfc7]  text-lg bg-[#1e1e1e] opacity-[70%] my-auto">
                Size Remaining:
              </p>
              <p className="text-[#c0cfc7] text-2xl my-auto">1kg</p>
            </div>
          </div>
          <div className="pb-0.5 bg-[#c0cfc7]  opacity-[10%] " />
          <p className="text-left my-2 text-[#c0cfc7] sm:mx-0 mx-2">
            Cut size at:
          </p>
          <div className="bg-[#090d0b] h-[137px]  w-full mx-auto  sm:px-10 py-3 px-2  flex gap-4 md:gap-20 lg:gap-20 sm:gap-20 justify-left">
            <div className="flex">
              <button className="bg-[#c0cfc7] opacity-[10%] px-2 h-[102px]">
                <BsFillCaretUpFill />
              </button>
              <div className=" ">
                <p className="text-[#c0cfc7] mx-6 ">1</p>
                <div className="pb-0.5 bg-[#c0cfc7] mx-1  opacity-[30%] " />
                <p className="text-[#c0cfc7] text-center ">kg</p>
              </div>

              <button className="bg-[#c0cfc7] opacity-[10%] px-2 h-[102px]">
                <BsFillCaretDownFill />
              </button>
            </div>
            <div className="flex gap-2">
              <p className="text-center  text-[#c0cfc7]  text-lg bg-transparent opacity-[70%] my-auto">
                New Remainder:
              </p>
              <p className="text-[#c0cfc7] text-2xl my-auto">9kg</p>
            </div>
          </div>
          <div className="bg-[#090d0b] h-[137px] my-10 w-full sm:mx-auto mx-2 px-10 py-3  opacity-[70%] flex gap-20 justify-left">
            <div className="mx-auto flex gap-2 my-auto">
              <AiOutlinePlus
                className="opacity-[70%] "
                color="white"
                size={30}
              />
              <h1 className="text-[#c0cfc7] text-lg opacity-[70%]">
               
                Cut Again
              </h1>
            </div>
          </div>
          <p className="text-[#c0cfc7] mx-auto opacity-[70%]">
            Warning:This cannot be undone.
          </p>
          <buuton className="my-20 bg-[#c0cfc7] text-[#090d0b] px-2 py-2">
            Confirm
          </buuton>
        </div>
      </div>
    </div>
  );
};

export default Cutsize;
