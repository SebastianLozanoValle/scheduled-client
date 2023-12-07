import { Box } from "@chakra-ui/react"
import { GeneralDesktop } from "./desktop/GeneralDesktop"

const reseñas = [
    {
        title: "Excelente producto",
        text: "Me encanta este producto. Es de alta calidad y cumple con todas mis expectativas.",
        user: "Usuario1",
        rating: 5,
        date: "01/01/2022, 10:30"
    },
    {
        title: "Buen producto",
        text: "Este producto es bueno. Funciona bien y tiene un precio razonable.",
        user: "Usuario2",
        rating: 4,
        date: "02/01/2022, 14:45"
    },
    {
        title: "Regular producto",
        text: "No estoy muy impresionado con este producto. No cumple completamente con lo que esperaba.",
        user: "Usuario3",
        rating: 3,
        date: "03/01/2022, 09:15"
    },
    {
        title: "Producto decepcionante",
        text: "No recomendaría este producto. No funciona como se describe y la calidad es baja.",
        user: "Usuario4",
        rating: 2,
        date: "04/01/2022, 16:20"
    },
    {
        title: "Mala experiencia",
        text: "Este producto es terrible. No funciona en absoluto y es una completa pérdida de dinero.",
        user: "Usuario5",
        rating: 1,
        date: "05/01/2022, 11:10"
    }
];

export const General = ({ isMobile }) => {
    return (
        <Box p={6} bg='black' w='100vw' color='white' mx='auto'>
            {isMobile ? <h1>General Mobile</h1> : <GeneralDesktop reseñas={reseñas} />}
        </Box>
    )
}