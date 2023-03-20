import { useState } from 'react';
// import { ethers } from "ethers";
// import React from 'react';
import "./App.css";
import NavBar from './NavBar';
import MainPool from './MainPool';
import { ConnectButton } from "@rainbow-me/rainbowkit";
const App = () => {
const [accounts, setAccounts] = useState([]);
 
  return (
    <div className='overlay'>
      <div className='cssButton'>
     <ConnectButton />
      </div>
    <div className='App'>
      <NavBar accounts = {accounts} setAccounts = {setAccounts}/>
       <MainPool accounts = {accounts} setAccounts = {setAccounts}/>
    </div>
    <div className='moving-background'></div>
    </div>
  );
};

export default App;
