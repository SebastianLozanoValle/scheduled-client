import { Box } from "@chakra-ui/react"
import { GeneralDesktop } from "./desktop/GeneralDesktop"

export const General = ({ isMobile }) => {
    return (
        <Box p={6} bg='black' w='100vw' color='white'>
            {isMobile ? <h1>General Mobile</h1> : <GeneralDesktop />}
        </Box>
    )
}