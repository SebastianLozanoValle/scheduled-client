import { AccordionItem, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";

export const CustomAccordionItem = ({ title, children }) => (
    <AccordionItem border={'none'} >
        <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight='bold'>
                {title}
            </Box>
        </AccordionButton>
        <AccordionPanel bg={'#ccc'} pb={4} borderBottomRadius={'2xl'}>
            {children}
        </AccordionPanel>
    </AccordionItem>
);