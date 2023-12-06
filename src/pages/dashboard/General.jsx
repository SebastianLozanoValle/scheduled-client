import { Box } from "@chakra-ui/react"
import { GeneralDesktop } from "./desktop/GeneralDesktop"

export const General = ({ isMobile }) => {
    return (
        <Box ml='265px' p={6}>
            {isMobile ? <h1>General Mobile</h1> : <GeneralDesktop />}
        </Box>
    )
}