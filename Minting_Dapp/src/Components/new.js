import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { BookAbi } from "./Contracts/Abi";
import { Book } from "./Contracts/Address";
import Nav1 from "./Nav1";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";

const Owner = () => {
  const [addagent, setAddagent] = useState("");
  const [showagents, setShowagents] = useState([]);
  const { address } = useAccount();
  const { data: signer, isError } = useSigner();
  const [refresh, setRefresh] = useState(true);

  let contract;

  if (signer) {
    contract = new ethers.Contract(Book, BookAbi, signer);
  }
  console.log("Contract", contract);

  // Adding agents by Owner ------------------------------------------------ [ CALL ]
  const owneraddagents = async (_address) => {
    await contract
      ?.addAgent(_address)
      .then((tx) => {
        toast.promise(
          tx.wait().then((_responce) => {
            setRefresh(!refresh);
            console.log("Withdraw Funds Res:", _responce);
            return true;
          }),
          {
            loading: "In Progress...",
            success: "Successfully Done!",
            error: "Something went Wrong!",
          }
        );
      })
      .catch((error) => {
        console.log("Reinvest Error: ", error?.error?.data);
        if (error?.error?.data?.code === 3)
          toast.error(error?.error?.data?.message);
        else {
          toast.error("Something went Wrong!");
        }
        return true;
      });
  };
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
  console.log("hahaha",showagents)
 

  //remove agents.................................
  const ownerremoveagents = async (_address) => {
    await contract
      ?.removeAgent(_address?.toString())
      .then((tx) => {
       
            console.log("Withdraw Funds Res:", _responce);
            return true;
      
          
      
      })
      .catch((error) => {
        console.log(" Error: ", error?.error?.data);
        if (error?.error?.data?.code === 3)
          toast.error(error?.error?.data?.message);
        else {
          toast.error("Something went Wrong!");
        }
        return true;
      });
  };

  useEffect(() => {
    if (signer) {
    
      getAgents();
    }
  }, [signer, refresh]);

  return (
    <>
      <Nav1 />
      <section className="p-6 ">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="">

        <div className="w-full text-left p-3  rounded-3xl bg-secondary border border-white my-auto text-white h-24">
          <h3 className="text-primary_gray">Add Agents:</h3>
          <div className="flex justify-between w-full mt-2">
            <input
              id="name"
              type="text"
              placeholder="Enter Agent Address"
              onChange={(e) => setAddagent(e.target.value)}
              className="w-2/3 mr-2 pl-4 bg-transparent rounded-3xl placeholder:text-primary_gray text-white   border border-primary focus:ring focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => owneraddagents(addagent)}
              className="w-1/3 py-2 font-semibold rounded-3xl bg-primary_yellow  text-primary_black disabled:bg-primary_gray"
            >
              Add
            </button>
          </div>
        </div>
        <div className="w-full text-left p-6 rounded-3xl bg-secondary border border-white text-white h-full mt-10">
          <h3 className="text-white text-left ">All Agents:</h3>

          {showagents?.map((item, index) => (
            (showagents ? (<div key={index} className="flex gap-10">
              <h1 className="w-full mr-2  p-4 mt-10 bg-transparent rounded-3xl  text-white   border border-primary ">
                {item} <br />
              </h1>

              <button
                type="button"
                onClick={() => ownerremoveagents(item)}
                className="w-1/3 py-2 mt-10 font-semibold rounded-3xl bg-primary_yellow  text-primary_black disabled:bg-primary_gray"
              >
                Remove
              </button>
            </div>):(null))
            
          ))}
        </div>
        </div>
      </section>
    </>
  );
};

export default Owner;
