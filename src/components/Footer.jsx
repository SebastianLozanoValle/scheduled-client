import React from 'react';
import { Box, Center, Container, Flex, Img } from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from 'react-router-dom';


export const Footer = () => {
    const location = useLocation();
    const isDashboardRoute = location.pathname.split('/')[1] === 'dashboard';

    return (
        <Box ml={{ base: '0', md: isDashboardRoute ? '265px' : '0' }} w={{ base: '100vw', md: isDashboardRoute ? 'calc(100vw - 265px)' : '100vw' }} mb={{ base: '64px', md: '0' }}>
            <div>
                <footer>
                    <div className='p-10 bg-gray-800 text-gray-200'>
                        <div className='max-w-7xl mx-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                                <div className='mb-5'>
                                    <h4 className='text-2xl pb-4'>LOGO</h4>
                                    <p className='text-gray-500'>
                                        Lorem ipsum dolor sit amet <br />consectetur adipisicing eli <br /><br />
                                        <strong>telefono:</strong>+57565434 <br />
                                    </p>
                                </div>
                                <div className='mb-5'>
                                    <h4 className='text-2xl pb-5 text-gray-50 font-bold'>Explore</h4>
                                    <ul className='text-gray-500'>

                                        <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                            <i></i><a href="#" className='hover:text-white'>About Us</a>
                                        </li>
                                        <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                            <i></i><a href="#" className='hover:text-white'>My Account</a>
                                        </li>
                                        <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                            <i></i><a href="#" className='hover:text-white'>My Listings</a>
                                        </li>
                                        <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                            <i></i><a href="#" className='hover:text-white'>Pricing Packages</a>
                                        </li>
                                        <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                            <i></i><a href="#" className='hover:text-white'>User Dashboard</a>
                                        </li>
                                        <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                            <i></i><a href="#" className='hover:text-white'>Bookmarks</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='mb-5'>
                                    <h4 className='text-2xl pb-5 text-gray-50 font-bold'>Categories</h4>
                                    <ul className='text-gray-500'>

                                        <ul>
                                            <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                                <a href="#" className='hover:text-white'>Restaurant</a>
                                            </li>
                                            <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                                <a href="#" className='hover:text-white'>Culture</a>
                                            </li>
                                            <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                                <a href="#" className='hover:text-white'>Shopping</a>
                                            </li>
                                            <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                                <a href="#" className='hover:text-white'>Beauty</a>
                                            </li>
                                            <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                                <a href="#" className='hover:text-white'>Hotels</a>
                                            </li>
                                            <li className='pb-4 hover:scale-110 transition-transform duration-300'>
                                                <a href="#" className='hover:text-white'>Hospitals</a>
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                                <div className='mb-5'>
                                    <h4 className='text-2xl pb-5 text-gray-50 font-bold'>Newsletter</h4>
                                    <p className='text-gray-500'>88 Broklyn Golden Street, New York. USA</p>
                                    <p className='text-gray-500'>needhelp@ziston.com</p><br />

                                    <form className="flex flex-col items-center rounded-md p-4">
                                        <input
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder='Enter email address'
                                            className="mb-2 p-2 border border-gray-300 w-80 transition-background duration-300 ease-in-out hover:bg-gray-200 h-16 rounded-md"
                                        />
                                        <div>
                                            <button
                                                className="bg-red-700 hover:bg-gray-200 text-white font-semibold hover:text-black py-2 px-4 rounded-md w-80 transition-background duration-300 ease-in-out h-16"
                                            >
                                                SUBSCRIBE
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* parte de abajo */}
                    <div className='min-w-full bg-gray-900 text-gray-500 px-10'>
                        <div className='max-w-7xl flex flex-col sm:flex-row py-4 mx-auto justify-between items-center'>
                            <div className='text-center'>
                                <div>
                                    Copyright  <strong><span>Netword.solutions</span></strong>. All Rights Reserved
                                </div>
                            </div>
                        </div>
                        <div class=" text-right text xl mb-2">
                            <a href="#" class="h-10 w-10 rounded-full bg-white hover:bg-red-800 mx-1 inline-block pt-1"><FaFacebookF className='w-full h-full' /></a>
                            <a href="#" class="h-10 w-10 rounded-full bg-white hover:bg-red-800 mx-1 inline-block pt-1"><FaInstagram className='w-full h-full' /></a>
                            {/* <a href="#" class="h-10 w-10 rounded-full bg-white hover:bg-red-800 mx-1 inline-block pt-1"><Face/></a>
                        <a href="#" class="h-10 w-10 rounded-full bg-white hover:bg-red-800 mx-1 inline-block pt-1"><Face/></a> */}
                        </div>
                    </div>
                </footer>
            </div>
        </Box>
    )
};
