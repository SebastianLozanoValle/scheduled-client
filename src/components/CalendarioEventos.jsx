import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import 'dayjs/locale/es';  // Importa el idioma español de dayjs

dayjs.locale('es');

export const CalendarioEventos = ({ appointments }) => {
    const localizer = dayjsLocalizer(dayjs);

    // Convierte las citas en eventos para el calendario
    const events = appointments.map(appointment => {
        console.log('appointment:', appointment);  // Imprime cada cita
        console.log('appointment.date:', appointment.date);  // Imprime la fecha de cada cita
        const date = new Date(Number(appointment.date));
        const formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        console.log('formattedDate:', formattedDate);  // Imprime el
        //año mes y dia
        return {
            start: dayjs(formattedDate + 'T' + appointment.startTime).toDate(),
            end: dayjs(formattedDate + 'T' + appointment.estimatedEndTime).toDate(),
            title: `${appointment.clientUsername} - ${appointment.subject}`,
            data: {
                id: appointment.id,
                detail: appointment.detail,
                value: appointment.value,
                status: appointment.status,
                serviceType: appointment.serviceType,
                specialistUsername: appointment.specialistUsername
            }
        }
    });

    console.log('events:', events);  // Imprime los eventos generados

    const components = {
        event: props => {
            const { data } = props.event
            return (
                <div className="bg-[#d3983f] text-white rounded-sm p-4">
                    {props.title} - {data.status}
                </div>
            )
        }
    }

    return (
        <div className="w-full">
            <div className="w-full p-4">
                <div className=" flex justify-center">
                    <h1 className=" inline text-black font-bold">
                        Calendario
                    </h1>
                </div>
            </div>
            <div className="m-4 flex justify-center">
                <div className="h-[500px] w-4/5">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        components={components}
                    />
                </div>
            </div>
        </div>
    );
}