import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../querys/querys";
import Table from "../../components/Table";
import { useState } from 'react';
import { Input } from "@chakra-ui/react";

export const Clientes = () => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (error) console.log(error);

    const clientes = data?.getClients || [];

    const [search, setSearch] = useState('');

    const filteredClientes = clientes.filter(cliente =>
        cliente.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full ml-0 text-black min-h-[calc(100vh-108px)] pb-[64px] md:ml-[265px] md:pb-0 p-4 md:w-[calc(100vw-265px)]">
            <Input
                w={'100%'}
                placeholder="Buscar cliente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                mb={4}
            />
            {search.length < 3 ?
                // Renderizado normal
                <Table customers={clientes} />
                : filteredClientes.length > 0 ?
                    // Renderizado de búsqueda
                    <Table customers={filteredClientes} />
                    : <p>No se ha encontrado ninguna coincidencia con "{search}"</p>
            }
        </div>
    )
}