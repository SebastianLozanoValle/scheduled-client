import { AccordionItem, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";

export const CustomAccordionItem = ({ title, children }) => (
    <AccordionItem>
        <AccordionButton>
            <Box flex="1" textAlign="left">
                {title}
            </Box>
        </AccordionButton>
        <AccordionPanel pb={4}>
            {children}
        </AccordionPanel>
    </AccordionItem>
);