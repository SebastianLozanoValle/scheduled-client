import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import 'dayjs/locale/es';  // Importa el idioma español de dayjs
import { ClientRegisterForm } from "../login/ClienteRegisterForm";

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
                <div>
                    <ClientRegisterForm />
                </div>
            </div>
            <div className="m-4 flex justify-center h-screen">
                <iframe src="https://sandbox-checkout.payvalida.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNRVJDSEFOVF9DRUwiOiIrNTA2NjAyMTIxMjMiLCJNRVJDSEFOVF9DT0RFIjoyMDI4ODUsIk9SREVSX0NPREUiOjI0MzkyNTcsIk1FUkNIQU5UX0VNQUlMIjoibWljaGVsbGVzb2xhbm8wMjFAZ21haWwuY29tIiwiTUVSQ0hBTlRfTE9HTyI6IiIsIk1FUkNIQU5UX1VSTF9SRVRVUk4iOiIiLCJNRVJDSEFOVF9OQU1FIjoiUXVydXggKENSKSIsIkVYUElSQVRJT04iOiIyNy8wMi8yMDI0IiwiT1JERVJfQlJJRUYiOiJPcmRlbiBkZSBwcnVlYmEzIiwiT1JERVJfQ1VSUkVOQ1kiOiJDUkMiLCJPUkRFUl9BTU9VVCI6IjEwNTAwLjAiLCJNRVJDSEFOVF9JRCI6InF1cnV4Y3JzYW5kYm94IiwiT1JERVJfUkVGRVJFTkNFIjoiOTA5NTM4MTg5OTMiLCJPUkRFUl9NRVRIT0QiOiIiLCJVU0VSX0RJIjoiIiwiVVNFUl9UWVBFX0RJIjoiIiwiVVNFUl9OQU1FIjoiTm9tYnJlVXN1YXJpbyIsIlJFRElSRUNUX1RJTUVPVVQiOiIiLCJNRVJDSEFOVF9URU1QTEFURSI6ImRlZmF1bHQiLCJleHAiOjE3MDkwOTY0MDAsImlzcyI6ImF1dGgwIn0.Bd9IaIAFz2FRIdCd_VWLkYMeo7DN9ZtzK5kmoxztKdE" width="100%" height="100%" frameborder="0"></iframe>
            </div>
        </div>
    );
}
