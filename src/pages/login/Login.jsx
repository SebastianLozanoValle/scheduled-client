import { useState } from "react";
import fondo from '../../assets/imagenes/fondo.jpg'
import { Link } from "react-router-dom";

export const Login =()=> {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const validateFields = () => {
      // Lógica para validar campos, puedes implementarla según tus necesidades
      console.log('Validating fields...');
    };
  
    const currentYear = new Date().getFullYear();
    const copyrightText = `Copyright . ${currentYear}`;

    return(
        <div>
            <div className="p-10 bg-gray-200 h-[calc(100vh)] flex items-center justify-center">
                <div className="bg-white shadow-lg overflow-hidden rounded-xl w-[50%] h-[32em] z-[2]">
                <div className="flex space-between items-start h-full">
                    {/* imagen  */}
                    <div className="image-container lg:w-[50%] xs:hidden relative h-full w-full">
                        <img className="absolute top-0 left-0 h-full w-full object-cover" src={fondo} alt="" />
                    </div>
                
                
                    <div className="lg:w-[50%] xs:w-full sm:w-full px-8 py-10">
                    <div>
                        <Link to='/' className="text-3xl text-[#caa776] font-bold">Qurux</Link>
                        <p className="text-[12px] text-gray-600">
                        Suministre los datos requeridos para iniciar sesión.
                        </p>
                    </div>
                    <br />
                    <div>
                        <div className="flex flex-col">
                        <span className="font-bold mb-1 text-[12px]">
                            {/* icono email */}
                            <i className=""></i> Email
                        </span>
                        <input
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="email"
                            placeholder="ejemplo@gmail.com"
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
                            placeholder="escriba su clave"
                            className="p-3 rounded-lg border border-gray-300 w-full"
                        />
                        </div>
                    </div>
                    <br />
                    <button
                        onClick={validateFields}
                        className="transition p-3 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg mb-4"
                    >
                        {/* icono del btn continuar */}
                        continuar <i className=""></i>
                    </button>
                    <div className="text-center mb-3">
                        <span className="text-[12px] text-gray-600">
                        Si desea registrarse entre{' '}
                        <a
                            href="#"
                            className="text-[12px] text-blue-500 hover:text-blue-700 font-bold"
                        >
                            aquí
                        </a>
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
                    </div>
                </div>
                </div>
            </div>

            <div className="text-center p-5 text-[10px] font-bold absolute bottom-0 left-0 w-full">
                {copyrightText}
            </div>
        </div>
    )
}

