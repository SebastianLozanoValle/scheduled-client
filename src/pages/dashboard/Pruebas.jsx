import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import 'dayjs/locale/es';  // Importa el idioma español de dayjs

dayjs.locale('es');  // Configura dayjs para usar el idioma español

export const Pruebas = () => {
    const localizer = dayjsLocalizer(dayjs);

    const events = [
        {
            start: dayjs('2023-12-18T12:00:00').toDate(),
            end: dayjs('2023-12-18T12:30:00').toDate(),
            title: "Evento 1",
            data: {
                x: 10
            }
        }
    ];

    const components = {
        event: props =>{
            const {data} = props.event
            return (
                <div>
                    {props.title}{data.x}
                </div>
            )
        }
    }

    return (
        <div className="sm:pl-[265px] w-full">
            <div className="w-full bg-blue-600 p-4">
                <div className="bg-yellow-400 flex justify-center">
                    <h1 className="bg-red-500 inline text-stone-100">
                        pruebasssss
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
