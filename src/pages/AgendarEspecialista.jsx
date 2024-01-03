import { useState } from "react";
import { EditSpecialistForm } from "../components/EditSpecialistForm";

// setValue('username', specialist.username);
//         setValue('age', specialist.age);
//         setValue('city', specialist.city);
//         setValue('street', specialist.street);
//         setValue('role', specialist.role);
//         setValue('highlighted', specialist.highlighted);
//         setValue('specialtys', specialist.specialtys);
//         setValue('weeklySchedule', specialist.weeklySchedule);
//         setSpecialtys(specialist.specialtys);

const especialistaDeEjemplo = {
    id: 1,
    nombre: 'Pepito',
    apellido: 'Perez',
    edad: 25,
    especialidad: 'Peluqueria',
    ciudad: 'Cordoba',
    calle: 'San Martin',
    numero: 123,
    telefono: 3511234567,
    email: 'kkndja@hjsf.com',
    horarios: {
        lunes: {
            inicio: '08:00',
            fin: '17:00'
        },
        martes: {
            inicio: '08:00',
            fin: '17:00'
        },
        miercoles: {
            inicio: '08:00',
            fin: '17:00'
        },
        jueves: {
            inicio: '08:00',
            fin: '17:00'
        },
        viernes: {
            inicio: '08:00',
            fin: '17:00'
        },
        sabado: {
            inicio: '08:00',
            fin: '17:00'
        },
        domingo: {
            inicio: '08:00',
            fin: '17:00'
        }
    }
}

export const AgendarEspecialista = ({ especialista }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        console.log('Opening form...');
        setIsFormOpen(true);
        console.log('isFormOpen:', isFormOpen);
    };

    const handleCloseForm = () => {
        console.log('Closing form...');
        setIsFormOpen(false);
        console.log('isFormOpen:', isFormOpen);
    };

    console.log('Rendering CustomCard. isFormOpen:', isFormOpen);
    return (
        <div>
            <button onClick={handleOpenForm}>Editar</button>

            {isFormOpen && <EditSpecialistForm isFormOpen={isFormOpen} specialist={especialistaDeEjemplo} onClose={handleCloseForm} />}
        </div>
    )
}