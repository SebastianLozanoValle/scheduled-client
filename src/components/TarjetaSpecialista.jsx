// import { Link, Navigate } from 'react-router-dom'
// import imagenGenerica from '../assets/imagenes/peluqueria.jpg'

// export const TarjetaSpecialista = ({ especialista, paramsToSearch }) => {
//     return (
//         <div className="h-auto w-auto m-2 flex-shrink-0">
//             <div className="rounded-3xl mb-4 relative">
//                 <div className=''>
//                     <img className='rounded-xl h-auto w-auto m-auto sm:max-w-md' src={
//                         especialista.files.length > 0 ?
//                             especialista.files.find(file => file.filename.includes("Local")) !== undefined ?
//                                 "http://localhost:33402/files/" + especialista.files.find(file => file.filename.includes("Local")).filename :
//                                 imagenGenerica :
//                             imagenGenerica
//                     } alt="" />
//                 </div>
//                 <div className='absolute sm:flex top-3 left-4 border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100'>
//                     {especialista.specialtys.map((especialidad, index) => (
//                         especialidad.state && <span key={especialista.id + index} className='block'>|{especialidad.name}|</span>
//                     ))
//                     }
//                 </div>
//             </div>
//             <div className="px-4 sm:flex gap-4 pt-2">
//                 <img className='object-cover w-12 h-12 rounded-full' src={especialista.avatar ? especialista.avatar : imagenGenerica} alt="" />
//                 <div className="sm:flex flex-col gap-2 w-full">
//                     <h3 className='text-lg font-bold text-slate-700 leading-7 whitespace-normal py-2'>
//                         {especialista.username}  {especialista.serviceType}
//                     </h3>
//                     <div className="sm:flex gap-4 w-full justify-between">
//                         <p className='text-sm text-slate-800 font-semibold py-2'>{especialista.username}</p>
//                         <p className='text-sm text-gray-500 font-normal py-2'>{especialista.date ? especialista.date : "19-04-2023"}</p>
//                         <Link to={`/agendar-especialista/${especialista.id}/${paramsToSearch}`}><button className='text-sm text-[#161c26] font-bold px-4 py-2 bg-white rounded-lg hover:bg-[#161c26] hover:text-[#d3983f] transition-all duration-500'>Agendar </button></Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { Link, Navigate } from 'react-router-dom'
import imagenGenerica from '../assets/imagenes/peluqueria.jpg'

export const TarjetaSpecialista = ({ especialista, paramsToSearch }) => {
    return (
        <div className="h-auto w-auto m-2 flex-shrink-0 flex">
            <div className="rounded-3xl mb-4 relative hidden sm:block">
                <div className=''>
                    <img className='bg-[#e2e8f0] rounded-xl h-48 w-auto object-cover m-auto sm:max-w-md' src={
                        especialista.files.length > 0 ?
                            especialista.files.find(file => file.filename.includes("Local")) !== undefined ?
                                "http://localhost:33402/files/" + especialista.files.find(file => file.filename.includes("Local")).filename :
                                imagenGenerica :
                            imagenGenerica
                    } alt="" />
                </div>
            </div>
            <div className="px-4 sm:flex gap-4 pt-2 sm:w-[380px]">
                <img className='object-cover w-12 h-12 rounded-full' src={
                    especialista.files.length > 0 ?
                        especialista.files.find(file => file.filename.includes("ProfilePicture")) !== undefined ?
                            "http://localhost:33402/files/" + especialista.files.find(file => file.filename.includes("ProfilePicture")).filename :
                            imagenGenerica :
                        imagenGenerica
                } alt="" />
                <div className="sm:flex flex-col gap-2 w-full">
                    <h3 className='text-lg font-bold text-slate-700 leading-7 whitespace-normal py-2'>
                        {especialista.username}
                    </h3>
                    <div className="sm:flex gap-4 w-full justify-between">
                        <p className='text-sm text-slate-800 font-semibold py-2'>{especialista.city}</p>
                        <p className='text-sm text-slate-800 font-normal py-2'>{especialista.serviceType}</p>
                        <Link to={`/agendar-especialista/${especialista.id}/${paramsToSearch}`}><button className='text-sm text-[#161c26] font-bold px-4 py-2 bg-white rounded-lg hover:bg-[#161c26] hover:text-[#d3983f] transition-all duration-500'>Agendar </button></Link>
                    </div>
                    <h3 className='text-slate-800'>Servicios:</h3>
                    <div className='sm:flex sm:flex-wrap border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold bg-blue-100 gap-4'>
                        {especialista.specialtys.map((especialidad, index) => (
                            especialidad.state && <span key={especialista.id + index} className='block'>{especialidad.name}. </span>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
