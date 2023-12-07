import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
      brand: {
        primary: '#caa776',
        secondary: '#707070',
        terciary: '',
        background: '#DCDCDC',
      },
    },
    components: {
      Link: {
        baseStyle: {
          _hover:{
            textDecoration: 'none',
          }
        },
      },
      Menu:{
        baseStyle: {
          list: {
            border: 'none',
            bg: "#212024",
            color: "black",
          },
        },
      },
      Button: {
        baseStyle: {
          bg: "green",
          _active: {
            color: "#caa776",
          },
          _hover: {
            bg: "#212024",
            color: "black",
          },
          px: 6,
        },
      },
      // MenuItem: {
      //   baseStyle: {
      //     color: 'inherit',
      //     bg: 'red',
      //     _hover: {
      //       bg: "teal.600",
      //     },
      //   },
      // },
    },
  });
  
  export default theme;