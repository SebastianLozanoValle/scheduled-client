import { Fragment, useState } from 'react';
import { AdicionalAppointment } from './AdicionalAppointment';
import { AdicionalInvoice } from './AdicionalInvoice';

function GenericTable({ items, columns, tipo }) {
    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (id) => {
        if (openRow === id) {
            setOpenRow(null);
        } else {
            setOpenRow(id);
        }
    };

    const getValue = (item, accessor) => {
        return accessor.split('.').reduce((obj, key) => obj[key], item);
    };

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
        const fechaHoraFormateada = `${dia}/${mes}/${año}`;

        return fechaHoraFormateada;
    }

    return (
        <div className="flex flex-col flex-1 overflow-x-scroll">
            <div className="overflow-x-auto w-full">
                <div className="py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg w-full">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                            {column.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.map((item) => (
                                    <Fragment key={item.id}>
                                        <tr onClick={() => handleRowClick(item.id)}>
                                            {columns.map((column, index) => (
                                                <td key={index} className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{column.accessor === "date" ? timestampAFechaHora(getValue(item, column.accessor)) : getValue(item, column.accessor)}</div>
                                                </td>
                                            ))}
                                        </tr>
                                        {openRow === item.id && (
                                            <tr>
                                                <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap">
                                                    {
                                                        tipo == 'appointment'? <AdicionalAppointment appointment={item} />:<AdicionalInvoice invoice={item} />
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenericTable;