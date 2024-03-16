import { useEffect, useState } from "react";
import { BsCashStack } from "react-icons/bs";
import { GiHairStrands } from "react-icons/gi";

export const Service = ({ especialista, servicio, register, onServiceCheck }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
        onServiceCheck(servicio);
    };

    useEffect(() => {

    }, []);

    return (
        <label className={`flex flex-wrap justify-center items-center w-full relative p-10 xl:p-20 gap-8 border-solid border-8 rounded-3xl ${isChecked ? 'border-primary' : ''} xl:hover:border-primary transition-all duration-500`} key={servicio.name}>
            <input className="absolute bottom-1 right-1 sr-only" type="checkbox" {...register(`selectedServices.${servicio.name}`)}
                value={servicio.name}
                onChange={handleCheck}
            />
            <GiHairStrands className="text-6xl text-primary" />
            <span className={`absolute bottom-4 xl:bottom-[calc(50%-20px)] right-4 h-10 w-10 rounded-full shadow-md shadow xl:hover:bg-primary transition-all duration-500 ${isChecked ? 'bg-primary' : 'bg-[#e2e8f0]'}`}></span>
            <div className="flex flex-col justify-start w-[200px]">
                <span className="font-bold">Servicio</span>
                <span className="">{servicio.name}</span>
            </div>
            <div className="flex flex-col justify-start w-[200px]">
                <span className="font-bold">Descripcion</span>
                <span className="">{servicio.description}</span>
            </div>
            <div className="flex flex-col justify-start w-[200px]">
                <span className="font-bold">Duracion: </span>
                <span className="">{servicio.time}</span>
            </div>
            <div className="flex flex-col justify-start w-[200px]">
                <span className="font-bold">Precio: </span>
                <div className="flex items-center gap-2">
                    <span className="font-extrabold">{servicio.price}</span><BsCashStack className="text-[#6bbd4a] text-3xl" />
                </div>
            </div>
        </label>
    );
}