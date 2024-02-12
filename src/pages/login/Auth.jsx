import { useQuery, gql } from "@apollo/client";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from 'react-router-dom';

const ME = gql`
    query Me {
        me {
            id
            username
            role
        }
    }
`;

export const Auth = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();

    const { data, loading, error } = useQuery(ME, {
        onCompleted: (data) => {
            if (data && data.me) {
                const { id, username, role } = data.me;
                setUser(id, username, role);
                console.log('User data loaded:', data.me);
                navigate("/"); // Redirige al usuario a la página de inicio
            } else {
                navigate("/login");
            }
        },
        onError: (error) => {
            console.error("Error loading user data", error);
            // Aquí puedes manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
            navigate("/login");
        }
    });

    // if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-[#d3983f]"></div>
            </div>
        );
    // }

    // return <div>Iniciando sesión...</div>; // Puedes mostrar un spinner o algún otro indicador de carga aquí
};