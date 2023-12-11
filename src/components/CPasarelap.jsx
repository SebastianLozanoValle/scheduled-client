import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export const CPasarelap = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePago = async () => {
    if (!stripe || !elements) {
      // Manejar el caso donde Stripe no está configurado correctamente
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Crear una tokenización de la tarjeta de crédito con Stripe
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Error al crear el token:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    } else {
      console.log('Token de tarjeta creado:', token);
      // Enviar el token al servidor para procesar el pago
      // Implementa la lógica del servidor para realizar el pago con la API de Stripe
    }
  };

  return (
    <div>
      {/* Información del Servicio */}
      <p>Detalles de la Tarjeta de Crédito:</p>
      <CardElement />
      <button onClick={handlePago}>Procesar Pago</button>
    </div>
  );
};


