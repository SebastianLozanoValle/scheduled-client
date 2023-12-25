import imagenGenerica from '../assets/imagenes/peluqueria.jpg'

export const TarjetaSpecialista = ({ especialista }) => {
    return (
        <div className="h-full w-[400px] m-2 flex-shrink-0">
            <div className="rounded-3xl overflow-hidden mb-4 relative h-[250px]">
                <img src={especialista.avatar? especialista.avatar : imagenGenerica} alt="" />
                <span className='absolute top-3 left-4 border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100'>
                    {especialista.specialtys.map((especialidad) => (
                        `|${especialidad}|`
                    ))    
                    }
                </span>
            </div>
            <div className="px-4 flex gap-4">
                <img className='object-cover w-12 h-12 rounded-full' src={especialista.avatar? especialista.avatar : imagenGenerica} alt="" />
                <div className="flex flex-col gap-2 w-full">
                    <h3 className='text-lg font-bold text-slate-700 leading-7 whitespace-normal'>
                        {especialista.username}
                    </h3>
                    <div className="flex gap-4">
                        <p className='text-sm text-slate-800 font-semibold'>{especialista.username}</p>
                        <p className='text-sm text-gray-500 font-normal'>{especialista.date? especialista.date : "19-04-2023"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}