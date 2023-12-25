import { useQuery } from "@apollo/client";
import { TarjetaSpecialista } from "./TarjetaSpecialista";
import { useState, useEffect, useRef, createRef } from 'react';
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from "react-icons/ri";
import { GET_SPECIALISTS } from "../pages/dashboard/Especialistas";

export const Destacados = () => {
    const { loading, error, data } = useQuery(GET_SPECIALISTS);

    const especialistas = data?.findSpecialists || [];
    const [activeSpecialist, setActiveSpecialist] = useState(especialistas[0]);
    const specialistsBox = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [specialistsRefs, setSpecialistsRefs] = useState({});

    useEffect(() => {
        if (especialistas.length > 0) {
            const refs = especialistas.reduce((acc, value, index) => {
                acc[index] = createRef();
                return acc;
            }, {});
            setSpecialistsRefs(refs);
        }
    }, [especialistas]);

    const handleIcons = (scrollVal) => {
        let maxScrollableWidth = specialistsBox.current.scrollWidth - specialistsBox.current.clientWidth;
        // Aquí puedes manejar la visibilidad de tus iconos de flecha
    }

    const dragging = (e) => {
        if(!isDragging) return;
        specialistsBox.current.scrollLeft -= e.movementX;
        handleIcons(specialistsBox.current.scrollLeft)
    }

    const dragStop = () => {
        setIsDragging(false);
    }

    const scrollSpecialists = (direction) => {
        const currentIndex = especialistas.indexOf(activeSpecialist);
        if (direction === 'left' && currentIndex > 0) {
            setActiveSpecialist(especialistas[currentIndex - 1]);
        } else if (direction === 'right' && currentIndex < especialistas.length - 1) {
            setActiveSpecialist(especialistas[currentIndex + 1]);
        }
    }

    useEffect(() => {
        const box = specialistsBox.current;
        if (box) {
            box.addEventListener("mousedown", () => setIsDragging(true));
            box.addEventListener("mousemove", dragging);
            document.addEventListener("mouseup", dragStop);

            return () => {
                box.removeEventListener("mousedown", () => setIsDragging(true));
                box.removeEventListener("mousemove", dragging);
                document.removeEventListener("mouseup", dragStop);
            }
        }
    }, [isDragging]);

    useEffect(() => {
        const index = especialistas.indexOf(activeSpecialist);
        if (index !== -1 && specialistsRefs[index]) {
            specialistsRefs[index].current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        }
    }, [activeSpecialist, specialistsRefs]);

    return especialistas.length > 0 ? (
        <div className="flex rounded-xl bg-transparent shadow-xl my-8">
            <button className='p-4 text-6xl text-slate-700 bg-transparent' onClick={() => scrollSpecialists('left')}><RiArrowLeftCircleLine /></button>
            <div className="flex overflow-x-auto" ref={specialistsBox}>
                {especialistas.map((especialista, index) => (
                    <div 
                        key={especialista.id} 
                        ref={specialistsRefs[index]}
                        className={`p-4 ${activeSpecialist === especialista ? 'bg-[#caa776] text-[#caa776]' : 'bg-gray-200 text-black'}`}
                        onClick={() => setActiveSpecialist(especialista)}
                    >
                        <TarjetaSpecialista especialista={especialista} />
                    </div>
                ))}
            </div>
            <button className='p-4 text-6xl text-slate-700 bg-transparent' onClick={() => scrollSpecialists('right')}><RiArrowRightCircleLine /></button>
        </div>
    ) : <>cargando...</>;
}