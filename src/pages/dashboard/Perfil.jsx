import { useLazyQuery } from "@apollo/client";
import { useUserStore } from "../../store/userStore"
import { GET_CLIENT, GET_SPECIALIST, GET_USER } from "../../querys/querys";
import { useEffect, useState } from "react";

export const Perfil = () => {
    const { userId, name, userRole } = useUserStore()

    const [getUser, { loading: loadingUser, data: dataUser }] = useLazyQuery(GET_USER);
    const [getSpecialist, { loading: loadingSpecialist, data: dataSpecialist }] = useLazyQuery(GET_SPECIALIST);
    const [getClient, { loading: loadingClient, data: dataClient }] = useLazyQuery(GET_CLIENT);

    const [user, setUser] = useState({});

    useEffect(() => {
        switch (userRole) {
            case "admin":
                getUser({ variables: { id: userId } });
                break;
    
            case "specialist":
                getSpecialist({ variables: { id: userId } });
                break;
    
            case "client":
                getClient({ variables: { id: userId } });
                break;
    
            default:
                break;
        }
        console.log(user)
    }, [userRole]);
    
    useEffect(() => {
        if (dataUser) {
            setUser();
        } else if (dataSpecialist) {
            setUser(dataSpecialist.getSpecialist);
        } else if (dataClient) {
            setUser(dataClient.getClient);
        }
        console.log(dataUser, dataSpecialist, dataClient);
        console.log(user);
    }, [dataUser, dataSpecialist, dataClient]);

    return (
        <div className="w-full ml-0 text-black min-h-[calc(100vh-108px)] pb-[64px] md:ml-[265px] md:pb-0 p-4 md:w-[calc(100vw-265px)]">
            <h1>Perfil</h1>
            <p>userId: {userId}</p>
            <p>name: {name}</p>
            <p>userRole: {userRole}</p>
            {
                loadingUser && <p>Cargando...</p>
            }
            {
                loadingSpecialist && <p>Cargando...</p>
            }
            {
                loadingClient && <p>Cargando...</p>
            }
            {
                user.notifications?.length > 0 && user.notifications.map(notification => (
                    <div key={notification.id}>
                        <p>{notification.tipo}</p>
                        <p>{notification.message}</p>
                        <p>{notification.date}</p>
                    </div>
                ))
            }
        </div>
    )
}