import { Box, Heading, Text, Container, background, Button} from "@chakra-ui/react"
import { useMediaQuery } from "@chakra-ui/react";
import { CiSaveDown1 } from "react-icons/ci";
import medusa from '../assets/imagenes/medusa.png'

export const Guiaespecialista = () => {
    const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
return(

    <>
     <Box >
         < Box display={isSmallerThan760 ? 'none' : 'flex'}  width='100%' justifyContent='center' overflow='hidden'>
               <Box bg='#161c26' height='800px' backgroundSize='cover'  width='50%'  borderRadius='30px 30px 30px 30px' margin='20px 0px 20px 10px' >
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '90px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} >
                 Guia para 
                 </Text>
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '100px'} paddingLeft={isSmallerThan760 ? '0px' : '80px'} >
                 Especialistas
                 </Text>
                 <Box position='relative'> 
                 <Text fontSize='22px' margin='20px 20px 0px 20px ' color='white' m={8} Top='10vh'  textAlign='justify'> 
                        Le damos la bienvenida al sistema Qurux, una herramienta que facilitará su trabajo de manera eficiente.
                        Para comprender mejor nuestro modo de trabajo, le invitamos a descargar el siguiente documento
                 </Text>
                 </Box>
                  <Box width='100%'  display='flex' justifyContent='center' paddingRight='10px' marginTop='70px'marginLeft='10px' >
                        <a href="../public/GUIA.pdf" download="GUIA.pdf"><Button><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
                 
               </Box>
               <Box  bg={`url(${medusa})`} backgroundSize='cover' display='flex' width='500px' backgroundPosition='center'  overflow='hidden'></Box>
         </Box>

         

         
         < Box display={isSmallerThan760 ? 'flex' : 'none'} bg='#161c26' height='100%' width='100%'   justifyContent='center'> 
               
               <Box  height='100%'  width='100%' padding='60px' >
                 
                 <Heading  color='white' fontSize={isSmallerThan760 ? '30px' : '60px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} textAlign='center'>
                 Guia para  Especialistas
                 </Heading>
                 <Text color='white' margin='60px 30px 30px ' textAlign='center'> Le damos la bienvenida al sistema Qurux, una herramienta que facilitará su trabajo de manera eficiente.
                        Para comprender mejor nuestro modo de trabajo, le invitamos a descargar el siguiente documento
                 </Text> 
                 <Box width='100%'  display='flex' justifyContent='center' paddingRight='10px' marginTop='70px'marginLeft='10px' >
                        <a href="../public/GUIA.pdf" download="GUIA.pdf"><Button bg='#fc3c3c'><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
              </Box>
               
         </Box>
     </Box> 
    </>
)

}
