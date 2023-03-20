import React from 'react';
import Navbar2 from './NavBar2';
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Booking } from './Contract/address';
import { BookAbi } from './Contract/abi'
import { useState, useEffect } from 'react';

const Owner = () => {
  const { data: signer, isError } = useSigner();
  const { address } = useAccount();
  const [AddAgent, setAddAgent] = useState("");
  const [RemoveAgent, setRemoveAgent] = useState("");
  const [showagents, setShowagents] = useState([]);


  const addAgentHandeler = (e) => {
    setAddAgent(e.target.value);
    console.log(AddAgent);
  }
  const removeAgentHandeler = (e) => {
    setRemoveAgent(e.target.value);
    console.log(RemoveAgent);
  }

  let contract;
  if (signer) {
    contract = new ethers.Contract(Booking, BookAbi, signer);
  }
  //owner add agent
  const ownerAddAgent = async () => {
    try {
      await contract
        ?.addAgent(AddAgent)
        .then((_res) => {
          console.log("Agent added:", _res);
        });
    }
    catch (error) {
      console.log("error:", error);
    }

  }
  //owner remove agent
  const ownerRemoveAgent = async () => {
    try {
      await contract
        ?.removeAgent(RemoveAgent)
        .then((res) => {
          console.log("Agent removed:", res);
        });
    }
    catch (_error) {
      console.log("error:", _error);
    }

  }

  // display agents..............................
  const getAgents = async () => {
    const totalAgents = await contract?.getAgentsCount()
    ethers.utils.parseEther(totalAgents.toString());

    for (var i = 0; i < totalAgents; i++) {
      await contract?.agents([i]).then((agent) => {

        setShowagents((oldagent) => [...oldagent, agent]);
        console.log("asdad", showagents);
      });
    }
  };
  useEffect(() => {
    if (signer) {

      getAgents();
    }
  }, [signer]);
  console.log("agent:", showagents)
  return (
    <>
      <Navbar2 />
      <div className="bg-[url(./images/owner.jpg)] w-full bg-[100%] bg-cover bg-no-repeat  flex justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 p-40">Owner Dashboard</h1>
          <form className="flex justify-center">
            <input className="border-2 border-gray-500 rounded-md py-2 px-4" type="text" value={AddAgent} onChange={addAgentHandeler} placeholder="Enter Agent Address here..." />
            <button onClick={ownerAddAgent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              Add Agent
            </button>
            <input className="border-2 border-gray-500 rounded-md py-2 px-4 ml-40 mr-2" type="text" value={RemoveAgent} onChange={removeAgentHandeler} placeholder="Enter Agent Address to Remove..." />
            <button onClick={ownerRemoveAgent} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Remove Agent
            </button>

          </form>
          <div className="w-full text-left p-6 rounded-3xl bg-secondary border border-black text-black h-full mt-10">
            <h3 className="text-black text-left text-lg md:text-xl lg:text-2xl">All Agents:</h3>

            {showagents?.map((item, index) => (
              (showagents ? (<div key={index} className="flex flex-col md:flex-row gap-10">
                <h1 className="w-full md:w-3/4 p-4 mt-10 bg-transparent rounded-3xl text-base md:text-lg lg:text-xl border border-black ">
                  {item} <br />
                </h1>
              </div>) : (null))

            ))}
          </div>

        </div>

      </div>
    </>
  )
}

export default Owner;
