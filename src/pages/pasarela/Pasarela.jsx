// import React, { useState, useEffect } from 'react';

// const Pasarela = () => {
//   const [accessToken, setAccessToken] = useState('');

//   useEffect(() => {
//     // Llamada para obtener el token de seguridad
//     fetch('https://app.tilopay.com/api/v1/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         apiuser: 'tu_usuario_api',
//         password: 'tu_contraseña_api',
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => setAccessToken(data.access_token));
//   }, []);

//   const processPayment = () => {
//     // Llamada para procesar un pago utilizando el accessToken obtenido
//     // Sustituye los datos de la llamada con los necesarios para tu integración específica
//   };

//   return (
//     <div>
//       <button onClick={processPayment}>Procesar Pago</button>
//     </div>
//   );
// };

// export default Pasarela;





// import React, { useState } from 'react';

// const Pasarela = () => {
//   const [paymentUrl, setPaymentUrl] = useState('');

//   const processPayment = async () => {
//     const requestBody = {
//       redirect: 'https://tu-sitio-web.com/pago-completado',
//       key: 'tu_llave_de_cliente',
//       amount: 100.00,
//       currency: 'USD',
//       // Otros datos requeridos como billToFirstName, billToLastName, etc.
//     };

//     try {
//       const response = await fetch('https://app.tilopay.com/api/v1/processPayment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
//       const responseData = await response.json();
//       setPaymentUrl(responseData.payment_url);
//     } catch (error) {
//       console.error('Error al procesar el pago:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={processPayment}>Procesar Pago</button>
//       {paymentUrl && <a href={paymentUrl}>Ir al formulario de pago</a>}
//     </div>
//   );
// };

// export default Pasarela;

const Pasarela = () => {
    return ( 
        <div>
            
        </div>
     );
}

export default Pasarela;