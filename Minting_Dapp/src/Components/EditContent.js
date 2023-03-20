import React from 'react'

import { CiCircleInfo } from 'react-icons/ci'
import { BsFillCaretUpFill } from 'react-icons/bs'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { TbArrowBackUp } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'
import Display from '../Display'
import Tabs from './Tabs'
import {Link} from 'react-router-dom'
const EditContent = () => {
    return (
        <div className='bg-[#1e1e1e] h-full'>

            <div className='text-white flex justify-between sm:mx-8 mx-4 my-2 bg-[#1e1e1e] py-2'>

              <Link to='/browse'>  <h1 className='my-auto text-gray-300 text-lg flex gap-2'><TbArrowBackUp className='my-auto' />Back</h1></Link>

                <Display/>

            </div>
            <div className='flex justify-center'>
                <div>
                    <div className='flex sm:gap-24 gap-16 justify-left my-20 sm:mx-10 mx-2'>
                        <div>
                            <p className='text-center  text-[#c0cfc7]  text-lg bg-[#1e1e1e] opacity-[70%]'>NFT#123</p>
                            <div className='rounded-full  bg-[#2d2f2d] text-xs text-[#cdcfc7] w-[99px] h-[18px] mx-auto'><p>Owner: You</p></div>
                        </div>
                        <div className='my-auto flex gap-2'>
                            <p className='text-center  text-[#c0cfc7]  text-lg bg-[#1e1e1e] opacity-[70%] my-auto'>Size Remaining:</p><p className='text-[#c0cfc7] text-2xl my-auto'>10kg</p>
                        </div>
                    </div>
                    <div className='pb-0.5 bg-[#c0cfc7]  opacity-[10%] ' />
                    <Tabs />

                </div>

            </div>


        </div>

    )
}

export default EditContent