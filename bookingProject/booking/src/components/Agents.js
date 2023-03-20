import React from 'react';
import Navbar3 from './NavBar3';
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Booking } from './Contract/address';
import { BookAbi } from './Contract/abi'
import { useState, useEffect } from 'react';

const Agents = () => {
  const { data: signer, isError } = useSigner();
  const { address } = useAccount();
  const [ApproveUser, setApproveUser] = useState("");
  const [FinishUserRide, setFinishUserRide] = useState("");
  const [showUsers, setShowUsers] = useState([]);
  let contract;
  if(signer){
    contract = new ethers.Contract(Booking, BookAbi, signer);
  }
  const approveUserHandeler = (e) => {
    setApproveUser(e.target.value);
    console.log(ApproveUser);
  }
  const finishUserHandeler = (e) => {
    setFinishUserRide(e.target.value);
    console.log(FinishUserRide);
  }
   //agent approve the user
   const agentApproveUser = async () => {
    try {
      await contract
        ?.aproveClient(ApproveUser)
        .then((_res) => {
          console.log("ride approved:", _res);
        });
    }
    catch (error) {
      console.log("error:", error);
    }
  }
    //agent finish  the user's ride
    const agentFinishUserRide = async () => {
      try {
        await contract
          ?.finishRide(FinishUserRide)
          .then((res) => {
            console.log("ride finished:", res);
          });
      }
      catch (error) {
        console.log("error:", error);
      }
    }
// display booked users..............................
const getUsers = async () => {
  const totalUsers = await contract?.getUsersCount()
  ethers.utils.parseEther(totalUsers.toString());

  for (var i = 0; i < totalUsers; i++) {
    await contract?.users([i]).then((user) => {

      setShowUsers((oldUser) => [...oldUser, user]);
      console.log("asdad", showUsers);
    });
  }
};
useEffect(() => {
  if (signer) {

    getUsers();
  }
}, [signer]);

  return (
    <>
      <Navbar3 />
      <div className="bg-[url(./images/owner.jpg)]  w-full  py-2 bg-cover bg-no-repeat bg-center flex justify-center  h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 p-40">Agent Dashboard</h1>
          <form className="flex justify-center">
            <input className="border-2 border-gray-500 rounded-md py-2 px-4" type="text"  value={ApproveUser} onChange={approveUserHandeler} placeholder="Enter User Address here..." />
            <button onClick={agentApproveUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              Approve Ride
            </button>
            <input className="border-2 border-gray-500 rounded-md py-2 px-4 ml-40 mr-2" type="text" value={FinishUserRide} onChange={finishUserHandeler} placeholder="Enter User Address here..." />
            <button onClick={agentFinishUserRide} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Finish Ride
            </button>
          </form>
          <div className="w-full text-left p-6 rounded-3xl bg-secondary border border-black text-black h-full mt-10">
            <h3 className="text-black text-left text-lg md:text-xl lg:text-2xl">All Booked Users:</h3>

            {showUsers?.map((item, index) => (
              (showUsers ? (<div key={index} className="flex flex-col md:flex-row gap-10">
                <h1 className="w-full md:w-3/4 p-4 mt-10 bg-transparent rounded-3xl text-base md:text-lg lg:text-xl border border-black ">
                  {item} <br />
                </h1>
              </div>) : (null))

            ))}
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default Agents;
