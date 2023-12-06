import React from 'react';
import { Box } from '@chakra-ui/react';

export const GeneralBox = ({ w, h, flex, children }) => {
    return (
        <Box w={w} h={h} flex={flex} color='white' bg='rgba(255, 255, 255, 0.5)'
            p={4}
            borderRadius={8}
            borderLeft='solid 1 px rgba(255, 255, 255, 0.5)'
            borderTop='solid 1 px rgba(255, 255, 255, 0.5)'
            boxShadow='-5px 0px 10px rgba(255, 255, 255, 0.5)'
        >
            {children}
        </Box>
    )
}

export default GeneralBox;
