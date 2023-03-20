import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider,darkTheme ,coolMode} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {HashRouter} from 'react-router-dom'
import { publicProvider } from "wagmi/providers/public";
 

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.optimism, chain.arbitrum],
  [
 
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
  <HashRouter>
    <RainbowKitProvider chains={chains} coolMode
     theme={darkTheme({
          accentColor: "#f2bf11",
          accentColorForeground: "#121212",
          borderRadius: "large",
          overlayBlur: "small",
          borderRadius: "small",
        })}
    >
     
        <App />
     
    </RainbowKitProvider>
    </HashRouter>
  </WagmiConfig>
);


reportWebVitals();
 