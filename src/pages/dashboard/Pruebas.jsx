import { Box, Flex } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { SpecialistCard } from '../../components/SpecialistCard'
import { CustomCard } from '../../components/CustomCard'
  

export const Pruebas = () => {
    return (
        <Box p={6} bg="black" w="100vw" color="white" mx="auto">
            <Box justify='center' align='center' ml={{base:'' ,md: '265px' }}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <h1 className="text-3xl font-bold underline mb-5">
                        Pruebas
                    </h1>

                    <CustomCard/>

                </Box>
            </Box>
        </Box>
    )
}