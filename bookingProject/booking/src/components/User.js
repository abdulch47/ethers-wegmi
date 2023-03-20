import React, { useEffect, useState } from 'react';
import Navbar4 from './NavBar4';
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Booking } from './Contract/address';
import { BookAbi } from './Contract/abi'


const User = () => {
  const { data: signer, isError } = useSigner();
  const { address } = useAccount();
  const [perSecFee, setPersecFee] = useState();
  const [rideTime, setRideTime] = useState("");
  const [amountToPay, setAmountToPay] = useState("");

  const userTimeHandler = (e) => {
    setRideTime(e.target.value);
    console.log(rideTime);
  }
  const userAmountToPayHandler = (e) => {
    setAmountToPay(e.target.value);
    console.log(amountToPay);
  }

  let contract;

  if (signer) {
    contract = new ethers.Contract(Booking, BookAbi, signer);
  }

  // feepersec..............................
  const getFeepersec = async () => {
    return await contract?.rideFeePerSec().then((_fee) => {
      return ethers.utils.formatEther(_fee);
    });
  };
  // Start Ride ------------------------------------------------ [ CALL ]
  const startRide = async () => {
    await contract
      ?.booking(rideTime, { value: ethers.utils.parseEther(amountToPay).toString() })
      .then((_responce) => {
        console.log("Book:", _responce);
        return true;
      });
  };
  useEffect(() => {
    if (signer)
      getFeepersec().then((fee) => setPersecFee(fee));

  }, [signer]);
  return (
    <>
      <Navbar4 />

      <div className="bg-[url(./images/user.jpg)]  w-full  py-2 bg-cover bg-no-repeat bg-center flex justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 p-40">User Dashboard</h1>
          <p className="text-gray-700  mb-20 right-45 p-2 bg-gray-300 rounded-lg">Fee per second: <span className="font-bold">{perSecFee}</span></p>
          <form className="flex justify-center ">
            <input value={rideTime} onChange={userTimeHandler} className="border-2 border-gray-500 rounded-md py-2 px-4" type="text" placeholder="Enter Ride time here..." />
            <input value={amountToPay} onChange={userAmountToPayHandler} className="border-2 border-gray-500 rounded-md py-2 px-4 ml-4" type="text" placeholder="Enter amount to pay here..." />
            <button onClick={startRide} className="bg-black hover:bg-black/30 text-white font-bold py-2 px-4 rounded ml-4">
              Book Ride
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default User;
