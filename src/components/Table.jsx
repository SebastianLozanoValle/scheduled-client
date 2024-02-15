import { Fragment, useState } from 'react';

function Table({ customers }) {
    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (id) => {
        if (openRow === id) {
            setOpenRow(null);
        } else {
            setOpenRow(id);
        }
    };

    return (
        <div className="flex flex-col w-full overflow-x-scroll">
            <div className="overflow-x-auto w-full">
                <div className="py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg w-full">
                        <table className="min-w-full divide-y divide-gray-200">
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
                                        <tr onClick={() => handleRowClick(customer.id)}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{customer.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{customer.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {customer.phone}
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