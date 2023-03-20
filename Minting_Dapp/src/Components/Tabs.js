import { useState } from "react";
import { Tab } from "@headlessui/react";
import { CgCloseO } from 'react-icons/cg'



function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    let [categories] = useState({
        "1": [
            {
                id: 1,
                titlee:
                    <>
                        <div className='flex justify-between'>

                            <div><h1 className='text-[#c0cfc7] sm:text-left text-lg'>Title:</h1>
                                <p className='text-[#c0cfc7] opacity-[70%]'>Add text toyour profile</p>
                            </div>
                            <div className='flex gap-20 my-auto'>

                                <h1 className='text-[#c0cfc7] text-lg'>Hello World</h1>
                                <CgCloseO size={20} color='white' />

                            </div>


                        </div>
                        <div className='pb-0.5 bg-[#c0cfc7]  opacity-[10%] ' />
                        <div className='sm:flex sm:justify-between'>

                            <div className='my-auto'><h1 className='text-[#c0cfc7] sm:text-left text-lg'>Media:</h1>
                                <p className='text-[#c0cfc7] opacity-[70%]'>Add an image or video file to your <br /><p className='sm:text-left'>profile.FAQ</p></p>
                            </div>
                            <div className='my-4  bg-[#090d0b] px-4 py-2 mr-6 sm:mr-0'>

                                <h1 className='text-[#c0cfc7] text-lg text-center mb-0'>File Uploaded</h1>
                                <p className='text-[#c0cfc7] opacity-[70%] mt-0 mb-0'>testvideo_02-04-23.mp4</p>
                                <h1 className='text-[#c0cfc7] text-lg text-center mt-0'>Remove</h1>



                            </div>

                        </div>
                        <div className='pb-0.5 bg-[#c0cfc7]  opacity-[10%] ' />
                        <div className='sm:flex sm:justify-between'>

                            <div className='my-auto'><h1 className='text-[#c0cfc7] sm:text-left text-lg'>Subtitles:</h1>
                                <p className='text-[#c0cfc7] opacity-[70%]'>Add a subtitle file to go along with your <br /><p className='sm:text-left'>media.FAQ</p></p>
                            </div>
                            <div className='my-4  bg-[#090d0b] px-8 py-2 mr-6 sm:mr-0'>

                                <button className='bg-[#c0cfc7] p-2 mt-2 text-[#090d0b]'>Upload</button>
                                <p className='text-[#c0cfc7] opacity-[70%] mt-2'>Max Size: 10MB(.SRT)</p>




                            </div>

                        </div>

                        <p className='text-[#c0cfc7] opacity-[70%] my-4'>By Clicking "Confirm" you agree to the Terms.</p>
                        <button className='bg-[#c0cfc7] p-2 mt-2 text-[#090d0b]'>Confirm</button>
                    </>,

            },


        ],
        "2": [
            {
                id: 1,
                titlee: "",


            },

        ],
        "3": [
            {
                id: 1,
                titlee: "",


            },

        ],
        "4": [
            {
                id: 1,
                titlee: "",


            },

        ],
        "5": [
            {
                id: 1,
                titlee: "",


            },

        ],

    });

    return (
        <div className=" py-4 bg-transparent w-full">
            <Tab.Group>
                <Tab.List className="lg:flex gap-2 justify-center mx-auto    bg-transparent  rounded-xl">

                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    "px-4 text-2xl  my-2 mx-4 lg:mx-auto py-2 border border-white text-left rounded-lg bg-[#c0cfc7] opacity-[10%] font-bold ",
                                    " text-[#090d0b] focus:outline-none",
                                    selected
                                        ? "bg-[#c0cfc7] text-2xl text-[#090d0b] opacity-[100%] rounded-lg px-4 py-2"
                                        : ""
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}

                </Tab.List>
                <div className='pb-0.5 bg-[#c0cfc7]  opacity-[10%] mt-2' />
                <Tab.Panels className="mt-6">
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                "rounded-xl bg-transparent py-3"

                            )}
                        >
                            <ul>
                                {posts.map((post) => (
                                    <li key={post.id} className="relative rounded-md py-3">
                                        <div className="text-white">{post.titlee}</div>

                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}