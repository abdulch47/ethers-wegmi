import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { BUSDContractAbi, CFContractAbi } from "./Contracts/Abi";
import { BUSDContractAddress, CFContractAddress } from "./Contracts/Address";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Switch } from "@headlessui/react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  const { data: signer, isError } = useSigner();
  const { address } = useAccount();
  const [bbalance, setBbalance] = useState();
  const [contractbalance, setContractbalance] = useState();
  const [addAmount, setAddAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [refresh, setRefresh] = useState(true);
  const [updateMinMaxInvestment, setUpdateMinMaxInvestment] = React.useState({
    min: 0,
    max: 0,
  });

  const [depositStatus, setDepositStatus] = useState(false);
  const [withdrawalStatus, setWithdrawalStatus] = useState(false);

  let contract;
  let contracts;

  if (signer) {
    contract = new ethers.Contract(
      BUSDContractAddress,
      BUSDContractAbi,
      signer
    );
    contracts = new ethers.Contract(CFContractAddress, CFContractAbi, signer);
  }
  const getOwnerBalance = async () => {
    return await contract?.balanceOf(address).then((_balance) => {
      return ethers.utils.formatEther(_balance);
    });
  };
  const getContractBalance = async () => {
    return await contract?.balanceOf(CFContractAddress).then((_balance) => {
      return ethers.utils.formatEther(_balance);
    });
  };
  // Invest Funds by Owner --------------------------------------------------- [ CALL ]
  const ownerAddFunds = async (_amount, refresh, setRefresh) => {
    await contract
      ?.approve(CFContractAddress, ethers.utils.parseEther(_amount.toString()))
      .then((allowance_responce) => {
        toast.promise(
          allowance_responce.wait().then(async () => {
            // After Allowance Successfully - Add Fund to Contract
            await contracts
              ?.fund(ethers.utils.parseEther(_amount.toString()))
              .then((tx) => {
                toast.promise(
                  tx.wait().then((_responce) => {
                    setRefresh(!refresh);
                    console.log("Add Funds Res:", _responce);
                    return true;
                  }),
                  {
                    loading: "Adding Funds...",
                    success: "Successfully Done!",
                    error: "Something went Wrong!",
                  }
                );
              });
          }),
          {
            loading: "Tx 1 of 2: Getting Approval...",
            success: "Successfully Approved!",
            error: "Something went wrong!",
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
  // Withdraw Funds by Owner ------------------------------------------------ [ CALL ]
  const ownerWithdrawFunds = async (amount, address, refresh, setRefresh) => {
    await contracts
      ?.withdraw(_address, ethers.utils.parseEther(_amount.toString()))
      .then((tx) => {
        toast.promise(
          tx.wait().then((_responce) => {
            setRefresh(!refresh);
            console.log("Withdraw Funds Res:", _responce);
            return true;
          }),
          {
            loading: "Withdraw in Progress...",
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

  const getMinInvestment = async () => {
    return await contracts?.minInvestment().then((_balance) => {
      return ethers.utils.formatEther(_balance);
    });
  };
  const getMaxInvestment = async () => {
    return await contracts?.maxUserInvestment().then((_balance) => {
      return ethers.utils.formatEther(_balance);
    });
  };

  const ownerUpdateMinInvestment = async (_amount) => {
    await contracts
      ?.updateMinInvestment(ethers.utils.parseEther(_amount.toString()))
      .then((_responce) => {
        _responce.wait((tx) => {
          setRefresh(!refresh);
          console.log("Withdrawal Status:", tx);
          return true;
        });
      });
  };
  const ownerUpdateMaxInvestment = async (_amount) => {
    await contracts
      ?.updateMaxUserInvestment(ethers.utils.parseEther(_amount.toString()))
      .then((_responce) => {
        _responce.wait((tx) => {
          setRefresh(!refresh);
          console.log("Withdrawal Status:", tx);
          return true;
        });
      });
  };
 
  const ownerUpdateDepositStatus = async (status) => {
    await contracts
      ?.toggleDeposit(status)
      .then((_responce) => {
        toast.promise(
          _responce.wait((tx) => {
            setRefresh(!refresh);
          }),
          {
            loading: "Updating in Progress...",
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
      });
  };
  const getDepositStatus = async () => {
    return await contracts?.deposit();
  };
  const getWithdrawalStatus = async () => {
    return await contracts?.withdrawl();
  };
  const ownerUpdateWithdrawalStatus = async (status, refresh, setRefresh) => {
    await contracts
      ?.toggleWithdrawl(status)
      .then((_responce) => {
        toast.promise(
          _responce.wait((tx) => {
            setRefresh(!refresh);
            console.log("Withdrawal Status:", tx);
          }),
          {
            loading: "Updating in Progress...",
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
      });
  };

  useEffect(() => {
    if (signer) {
      getOwnerBalance().then((balance) => setBbalance(balance));
      getContractBalance().then((balance) => setContractbalance(balance));
      getDepositStatus().then((status) => setDepositStatus(status));
      getWithdrawalStatus().then((status) => setWithdrawalStatus(status));
      getMinInvestment().then((balance) => setMin(balance));
      getMaxInvestment().then((balance) => setMax(balance));
    }
  }, [signer, refresh,min]);


  return (
    <section className="p-6 h-full">
      <Toaster position="top-center" reverseOrder={false} />
      {/ Top Row --------------------------------------------------------------------------------------------------- /}
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-7">
        {/* COLUMN 1 - (border border-primary_gray p-3)*/}
        <div className="w-full rounded-3xl xl:col-span-2">
          
           
            <div className="w-full text-left p-3 rounded-3xl bg-secondary text-white h-24">
              <h3 className="text-primary_gray">Wallet Balance</h3>
              <h3>{bbalance}0 BUSD</h3>
            </div>
         
        </div>
        {/ COLUMN 2 - Update Min/Max ------------------------------------------------------------------------------------ /}
        <div className="w-full rounded-3xl xl:col-span-5 ">
          <div className="container grid gap-3 mx-auto text-center grid-cols-1 xl:grid-cols-2 mb-3">
            {/ Min -------------------------------------- /}
            <div className="w-full text-left p-3 rounded-3xl bg-secondary text-white h-24">
              <h3 className="text-primary_gray">
                Current Min Investment:
                <span className="text-white">{min}BUSD</span>
              </h3>
              <div className="flex justify-between w-full mt-2">
                <input
                  id="name"
                  type="number"
                  placeholder="Min Investment"
                  onChange={(e) => {
                    setUpdateMinMaxInvestment({
                      ...updateMinMaxInvestment,
                      min: e.target.value,
                    });
                  }}
                  className="w-2/3 mr-2 pl-4 bg-transparent rounded-3xl placeholder:text-primary_gray text-white   border border-primary focus:ring focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() =>
                    ownerUpdateMinInvestment(updateMinMaxInvestment.min)
                  }
                  disabled={updateMinMaxInvestment.min === "" ? true : false}
                  className="w-1/3 py-2 font-semibold rounded-3xl bg-primary_pink hover:bg-primary_cream hover:text-primary_pink text-white disabled:bg-primary_gray"
                >
                  Update
                </button>
              </div>
            </div>
            {/ Max -------------------------------------- /}
            <div className="w-full text-left p-3 rounded-3xl bg-secondary text-white h-24">
              <h3 className="text-primary_gray">
                Current Max Investment:{" "}
                <span className="text-white">{max} BUSD</span>
              </h3>
              <div className="flex justify-between w-full mt-2">
                <input
                  id="name"
                  type="number"
                  placeholder="Max Investment"
                  onChange={(e) => {
                    setUpdateMinMaxInvestment({
                      ...updateMinMaxInvestment,
                      max: e.target.value,
                    });
                  }}
                  className="w-2/3 mr-2 pl-4 bg-transparent placeholder:text-primary_gray text-white rounded-3xl  border border-primary focus:ring focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() =>
                    ownerUpdateMaxInvestment(updateMinMaxInvestment.max)
                  }
                  disabled={updateMinMaxInvestment.min === "" ? true : false}
                  className="w-1/3 py-2 font-semibold rounded-3xl bg-primary_pink hover:bg-primary_cream hover:text-primary_pink text-white disabled:bg-primary_gray"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/ 2nd Row --------------------------------------------------------------------------------------------------- /}
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-7">
        {/* COLUMN 1 - (border border-primary_gray p-3)*/}
        <div className="w-full rounded-md xl:col-span-2">
          {/ COL 1 SUB 2 /}
          <div className="w-full rounded-3xl xl:col-span-2 bg-secondary text-white p-3">
            {/ Upadte Withdrawal Status --------------------------------------------------------------- COL1-MOD2 /}
            {/ deposit status /}
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="text-primary_gray">Update Deposit Status</h3>
              <div className="flex items-center">
                <p className="mr-2">{depositStatus ? "ON" : "OFF"}</p>
                <Switch
                  checked={depositStatus}
                  onChange={() =>
                    ownerUpdateDepositStatus(
                      !depositStatus,
                    
                      
                    )
                  }
                  className={`${depositStatus ? "bg-green-300" : "bg-red-300"}
          relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      depositStatus ? "translate-x-4" : "translate-x-0"
                    }
            pointer-events-none inline-block h-[18px] w-[20px] transform rounded-full bg-primary shadow-md ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
            {/ withdraw status /}
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-primary_gray">Update Withdrawal Status</h3>
              <div className="flex items-center">
                <p className="mr-2">{withdrawalStatus ? "ON" : "OFF"}</p>
                <Switch
                  checked={withdrawalStatus}
                  onChange={() =>
                    ownerUpdateWithdrawalStatus(
                      !withdrawalStatus,
                      refresh,
                      setRefresh
                    )
                  }
                  className={`${
                    withdrawalStatus ? "bg-green-300" : "bg-red-300"
                  }
          relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      withdrawalStatus ? "translate-x-4" : "translate-x-0"
                    }
            pointer-events-none inline-block h-[18px] w-[20px] transform rounded-full bg-primary shadow-md ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
            <hr className="my-5" />
            {/ Withdraw / Add ------------------------------------------------------------------------- COL1-MOD3 /}
            <div className="w-full text-left mb-2">
              <h3 className="text-primary_gray">Balance Available</h3>
              <h3>{contractbalance} BUSD</h3>
            </div>
            {/ Add Funds /}
            <div className="flex justify-between w-full mb-3">
              <input
                id="name"
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setAddAmount(e.target.value)}
                className="w-2/3 mr-2 pl-4 rounded-3xl bg-secondary text-white placeholder:text-primary_gray border border-primary focus:ring focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => ownerAddFunds(addAmount, refresh, setRefresh)}
                className="w-1/3 py-2 font-semibold hover:bg-primary_cream hover:text-primary_pink rounded-3xl bg-primary_pink text-white disabled:bg-primary_gray"
              >
                Add
              </button>
            </div>
            {/ Withdraw ---------------------------------------------------------------- /}
            <div className="w-full text-left mb-2 mt-9">
              <h3>Withdraw Funds</h3>
            </div>
            <div>
              <div className="w-full">
                <div className="flex md:flex-row flex-col">
                  <input
                    id="name"
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="md:w-1/2 w-full mr-2 mb-3 md:mb-0 pl-4 py-2 bg-secondary text-white placeholder:text-primary_gray rounded-3xl border border-primary  focus:ring focus:ring-primary"
                  />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Wallet Address"
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="md:w-1/2 w-full mr-2 mb-3 md:mb-0 pl-4 py-2 bg-secondary text-white placeholder:text-primary_gray rounded-3xl border border-primary  focus:ring focus:ring-primary"
                  />
                </div>

                <div className="flex sm:flex-row gap-3 sm:gap-0 flex-col mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      ownerWithdrawFunds(
                        withdrawAmount,
                        withdrawAddress,
                        refresh,
                        setRefresh
                      )
                    }
                    className="w-full py-2 font-semibold rounded-3xl bg-primary_pink text-white hover:bg-primary_cream hover:text-primary_pink"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
