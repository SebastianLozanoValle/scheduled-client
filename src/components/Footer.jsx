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
        <footer>
            <Box ml={{base:'0' ,md: isDashboardRoute ? '265px': '0' }} w={{base:'100vw' ,md: isDashboardRoute ? 'calc(100vw - 265px)': '100vw' }}>
                <Box bg="black" height='450px'>
                    <Container minW='90vw'>

                        <Flex display='flex'
                        justifyContent='center'
                        alignItems='center'
                        >

                            {/*<Img*/}
                            
                            <Box
                                paddingTop='10px'
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                color='white'
                                textAlign='center'
                                margin='0px'
                                height='100%'
                                gap='190px'
                                marginTop='60px'
                            
                            >
                                <Box  fontSize='15px'>
                                <a href= "/">Inicio</a><br/>
                                <a href='/Mundohombres'>Mundo hombre</a><br/>
                                <a href= "Mundomujeres">Mundo mujer</a><br/>
                                <a href= "Mundomascotas">Mundo mascotas</a><br/>
                                </Box>
                                <Box fontSize='15px'>
                                <a href= "/">Inicio</a><br/>
                                <a href='Mundohombres'>Mundo hombre</a><br/>
                                <a href= "Mundomujeres">Mundo mujer</a><br/>
                                <a href= "Mundomascotas">Mundo mascotas</a><br/>
                                </Box>
                                <Box fontSize='15px'>
                                <a href= "/">Inicio</a><br/>
                                <a href='Mundohombres'>Mundo hombre</a><br/>
                                <a href= "Mundomujeres">Mundo mujer</a><br/>
                                <a href= "Mundomascotas">Mundo mascotas</a><br/>
                                </Box>
                                
                            </Box>

                    </Flex>
                    
                    
                        <Box textAlign='center' justifyContent='center'   color='white' marginTop='90px' fontSize='14px' >
                            <Container width='auto' display='flex' gap='40px' justifyContent='center' alignItems='center' paddingBottom='40px'>
                            <a target='_blank' href="https://www.facebook.com/mcshipbrokers/?locale=es_LA"><Box fontSize='40px' color='gold'>{<FaFacebookF />}</Box></a>
                            <a target='_blank' href="https://www.linkedin.com/company/2879222/admin/feed/posts/"><Box fontSize={'40px'} color='gold'>{<CiLinkedin />}</Box></a>
                            <a target='_blank' href="https://www.instagram.com/mcshipbrokersint/"><Box fontSize={'40px'} color='gold'>{<FaInstagram />}</Box></a>
                        </Container>
                            &copy; 2023 Qurux, Todos los derechos reservados <br/>
                            Create By: Netword<br/>
                            <a href='mailto:networdcol@gmail.com'>networdcol@gmail.com</a>
                        </Box>
                </Container>
                    
                </Box>
            </Box>
        </footer>
    )
};
