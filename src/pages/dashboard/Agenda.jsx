import { useQuery } from "@apollo/client";
import { GET_APPOINTMENTS, GET_INVOICES } from "../../querys/querys";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import GenericTable from "../../components/GenericTable";
import { CalendarioEventos } from "../../components/CalendarioEventos";

export const Agenda = () => {

    const columnas = ['Id', 'Usuario', 'Especialista', 'Estado']

    const { loading: loadingAppointments, error: errorAppointments, data: dataAppointments } = useQuery(GET_APPOINTMENTS);

    if (errorAppointments) console.log(errorAppointments);

    const appointments = dataAppointments?.getAppointments || [];

    const { loading: loadingInvoices, error: errorInvoices, data: dataInvoices } = useQuery(GET_INVOICES);

    if (errorInvoices) console.log(errorInvoices);

    const invoices = dataInvoices?.getInvoices || [];

    const [search, setSearch] = useState('');

    const filteredAppointments = appointments.filter(appointment =>
        appointment.clientUsername.toLowerCase().includes(search.toLowerCase())
    );

    const filteredInvoices = invoices.filter(invoice =>
        invoice.clientId.username.toLowerCase().includes(search.toLowerCase())
    );

    console.log('filteredInvoices:', filteredInvoices);

    console.log('filteredAppointments:', filteredAppointments[0]?.clientUsername);
    console.log('filteredInvoices:', filteredInvoices[0]?.clientId.username);

    const appointmentColumns = [
        { header: 'Id', accessor: 'id' },
        { header: 'Usuario', accessor: 'clientUsername' },
        { header: 'Especialista', accessor: 'specialistUsername' },
        { header: 'Estado', accessor: 'status' },
        // Agrega más columnas según sea necesario
    ];

    const invoiceColumns = [
        { header: 'Id', accessor: 'id' },
        { header: 'Usuario', accessor: 'clientId.username' },
        { header: 'Especialista', accessor: 'specialistId.username' },
        { header: 'Estado', accessor: 'status' },
        // Agrega más columnas según sea necesario
    ];

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
            <div className="flex flex-col md:flex-row justify-around">
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <h3 className="text-sm md:text-base">Detalle de las Citas:</h3>
                    <GenericTable items={filteredAppointments} columns={appointmentColumns} tipo='appointment' />
                </div>
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <div className="text-sm md:text-base">Detalle de las Oredenes de Pago:</div>
                    <GenericTable items={filteredInvoices} columns={invoiceColumns} tipo='invoice' />
                </div>
            </div>
            <CalendarioEventos appointments={filteredAppointments} />
        </div>
    )
}