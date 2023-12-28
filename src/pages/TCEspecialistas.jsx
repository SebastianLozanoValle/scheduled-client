import { Box, Heading, Text, Container, background, Button} from "@chakra-ui/react"
import { useMediaQuery } from "@chakra-ui/react";
import { CiSaveDown1 } from "react-icons/ci";
import poseidon from '../assets/imagenes/poseidon.png'

export const TCEspecialistas = () => {
    const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
return(

    <>
     <Box >
         < Box display={isSmallerThan760 ? 'none' : 'flex'}  width='100%' justifyContent='center' overflow='hidden'>
               <Box bg='#161c26' height='800px' backgroundSize='cover'  width='100%'  borderRadius='30px 30px 30px 30px' margin='20px 0px 20px 10px'>
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '70px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} >
                 Terminos y 
                 </Text>
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '80px'} paddingLeft={isSmallerThan760 ? '0px' : '80px'} >
                 Condiciones Especilistas
                 </Text>
                 <Box position='relative'> 
                 <Text fontSize='19px'  color='white' m={8} Top='9vh'  textAlign='justify'> 
                 Bienvenido al equipo de Qurux. Estamos emocionados de tenerte como parte fundamental de 
                 nuestra comunidad laboral. Antes de comenzar tu experiencia con nosotros, es esencial 
                 comprender y aceptar los siguientes términos y condiciones que rigen nuestra relación laboral.
                 </Text>
                 </Box>
                  <Box width='100%'  display='flex' justifyContent='center' paddingRight='10px' marginTop='60px'marginLeft='10px' >
                        <a href="../public/TCPROFESIONALES.pdf" download="TCPROFESIONALES.pdf"><Button><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
                 
               </Box>
               <Box  margin='20px 10px 20px 0px' bg={`url(${poseidon})`} backgroundSize='cover' display='flex' width='100%' backgroundPosition='center'  overflow='hidden'></Box>
         </Box>

         

         
         < Box display={isSmallerThan760 ? 'flex' : 'none'} bg='#161c26' height='100%' width='100%'   justifyContent='center'> 
               
               <Box  height='100%'  width='100%' padding='60px' >
                 
                 <Heading  color='white' fontSize={isSmallerThan760 ? '30px' : '60px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} textAlign='center'>
                 Terminos y condiciones especialistas
                 </Heading>
                 <Text color='white' margin='60px 30px 30px ' textAlign='center'>  Bienvenido al equipo de Qurux. Estamos emocionados de tenerte como parte fundamental de 
                 nuestra comunidad laboral. Antes de comenzar tu experiencia con nosotros, es esencial 
                 comprender y aceptar los siguientes términos y condiciones que rigen nuestra relación laboral.
                 </Text> 
                 <Box width='100%'  display='flex' justifyContent='center' paddingRight='10px' marginTop='70px'marginLeft='10px' >
                        <a href="../public/TCPROFESIONALES.pdf" download="TCPROFESIONALES.pdf"><Button bg='#fc3c3c'><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
              </Box>
               
         </Box>
     </Box> 
    </>
)

}
