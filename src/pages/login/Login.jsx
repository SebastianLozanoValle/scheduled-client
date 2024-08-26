import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import logo from '../../assets/imagenes/logo.png'
import { Box } from "@chakra-ui/react"
import {gql, useMutation} from '@apollo/client'

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

let mensajeError = '';

// eslint-disable-next-line react/prop-types
export const Login =({ setToken })=> {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(() => {
        return localStorage.getItem('user-token') !== null
    });

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            mensajeError = error.graphQLErrors[0].message
        }
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
            console.log(localStorage.getItem('user-token')); // Add this line
            setIsLogged(true)
            mensajeError = '';
        }
    }, [result.data]) // eslint-disable-line
  
    const validateFields = (e) => {
        e.preventDefault();
        login({ variables: { username, password } })
    };
  
    const currentYear = new Date().getFullYear();
    const copyrightText = `Copyright . ${currentYear}`;

    if (isLogged) {
        return <Navigate to="/auth" />
    }

    return(
        <div >
            {/* codigo login*/}

            <div className="p-10 bg-gray-200 h-[100vh] flex items-center justify-center">


                <div className="bg-white shadow-lg overflow-hidden rounded-xl w-full sm:w-full md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[50%] h-auto sm:h-auto md:h-auto lg:h-auto xl:h-auto 2xl:h-auto mx-auto">
                    <div className="flex space-between items-start">

                        <Box display='flex' paddingTop='100px'>
                            <img className="w-0 sm:w-[330px]" src={logo} ></img>
                        </Box>


                        <form onSubmit={validateFields} className="lg:w-[50%] xs:w-full sm:w-full px-8 py-10">
                            <div>
                                <Link to='/' className="text-2xl text-[#caa776]">Scheduled</Link>

                                <p className="text-[12px] text-gray-600">
                                    Suministre los datos requeridos para iniciar sesión.
                                </p>
                            </div>
                            <br/>
                            <div>
                                <div className="flex flex-col">
                                <span className="font-bold mb-1 text-[12px]">
                                    {/* icono email */}
                                    <i className=""></i> Correo
                                </span>
                                <input
                                    type="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    name="username"
                                    placeholder="Escriba su correo"
                                    className="p-3 rounded-lg border border-gray-300 w-full"
                                />
                                </div>
                            </div>

                            <br />
                            <div className="mb-1">
                                <div className="flex flex-col">
                                    <span className="font-bold mb-1 text-[12px]">
                                        {/* icono contraseña */}
                                        <i className=""></i> Contraseña
                                    </span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        placeholder="Escriba su clave"
                                        className="p-3 rounded-lg border border-gray-300 w-full"
                                    />
                                </div>
                            </div>
                            <br />
                            <button
                                type={'submit'}
                                className="transition p-3 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg mb-4"
                            >
                                {/* icono del btn continuar */}
                                continuar <i className=""></i>
                            </button>
                            {
                                mensajeError === '' || null ?
                                    <></>
                                    :
                                    <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                        role="alert">
                                        <span className="block sm:inline">{mensajeError}</span>
                                    </div>
                            }
                            <div className="text-center mb-3">
                                <span className="text-[12px] text-gray-600">
                                Si desea registrarse como Especialista entre{' '}
                                <Link
                                    to={'/signup-especialistas'}
                                    className="text-[12px] text-blue-500 hover:text-blue-700 font-bold"
                                >
                                    aquí
                                </Link>
                                </span>
                            </div>
                            <div className="text-center mb-3">
                                <span className="text-[12px] text-gray-600">
                                    Si desea registrarse como Cliente entre{' '}
                                    <Link
                                        to={'/signup'}
                                        className="text-[12px] text-blue-500 hover:text-blue-700 font-bold"
                                    >
                                        aquí
                                    </Link>
                                </span>
                            </div>
                            <div className="text-center">
                                <a
                                href="#"
                                className="text-[12px] text-blue-500 hover:text-blue-700"
                                >
                                <b>¿Olvidaste tu contraseña?</b>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="text-center p-5 text-[10px] font-bold absolute bottom-0 left-0 w-full">
                {copyrightText}
            </div>
        </div>
    )
}

