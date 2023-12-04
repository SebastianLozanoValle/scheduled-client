import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            primary: '#BF292E',
            secondary: '#707070',
            terciary: '',
            background: '#DCDCDC',
        },
    },
    components: {
        Link: {
            baseStyle: {
                textDecoration: 'none',
            },
        },
    },
});

export default theme;