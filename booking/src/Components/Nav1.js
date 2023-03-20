import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Nav1 = () => {
    const [nav, setNav] = useState(true);
    return (
      <div>
        {/* ******Header********* */}
        <div className="text-white flex justify-between px-6  bg-[#111111] py-4 shadow-lg shadow-black">
          <img
            class=""
            src="https://surielementor.com/conexikit/wp-content/uploads/2022/09/conexi.png"
            alt=""
          />
          <div className="flex ">
            <ul className="flex gap-10">
              <Link to="/agent">
                <li className=" hidden sm:block text-white opacity-[20%] text-[26px] ">
                  Agent
                </li>
              </Link>
              <Link to="/">
                <li className="hidden sm:block text-white opacity-[100%] text-[26px] ">
                  Owner
                </li>
              </Link>
              <Link to="/user">
                <li className=" hidden sm:block text-white opacity-[20%] text-[26px]">
                  User
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
                <Link to="/agent">
                  <li className="p-4 uppercase font-bold ">Agent</li>
                </Link>
  
                <Link to="/browse">
                  <li className="p-4 uppercase font-bold ">user</li>
                </Link>
              </ul>
            </div>
          </div>
          <ConnectButton className=''  />
        </div>
      </div>
    );
}

export default Nav1
