import { useQuery } from "@apollo/client";
import { GET_APPOINTMENTS, GET_CLIENTS, GET_INVOICES } from "../../querys/querys";
import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import GenericTable from "../../components/GenericTable";
import { CalendarioEventos } from "../../components/CalendarioEventos";
import { useUserStore } from "../../store/userStore";

export const Agenda = () => {

    const { name, userId, userRole, setUser } = useUserStore();

    const columnas = ['Id', 'Usuario', 'Especialista', 'Estado']

    const { loading: loadingAppointments, error: errorAppointments, data: dataAppointments } = useQuery(GET_APPOINTMENTS);

    if (errorAppointments) console.log(errorAppointments);

    const appointments = dataAppointments?.getAppointments || [];

    const { loading: loadingInvoices, error: errorInvoices, data: dataInvoices } = useQuery(GET_INVOICES);

    if (errorInvoices) console.log(errorInvoices);

    const invoices = dataInvoices?.getInvoices || [];

    const [search, setSearch] = useState('');

    let filteredAppointments = appointments.filter(appointment =>
        appointment.clientUsername.toLowerCase().includes(search.toLowerCase())
    );

    if (userRole === "specialist") {
        filteredAppointments = filteredAppointments.filter(appointment => {
            console.log("especialista", appointment);
            return appointment.specialistId === userId;
        });
    }

    if (userRole === "client") {
        filteredAppointments = filteredAppointments.filter(appointment => {
            console.log("especialista", appointment);
            return appointment.clientId === userId;
        });
    }

    // const appointmentsToday = appointments.filter((appointment) => {
    //     appointment.
    // }

    console.log(appointments)

    const filteredInvoices = invoices.filter(invoice =>
        invoice.clientId.username.toLowerCase().includes(search.toLowerCase())
    );

    console.log('filteredInvoices:', filteredInvoices);

    console.log('filteredAppointments:', filteredAppointments[0]?.clientUsername);
    console.log('filteredInvoices:', filteredInvoices[0]?.clientId.username);

    let appointmentColumns = [
        { header: 'Id', accessor: 'id' },
        { header: 'Usuario', accessor: 'clientUsername' },
        { header: 'Especialista', accessor: 'specialistUsername' },
        { header: 'Estado', accessor: 'status' },
        // Agrega más columnas según sea necesario
    ];

    if (userRole !== "admin") {
        appointmentColumns = [
            { header: 'Id', accessor: 'id' },
            userRole === 'specialist' ? { header: 'cliente', accessor: 'clientUsername' } : { header: 'Especialista', accessor: 'specialistUsername' },
            { header: 'Tipo Servicio', accessor: 'serviceType' },
            { header: 'Estado', accessor: 'status' },
            { header: 'Fecha', accessor: 'date' },
            // Agrega más columnas según sea necesario
        ];
    }

    const invoiceColumns = [
        { header: 'Id', accessor: 'id' },
        { header: 'Usuario', accessor: 'clientId.username' },
        { header: 'Especialista', accessor: 'specialistId.username' },
        { header: 'Estado', accessor: 'status' },
        // Agrega más columnas según sea necesario
    ];

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

    const [today, setToday] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setToday(new Date());
        }, 60000); // Actualiza la fecha cada minuto
        return () => clearInterval(interval);
    }, []);

    // Convierte la fecha de hoy a un formato comparable
    const todayFormatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    // Filtra las citas de hoy
    const appointmentsToday = appointments.filter(appointment => {
        const appointmentDate = timestampAFechaHora(appointment.date);
        return appointmentDate.startsWith(todayFormatted); // Compara solo la parte de la fecha
    });
    console.log(appointmentsToday)

    const filteredAppointmentsToday = appointmentsToday.filter(appointment =>
        appointment.clientUsername.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full ml-0 text-black min-h-[calc(100vh-108px)] pb-[64px] md:ml-[265px] md:pb-0 p-4 md:w-[calc(100vw-265px)]">
            <h2 className="text-sm md:text-5xl mt-10">Agenda</h2>
            <Input
                w={'100%'}
                placeholder="Buscar cliente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="my-20"
            />
            <div className="w-full md:w-1/2 mx-auto mb-20">
                {
                    appointmentsToday ?
                        <>
                            <h3 className="text-sm md:text-base">Citas De Hoy:</h3>
                            <GenericTable items={appointmentsToday} columns={appointmentColumns} tipo='appointment' />
                        </>
                        :
                        <h3 className="text-center text-3xl font-extrabold text-primary">No Tiene Citas Agendadas Para Hoy!</h3>
                }
            </div>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <h3 className="text-sm md:text-base">Detalle de Todas las Citas:</h3>
                    <GenericTable items={filteredAppointments} columns={appointmentColumns} tipo='appointment' />
                </div>
                {
                    userRole !== "specialist" &&
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <div className="text-sm md:text-base">Detalle de las Oredenes de Pago:</div>
                        <GenericTable items={filteredInvoices} columns={invoiceColumns} tipo='invoice' />
                    </div>
                }
            </div>
            <CalendarioEventos appointments={filteredAppointments} agenda={true} />
        </div >
    )
}