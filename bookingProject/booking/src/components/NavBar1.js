import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

const Navbar1 = () => {
    const[nav, setNav] = useState(true);

   
  return (
    <div className='fixed w-full text-white flex justify-between p-4 items-center'>
        <div className='text-2xl font-bold text-center uppercase bg-black/30'>
        <h1>Taxi <span></span>X</h1>
        </div>
        <nav>
            <ul className='hidden md:flex gap-8 p-6 uppercase bg-black/30'>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/owner'>Owner</Link></li>
                <li><Link to='/user'>User</Link></li>
                <li><Link to='/agents'>Agent</Link></li>
            </ul>
            <div onClick={() => setNav(!nav)} className="block md:hidden">
              {!nav ? (
                <AiOutlineClose size={30} />
              ) : (
                <FiChevronDown size={30} className="mt-2 -ml-8 text-black" />
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
              <Link to="/owner">
                  <li className="p-4 uppercase font-bold ">Owner</li>
                </Link>
                <Link to="/agents">
                  <li className="p-4 uppercase font-bold ">Agent</li>
                </Link>
  
                <Link to="/user">
                  <li className="p-4 uppercase font-bold ">user</li>
                </Link>
              </ul>
            </div>
            
        </nav>
    </div>
  )
}

export default Navbar1