import React from "react";
import { useState } from "react";
import Display from "../Display";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";

const About = () => {
  const [nav, setNav] = useState(true);
  return (
    <div>
    {/* ******Header********* */}
      <div className="text-white flex justify-between px-6 mt-4 bg-[#1e1e1e] py-2">
        <h1 className=" text-gray-300 text-[26px]  ">Logo</h1>
        <div className="flex ">
          <ul className="flex gap-10">
            <Link to="/mint">
              <li className=" hidden sm:block text-gray-300 opacity-[10%] text-[26px] ">
                Mint
              </li>
            </Link>
            <Link to="/">
              <li className="">
                <CiCircleInfo className="my-auto" size={40} />
              </li>
            </Link>
            <Link to="/browse">
              <li className=" hidden sm:block text-gray-300 opacity-[10%] text-[26px]">
                NFTS
              </li>
            </Link>
          </ul>

          <div onClick={() => setNav(!nav)} className="block md:hidden">
            {!nav ? (
              <AiOutlineClose size={30} />
            ) : (
              <FiChevronDown size={30} className="mt-2 -ml-8" />
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
              <Link to="/mint">
                <li className="p-4 uppercase font-bold ">Mint</li>
              </Link>

              <Link to="/browse">
                <li className="p-4 uppercase font-bold ">NFTS</li>
              </Link>
            </ul>
          </div>
        </div>
        <Display />
      </div>

      <h1 className="text-center text-[#c0cfc7] mt-20 text-[35px] bg-[#1e1e1e]">
        About
      </h1>
      <div className=" sm:px-32 px-10 bg-[#1e1e1e]">
        <h1 className="text-center opacity-[0.7] my-10 font-[400] text-[#c0cfc7] text-[25px] leading-[28px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          tellus ac sem fringilla convallis et vel massa. Duis eget arcu eget
          lorem viverra luctus. Donec vitae venenatis metus, fermentum placerat
          enim. Morbi interdum augue eu eleifend lobortis. Phasellus in
          convallis enim, in elementum nibh. Morbi suscipit elementum mauris ac
          lacinia. Phasellus scelerisque tellus tincidunt, gravida nisl eget,
          facilisis ex. Pellentesque nec est interdum, scelerisque dui in,
          congue urna.
        </h1>
        <h1 className="text-center mb-10  opacity-[0.7] font-[400] text-[#c0cfc7] text-[25px] leading-[28px] ">
          Aenean id congue tortor. Duis sit amet placerat sem. Vivamus sed
          venenatis odio, sit amet vestibulum magna. Ut ac orci enim.
          Pellentesque posuere erat dui, ut accumsan mauris vulputate ac. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Duis neque diam, blandit at leo sed, venenatis commodo
          dolor. Aenean sodales sit amet eros sit amet mollis. Vestibulum ornare
          vulputate lobortis. Praesent fermentum tempor metus in cursus. Mauris
          ac congue nibh. Duis id sem nec orci ullamcorper pulvinar. Duis diam
          lacus, mattis non nunc ut, facilisis varius nisi. Maecenas scelerisque
          lacus vitae erat consectetur iaculis. Maecenas tristique libero id
          justo porttitor gravida. Ut id sapien nec tellus suscipit dapibus.
        </h1>
        <h1 className="text-center  text-[#c0cfc7] opacity-[0.7] font-[400]  text-[25px] leading-[28px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          tellus ac sem fringilla convallis et vel massa. Duis eget arcu eget
          lorem viverra luctus. Donec vitae venenatis metus, fermentum placerat
          enim. Morbi interdum augue eu eleifend lobortis. Phasellus in
          convallis enim, in elementum nibh. Morbi suscipit elementum mauris ac
          lacinia. Phasellus scelerisque tellus tincidunt, gravida nisl eget,
          facilisis ex. Pellentesque nec est interdum, scelerisque dui in,
          congue urna.
        </h1>
        <h1 className="text-center my-10 text-[#c0cfc7]  font-[400] opacity-[0.7] text-[25px] leading-[28px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          tellus ac sem fringilla convallis et vel massa. Duis eget arcu eget
          lorem viverra luctus. Donec vitae venenatis metus, fermentum placerat
          enim. Morbi interdum augue eu eleifend lobortis. Phasellus in
          convallis enim, in elementum nibh. Morbi suscipit elementum mauris ac
          lacinia. Phasellus scelerisque tellus tincidunt, gravida nisl eget,
          facilisis ex. Pellentesque nec est interdum, scelerisque dui in,
          congue urna.
        </h1>
        <h1 className="text-center pb-10 text-[#c0cfc7]  opacity-[0.7] font-[400] text-[25px] leading-[28px]">
          Aenean id congue tortor. Duis sit amet placerat sem. Vivamus sed
          venenatis odio, sit amet vestibulum magna. Ut ac orci enim.
          Pellentesque posuere erat dui, ut accumsan mauris vulputate ac. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Duis neque diam, blandit at leo sed, venenatis commodo
          dolor. Aenean sodales sit amet eros sit amet mollis. Vestibulum ornare
          vulputate lobortis. Praesent fermentum tempor metus in cursus. Mauris
          ac congue nibh. Duis id sem nec orci ullamcorper pulvinar. Duis diam
          lacus, mattis non nunc ut, facilisis varius nisi. Maecenas scelerisque
          lacus vitae erat consectetur iaculis. Maecenas tristique libero id
          justo porttitor gravida. Ut id sapien nec tellus suscipit dapibus.
        </h1>
      </div>
    </div>
  );
};

export default About;
