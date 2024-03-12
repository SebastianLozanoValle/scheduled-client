import { useEffect, useState } from "react";
import { BsCashStack } from "react-icons/bs";

export const Service = ({ servicio, register, onServiceCheck }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
        onServiceCheck(servicio);
    };

    useEffect(() => {

    }, []);

    return (
        <label className={`flex flex-col w-full xl:w-1/4 relative p-10 gap-8 border-solid border-8 rounded-3xl ${isChecked ? 'border-primary' : ''} xl:hover:border-primary transition-all duration-500`} key={servicio.name}>
            <input className="absolute bottom-1 right-1 " type="checkbox" {...register(`selectedServices.${servicio.name}`)}
                value={servicio.name}
                onChange={handleCheck}
            />
            <span className="font-bold">{servicio.name}</span>
            <span className="font-bold">Descripcion</span>
            <span className="">{servicio.description}</span>
            <span className=""><span className="font-bold">Duracion: </span>{servicio.time}</span>
            <div className="flex items-center gap-2">
                <span className="font-extrabold">{servicio.price}</span><BsCashStack className="text-[#6bbd4a] text-3xl" />
            </div>
        </label>
    );
}