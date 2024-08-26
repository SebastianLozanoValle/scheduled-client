export const PseudoCheckout = () => {

    return (
        link ?
            <div className="flex flex-col items-center justify-center h-screen">
                <a className="text-white bg-[#d3983f] rounded-xl px-10 py-4 text-5xl hover" target="_blank" href={link}>A Pagar</a>
            </div>
            :
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#d3983f]"></div>
                <h3>Conectando con la pasarela de pagos.</h3>
                <span>En Realidad esto es un PseudoCheckout por lo que Inhabilite el que tenia previamente conectado</span>
            </div>
    )
}