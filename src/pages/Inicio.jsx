import { Box, Heading, Text, Container } from "@chakra-ui/react"
import vino from '../assets/imagenes/sirviendo.jpg'
import barbero1 from '../assets/imagenes/barbero1.jpg'




export const Inicio = () => {
    return(
      <>
      
        <Box>
          <Box>
             <Heading color='#D4AF37' fontSize='10px'  textAlign='center'>AROUND THE WORD</Heading>
             <Heading fontSize='20px' textAlign='center'><b>Mundos</b></Heading>
             <Text textAlign='center' fontSize='12px'><b>Loren ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum</b></Text>
           </Box>

           <Container margin='100px 30px' display='flex' flexWrap='wrap' gap='60px' justifyContent='center'>
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

           <Container bg={`url(${barbero1})`} width='100%' height='200px'  backgroundSize='cover' display='flex' justifyContent='center' alignItems='center'
            fontSize='20px' backgroundPosition='center' position='relative'>
            <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.4)'></Box>
            <Text color='white' position='relative' fontSize='25px' width='300px' textAlign='center'>Explorar, comparar, reservar y pagar en linea.</Text>
           </Container>

           <Container height='300px'></Container>

         </Box>
      </>
    
    )
    
}