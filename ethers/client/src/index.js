import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Rainbow KIT
import "@rainbow-me/rainbowkit/styles.css";
import {  getDefaultWallets, RainbowKitProvider,darkTheme,lightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";


const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.optimism, chain.arbitrum,chain.goerli],
  [
    // alchemyProvider({ alchemyId: "yJKPlv6vVpN7wcG0-eeLfIw9jRS0CJ1p" }),
    publicProvider(),
  ]
); 

const { connectors } = getDefaultWallets({
  appName: "Creative Wealth",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} coolMode
       theme={lightTheme({
          accentColor: "white",
          accentColorForeground: "#52a7bb",
          // borderRadius: "large",
          // overlayBlur: "small",
          // borderRadius: "small",
        })}>
        

        <App />
        
    
    </RainbowKitProvider>
  </WagmiConfig>
);


reportWebVitals();