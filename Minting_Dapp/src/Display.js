import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import { TfiVector } from "react-icons/tfi";
import { ImTwitter } from "react-icons/im";
import { SiDiscord } from "react-icons/si";
import { BiRectangle } from "react-icons/bi";

import { FiChevronDown } from "react-icons/fi";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

const Display = () => {
  function togglePop() {
    show ? setShow(false) : setShow(true);
  }
  const [show, setShow] = useState(false);
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div class="relative inline-block text-left">
        <div>
          <button
            type="button"
            class="py-2 px-4 bg-[#d1d5db] text-black w-full rounded-full"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={togglePop}
          >
            <svg
              class=" h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        {show ? (
          <div
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#1e1e1e] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <h1 class="text-gray-700 block px-4 py-2 text-sm">
                <div className="">
                  {ensName ? (
                    `${ensName} (${address})`
                  ) : (
                    <div>
                      <h1 className="text-[#cfc0c7]">
                        {" "}
                        {address.slice(0, 6) + "..." + address.slice(-4)}
                      </h1>
                    </div>
                  )}
                </div>
              </h1>
              <Link
                to="/nfts"
                class="text-[#c0cfc7] block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
              >
                My NFTS
              </Link>
              <div className="border border-[#cfc0c7] mx-3" />

              <h1 class="text-[#c0cfc7] block px-4 py-2 text-sm">FAQ</h1>

              <h1 class="text-[#c0cfc7] block w-full px-4 py-2 text-left text-sm">
                Terms
              </h1>
              <div className="border-[0.5px] border-[#cfc0c7] mx-3" />
              <h1
                onClick={disconnect}
                class="text-[#c0cfc7] hover:cursor-pointer block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
              >
                Disconnect
              </h1>
              <div className="flex justify-between mx-3 mb-4">
                <TfiVector />

                <SiDiscord />
                <ImTwitter />
                <BiRectangle />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <>
      <div className="bg-transparent text-[#b4b4b4]  font-bold  ">
        {connectors.map((connector) => (
          <div key={connector.id} className=" ">
            <button
              disabled={!connector.ready}
              onClick={() => connect({ connector })}
              className="py-2 px-4 bg-[#d1d5db] text-black w-full rounded-full"
            >
              <div className="flex gap-1 ">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAZCAYAAADNAiUZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFJSURBVHgB7ZbdTcMwFIXPtdtiKkAdIRsQNugKHaGTwChlAlYoG2SDuhv4JZIhcS7XLq0iQStATehDvof8+3zXiaVcoENmwnfXCWfCGJNhrOfEuAdxJpdyiY97e6XHD074szRW72ufM1OulRIB5BhZvHVsDDdY+rJc7c9Hp8LLqsy0muTt6t9ClRFpkJTLKRG/5iA1N2a+r57B8xg+UpPdTTpsTiLjLDG5Ju6JHJi3zOwo8Lr9XEqa3k0fRfh0JMtJmIthTCh26byVqVoF5aqmsToE5723+CFJen073cSPLm/qVU5XYLKoayuLw7UXwLkgMzMZBb1pVbFqODzjzJiRKfYT+CLtEFs3WFRlWSj0hyxMvMSDPqVJ/B9SDNJBOkgH6YVJvUs/3zX64LMJSDNlHZbSaxToEGne1vweFjt3i9TpeT9DB7TbmQ+AWo5DDNbKMwAAAABJRU5ErkJggg==" />{" "}
                <h6 className="my-auto">Connect</h6>
              </div>

              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          </div>
        ))}

        {error && <div>{error.message}</div>}
      </div>
    </>
  );
};

export default Display;
