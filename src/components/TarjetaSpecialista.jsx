import imagenGenerica from '../assets/imagenes/peluqueria.jpg'

export const TarjetaSpecialista = ({ especialista }) => {
    return (
        <div className="h-full w-[400px] m-2 flex-shrink-0">
            <div className="rounded-3xl mb-4 relative h-[250px]">
                <img className='rounded-xl' src={especialista.avatar? especialista.avatar : imagenGenerica} alt="" />
                <span className='absolute top-3 left-4 border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100'>
                    {especialista.specialtys.map((especialidad) => (
                        `|${especialidad}|`
                    ))    
                    }
                </span>
            </div>
            <div className="px-4 flex gap-4 pt-2">
                <img className='object-cover w-12 h-12 rounded-full' src={especialista.avatar? especialista.avatar : imagenGenerica} alt="" />
                <div className="flex flex-col gap-2 w-full">
                    <h3 className='text-lg font-bold text-slate-700 leading-7 whitespace-normal py-2'>
                        {especialista.username}
                    </h3>
                    <div className="flex gap-4 w-full justify-between">
                        <p className='text-sm text-slate-800 font-semibold py-2'>{especialista.username}</p>
                        <p className='text-sm text-gray-500 font-normal py-2'>{especialista.date? especialista.date : "19-04-2023"}</p>
                        <button className='text-sm text-[#161c26] font-bold px-4 py-2 bg-white rounded-lg hover:bg-[#161c26] hover:text-[#d3983f] transition-all duration-500'>Agendar </button>
                    </div>
                </div>
            </div>
        </div>
    )
}