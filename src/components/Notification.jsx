import { ImCross } from "react-icons/im"
import { GET_NOTIFICATIONS_BY_RECIPIENT, GET_NOTIFICATIONS_BY_SENDER, MESSAGE_TO_TRASH } from "../querys/querys";
import { useMutation } from "@apollo/client";
import { v4 as uuid } from 'uuid';

export const Notification = ({ notification, id }) => {

    const [messageToTrash] = useMutation(MESSAGE_TO_TRASH,
        { refetchQueries: [{ query: GET_NOTIFICATIONS_BY_RECIPIENT, variables: { id: id } }, { query: GET_NOTIFICATIONS_BY_SENDER, variables: { id: id } }] });

    function timestampAFechaHora(timestamp) {
        // Crear un objeto Date con el timestamp
        const fecha = new Date(parseInt(timestamp));

        // Obtener los componentes de la fecha y hora
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1; // Los meses en JavaScript son 0-indexados
        const dia = fecha.getDate();
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
        const segundos = fecha.getSeconds();

        // Formatear la fecha y hora como un string
        const fechaHoraFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;

        return fechaHoraFormateada;
    }

    const handleMessageToTrash = async () => {
        try {
            console.log('Toggling highlight...');
            const { data } = await messageToTrash({ variables: { id: notification.id }})
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={`${notification.tipo == 'Aprobar' ? 'bg-green-500 border-green-500 border' : notification.tipo == 'Rechazado' ? 'bg-red-500 border-red-500 border' : 'bg-[#ccc] border-[#ccc] border'} absolute top-0 left-0 h-full w-3`}></div>
            <p>Para: {notification.recipient}</p>
            <p>Mensaje Adjunto: {notification.message}</p>
            <p className="absolute bottom-0 right-3 font-extralight text-[#ccc]">{timestampAFechaHora(notification.date)}</p>
            {
                notification.tipo != "Papelera" && <button><ImCross onClick={handleMessageToTrash} className="absolute top-3 right-3 text-[#ccc] hover:text-red-500" /></button>
            }
        </>
    )
}