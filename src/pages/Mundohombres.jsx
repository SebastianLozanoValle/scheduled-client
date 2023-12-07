import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import barbero1 from '../assets/imagenes/barbero1.jpg'
 



export const Mundohombres = () => {
  


return(

     <>
       <Box>
          <Box bg={`url(${barbero1})`}   backgroundPosition='center'  position='relative' height='400px' justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'>
            <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.3)'></Box>
            <Box display='flex' position='relative'  paddingTop='40px' gap='30px' color='#D4AF37' justifyContent='left' paddingLeft='60px'>
              <Box width='150px'><a href='Mundohombres'><Heading fontSize='18px' fontFamily='wraper' borderBottom='1px solid black' textAlign='center' _hover={{ background: 'red',  borderRadius: '8px', width: '160px'}}>Mundo hombres</Heading></a></Box>
              <Box width='140px'><a href='Mundomujeres'><Heading fontSize='18px'fontFamily='wraper' borderBottom='1px solid black'textAlign='center' _hover={{ background: 'red',  borderRadius: '8px', width: '140px' }} >Mundo mujeres</Heading></a></Box>
              <Box width='150px'><a href='Mundomascotas'><Heading fontSize='18px' fontFamily='wraper' borderBottom='1px solid black' textAlign='center' _hover={{ background: 'red',  borderRadius: '8px', width: '160px' }}>Mundo mascotas</Heading></a></Box>
              </Box>

              <Box display='flex' justifyContent='center' alignItems='end' height='300px'>
                <Box position='relative'>
                  <Heading textAlign='center' color='white'><b>Mundo hombres</b></Heading>
                  <a href='/'><Text position='relative' textAlign='center' fontSize='15px' color='white'>inicio</Text></a>
               </Box>
              </Box>

          </Box>
          
       </Box>
     </>
 
 )

}
