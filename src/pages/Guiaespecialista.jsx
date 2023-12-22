import { Box, Heading, Text, Container, background, Button} from "@chakra-ui/react"
import { useMediaQuery } from "@chakra-ui/react";
import { CiSaveDown1 } from "react-icons/ci";
import medusa from '../assets/imagenes/medusa.png'

export const Guiaespecialista = () => {
    const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
return(

    <>
     <Box width='100%' backgroundSize='cover' position='relative'>
         < Box display={isSmallerThan760 ? 'none' : 'flex'} gap='90px' width='100%'>
               <Box bg='#161c26' height='800px' backgroundSize='cover'  width='800px' position='relative' borderRadius='0px 30px 30px 0px'   >
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '90px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} >
                 Guia para 
                 </Text>
                 <Text fontFamily="Tangerine, cursive" color='white' fontSize={isSmallerThan760 ? '40px' : '100px'} paddingLeft={isSmallerThan760 ? '0px' : '80px'} >
                 Especialistas
                 </Text>
                 <Box position='relative'> 
                 <Text fontSize='22px' margin='20px 20px 0px 20px ' color='white' marginTop='10vh' marginRight='40vw' textAlign='justify'> 
                        Le damos la bienvenida al sistema Qurux, una herramienta que facilitará su trabajo de manera eficiente.
                        Para comprender mejor nuestro modo de trabajo, le invitamos a descargar el siguiente documento
                 </Text>
                 </Box>
                  <Box width='100%'  display='flex' justifyContent='left' paddingRight='10px' marginTop='70px'marginLeft='10px' >
                        <a href="../public/GUIA.pdf" download="GUIA.pdf"><Button><CiSaveDown1  fontSize='30px'/></Button></a>
                 </Box>
               </Box>
                <Box  position='absolute' display='flex'  justifyContent='center' width='100%' height='100%' paddingLeft='390px' marginLeft='10px' overflow='hidden' >
                 <img src={medusa} ></img>
              </Box>
         </Box>

         

         
         < Box display={isSmallerThan760 ? 'flex' : 'none'} gap='90px'>
               
               <Box bg='#161c26' height='100vh'  width='100%'>
                 
                 <Text paddingTop='90px' color='white' fontSize={isSmallerThan760 ? '40px' : '60px'} paddingLeft={isSmallerThan760 ? '0px' : '40px'} textAlign='center'>
                 Guia para  Especialistas
                 </Text>

              </Box>
               
         </Box>
     </Box> 
    </>
)

}
