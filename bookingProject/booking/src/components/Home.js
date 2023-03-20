import React from 'react';
import Navbar1 from './NavBar1';

export const Home = () => {
    return (
        <>
            <Navbar1/>
            <div className={'bg-[url(./images/bg.jpg)]  w-full  py-2 bg-cover bg-no-repeat bg-center h-screen flex items-center px-40'}>
                <div className='uppercase text-white font-extrabold'>
                    <h1 className='text-5xl'>Book Taxi With Blockchain</h1>
                </div>
            </div>
        </>
    );
};

export default Home;
