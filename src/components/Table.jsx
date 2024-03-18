import { Fragment, useState } from 'react';
import { ImCross } from "react-icons/im";
import { DELETE_CLIENT, GET_CLIENTS } from '../querys/querys';
import { useMutation } from '@apollo/client';
import { DeleteConfirmationDialogClient } from './DeleteConfirmationDialogClient';

function Table({ customers }) {
    const [openRow, setOpenRow] = useState(null);
    const [deleteClient] = useMutation(DELETE_CLIENT, { refetchQueries: [{ query: GET_CLIENTS }] });
    const [openDialogId, setOpenDialogId] = useState(null);

    const handleRowClick = (id) => {
        setOpenRow(id === openRow ? null : id);
    };

    const handleOpenDialog = (id) => {
        setOpenDialogId(id);
    };

    const handleCloseDialog = () => {
        setOpenDialogId(null);
    };

    return (
        <div className="flex flex-col w-full overflow-x-scroll">
            <div className="overflow-x-auto w-full">
                <div className="py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg w-full">
                        <table id="table-to-xls" className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {customers.map((customer) => (
                                    <Fragment key={customer.id}>
                                        <tr className={openRow === customer.id ? 'bg-gray-200' : ''} onClick={() => handleRowClick(customer.id)}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{customer.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{customer.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer.phone}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <button onClick={() => handleOpenDialog(customer.id)} className='text-gray-600 text-2xl hover:text-red-600'>
                                                    <ImCross />
                                                </button>
                                                <DeleteConfirmationDialogClient isOpen={openDialogId === customer.id} onClose={handleCloseDialog} cliente={customer} deleteClient={deleteClient} />
                                            </td>
                                        </tr>
                                        {openRow === customer.id && (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{customer.city}</div>
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

export default Table;
