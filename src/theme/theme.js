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
      MenuButton: {
        baseStyle: {
          _active: {
            bg: "red.500",
            color: "white",
          },
          px: 6,
        },
      },
      MenuItem: {
        baseStyle: {
          _hover: {
            bg: "teal.600",
          },
        },
      },
    },
  });
  
  export default theme;