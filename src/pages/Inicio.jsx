import { Box, Heading, Text, Container } from "@chakra-ui/react"
import vino from '../assets/imagenes/sirviendo.jpg'
import barbero1 from '../assets/imagenes/barbero1.jpg'
import { MdTouchApp } from "react-icons/md";
import blancoynegro from'../assets/imagenes/blancoynegro.jpg'
import { LuLassoSelect } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Sub } from "../components/SubNav";



export const Inicio = () => {
    return(
      <>
         <Sub/>
        <Box>
        
          <Box marginTop='100px'>
             <Heading color='#D4AF37' fontSize='10px'  textAlign='center'>AROUND THE WORD</Heading>
             <Heading fontSize='20px' textAlign='center'><b>Mundos</b></Heading>
             <Text textAlign='center' fontSize='12px'><b>Loren ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum</b></Text>
           </Box>

           <Container margin='100px 0px ' display='flex'  gap='60px'  flexWrap='wrap' justifyContent='center' maxW='100%'>
              <Box  bg={`url(${vino})`}
              width='300px'
              height='300px'
              backgroundSize='cover' 
              display='flex'
              justifyContent='center'
              alignItems='end'
              borderRadius='0px 20px 0px 20px'>
              <a href='Mundohombres'><Text color='white' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>HOMBRES</b></Text></a>

              </Box>

              <Box  bg={`url(${vino})`}
              width='300px'
              height='300px'
              backgroundSize='cover' 
              display='flex'
              justifyContent='center'
              alignItems='end'
              borderRadius='20px 0px 20px 0px'>
              <a href='Mundomujeres'><Text color='white' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>MUJERES</b></Text></a>

             </Box>

             <Box  bg={`url(${vino})`}
              width='300px'
              height='300px'
              backgroundSize='cover' 
              display='flex'
              justifyContent='center'
              alignItems='end'
              borderRadius='20px 0px 20px 0px'>
              <a href='Mundomascotas'><Text color='white' paddingBottom='20px'><Heading color='#D4AF37' fontSize='9px' textAlign='center'><b>MUNDO</b></Heading><b>MASCOTAS</b></Text></a>

             </Box>
           </Container>

           <Container bg={`url(${barbero1})`}  height='200px'  backgroundSize='cover' display='flex' justifyContent='center' alignItems='center'
            fontSize='20px' backgroundPosition='center' position='relative' maxWidth='100%'>
            <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.4)'></Box>
            <Text color='white' position='relative' fontSize='25px' width='300px' textAlign='center'>Explorar, comparar, reservar y pagar en linea.</Text>
           </Container>
           
           <Box bg={`url(${blancoynegro})`}  height='100%'  width='auto' marginTop='80px'>
              <Box height='100px'>
              <Heading  marginTop='40px' color='black' textAlign='center' fontSize='32px' >COMO FUNCIONA QURUX</Heading><Text color='black' textAlign='center' >Lorem ipsum dolor amet, cibo mundi ea duo, vim exerci phaedrum</Text>
              </Box>
             <Container
              display='flex'
              alignItems='center'
              height="auto"
              left="25%"
              maxW='auto'
              marginTop='40px'
              justifyContent='center'>
                <iframe
                width="700px"
                height='300px'
                src="https://www.youtube.com/embed/TU_yrUe7P2Y"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
              </Container>
              <Box display='flex' justifyContent='center' gap='100px' flexWrap='wrap' height='400px' alignItems='center'>
              <Box display='flex' flexDirection='column' alignItems='center' width='100px' ><MdTouchApp fontSize='40px'></MdTouchApp><Heading marginTop='20px' fontSize='14px' textAlign='center'>Elige el mundo del servicio</Heading><Text fontSize='10px' textAlign='center' color='white' marginTop='20px'>Mascotas,Mujeres,Hombres</Text></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='100px' marginTop='25px'><LuLassoSelect fontSize='40px'></LuLassoSelect><Heading marginTop='20px' fontSize='14px' textAlign='center'>Selecciona los servicios deseados</Heading><Text fontSize='10px' textAlign='center' color='white' marginTop='20px'>Puedes escoger mas de uno</Text></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='100px' marginTop='35px'><FaMapMarkerAlt fontSize='40px'></FaMapMarkerAlt ><Heading marginTop='20px' fontSize='14px' textAlign='center'>Escoge la ubicacion del servicio</Heading><Text fontSize='10px' textAlign='center' color='white' marginTop='20px'>si es adomicilio tu especilista debera ser del mismo distrito</Text></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='100px' marginTop='25px'><LuLassoSelect fontSize='40px'></LuLassoSelect><Heading marginTop='20px' fontSize='14px' textAlign='center'>Selecciona los servicios deseados</Heading><Text fontSize='10px' textAlign='center' color='white' marginTop='20px'>Puedes escoger mas de uno</Text></Box>
              </Box> 
           </Box>
         
           <Box height='200px'></Box>
       </Box>
     </>
    
    )
    
}