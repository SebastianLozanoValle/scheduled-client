import { Box, Heading, Text, Container, background, Button} from "@chakra-ui/react"
import { useMediaQuery } from "@chakra-ui/react";
import { CiSaveDown1 } from "react-icons/ci";
import zeus from '../assets/imagenes/zeus.png'

export const GuiaUsuario = () => {
    const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
return(

    <>
     <Box >
         < Box display={isSmallerThan760 ? 'none' : 'flex'}  width='100%' justifyContent='center' overflow='hidden'>
               <Box bg='#161c26' height='800px' backgroundSize='cover'  width='100%'  borderRadius='30px 30px 30px 30px' margin='20px 0px 20px 10px'>
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '90px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} >
                 Guia del
                 </Text>
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '100px'} paddingLeft={isSmallerThan760 ? '0px' : '160px'} >
                 Usuario
                 </Text>
                 <Box position='relative' display='flex' alignItems='center'> 
                 {/* <Text fontSize='20px'  color='white' m={8} Top='10vh'  textAlign='justify'> 
                     Bienvenido a Qurux, donde tu experiencia digital es nuestra prioridad. 
                     Esta guía del usuario está diseñada para proporcionarte una visión 
                     integral sobre cómo aprovechar al máximo nuestra plataforma y garantizar 
                     que disfrutes de todas las funciones y servicios que ofrecemos. ¡Comencemos!
                 </Text> */}
                 </Box>
                  <Box  overflow='hidden' width='100%'  display='flex' justifyContent='center' paddingRight='10px' marginTop='70px'marginLeft='10px' >
                        <a href="../public/GUIAUSUARIO.pdf" download="GUIAUSUARIO.pdf"><Button><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
                 
               </Box>
               <Box  margin='20px 10px 20px 0px' bg={`url(${zeus})`} backgroundSize='cover' display='flex' width='100%' backgroundPosition='center'  overflow='hidden'></Box>
         </Box>

         

         
         < Box display={isSmallerThan760 ? 'flex' : 'none'} bg='#161c26' height='100%' width='100%'   justifyContent='center'> 
               
               <Box  height='100%'  width='100%' padding='60px' >
                 
                 <Heading  color='white' fontSize={isSmallerThan760 ? '30px' : '60px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} textAlign='center'>
                 Guia del usuario 
                 </Heading>
                 {/* <Text color='white' margin='60px 30px 30px ' textAlign='center'> Bienvenido a Qurux, donde tu experiencia digital es nuestra prioridad. 
                     Esta guía del usuario está diseñada para proporcionarte una visión 
                     integral sobre cómo aprovechar al máximo nuestra plataforma y garantizar 
                     que disfrutes de todas las funciones y servicios que ofrecemos. ¡Comencemos!
                 </Text>  */}
                 <Box width='100%'  display='flex' justifyContent='center' paddingRight='10px' marginTop='70px'marginLeft='10px' >
                        <a href="../public/GUIAUSUARIO.pdf" download="GUIAUSUARIO.pdf"><Button bg='#fc3c3c'><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
              </Box>
               
         </Box>
     </Box> 
    </>
)

}
