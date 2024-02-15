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

    return (
        <div className="flex flex-col flex-1 overflow-x-scroll">
            <div className="overflow-x-auto w-full">
                <div className="py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg w-full">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                                    <div className="text-sm text-gray-900">{getValue(item, column.accessor)}</div>
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