import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import 'dayjs/locale/es';  // Importa el idioma español de dayjs

dayjs.locale('es');

export const CalendarioEventos = ({ appointments, weeklySchedule = [], agenda = false }) => {

    // let daysOfWeek = {
    //     "Monday": "lunes",
    //     "Tuesday": "martes",
    //     "Wednesday": "miércoles",
    //     "Thursday": "jueves",
    //     "Friday": "viernes",
    //     "Saturday": "sábado",
    //     "Sunday": "domingo"
    // };

    let daysOfWeek = {
        "lunes": "Monday",
        "martes": "Tuesday",
        "miércoles": "Wednesday",
        "jueves": "Thursday",
        "viernes": "Friday",
        "sábado": "Saturday",
        "domingo": "Sunday"
    };

    const localizer = dayjsLocalizer(dayjs);

    // Función para generar eventos diarios desde las 1:00 PM a las 2:00 PM con el título como el día de la semana
    const generateDailyEvents = () => {
        const events = [];
        const startDate = dayjs(); // Fecha de hoy
        const endDate = startDate.add(30, 'day'); // Fecha de hoy + 30 días

        // Bucle para generar eventos para cada día durante 30 días
        let currentDate = startDate;
        while (currentDate.isBefore(endDate)) {
            const title = currentDate.format('dddd'); // Obtener el día de la semana

            if (weeklySchedule[daysOfWeek[title]] && weeklySchedule[daysOfWeek[title]].length > 0) {
                weeklySchedule[daysOfWeek[title]].forEach(timeSlot => {
                    const start = currentDate.set('hour', timeSlot.start.split(':')[0]).set('minute', timeSlot.start.split(':')[1]).toDate();
                    const end = currentDate.set('hour', timeSlot.end.split(':')[0]).set('minute', timeSlot.end.split(':')[1]).toDate();
                    events.push({
                        start: start,
                        end: end,
                        title: 'Disponible',
                        color: '#3b82f6', // Color azul
                        data: { dayOfWeek: daysOfWeek[title] } // Guarda el día de la semana
                    });
                });
            }
            // else {
            //     // Si no hay horario disponible para el día, agregamos un evento con el título "No disponible"
            //     events.push({
            //         start: currentDate.set('hour', 0).toDate(),
            //         end: currentDate.set('hour', 23).toDate(),
            //         title: 'No disponible',
            //         color: '#d3983f', // Color naranja
            //         data: { dayOfWeek: daysOfWeek[title] } // Guarda el día de la semana
            //     });
            // }

            currentDate = currentDate.add(1, 'day'); // Avanzar al siguiente día
        }
        return events;
    };

    // Función para convertir las citas en eventos para el calendario
    const eventsFromAppointments = appointments.map(appointment => {
        const date = new Date(Number(appointment.date));
        const formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        return {
            start: dayjs(formattedDate + 'T' + appointment.startTime).toDate(),
            end: dayjs(formattedDate + 'T' + appointment.estimatedEndTime).toDate(),
            title: agenda? `${appointment.clientUsername} - ${appointment.subject}` : 'Agendado',
            data: {
                id: appointment.id,
                detail: appointment.detail,
                value: appointment.value,
                status: appointment.status,
                serviceType: appointment.serviceType,
                specialistUsername: appointment.specialistUsername
            }
        };
    });

    // Generar eventos diarios
    const dailyEvents = generateDailyEvents();

    console.log(dailyEvents)

    // Combinar eventos diarios con eventos de citas
    const allEvents = [...eventsFromAppointments, ...dailyEvents];

    const components = {
        event: props => {
            const { data } = props.event;
            console.log(props.color);
            return (
                <div className={`${props.title == 'Disponible' ? 'bg-green-500' : agenda? 'bg-primary' : 'bg-red-600'} text-white rounded-sm p-4 h-full`}>
                    {props.title}
                </div>
            );
        }
    };

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
                <div className="h-[70vh] w-4/5">
                    <Calendar
                        localizer={localizer}
                        events={allEvents}
                        components={components}
                    />
                </div>
            </div>
        </div>
    );
}

