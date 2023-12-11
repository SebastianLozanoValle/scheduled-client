import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CPasarelap } from '../components/CPasarelap';

const stripePromise = loadStripe('tu_publishable_key');

export const Pasarelap = ({ selectedSpecialist, selectedServices }) => {
  const [checkoutSessionId, setCheckoutSessionId] = useState(null);

  const handlePayButtonClick = async () => {
    // Lógica para manejar el clic en el botón de pago
    // Esto puede incluir la creación de una sesión de pago con la API de Stripe

    // Ejemplo: Crear una sesión de pago con la API de Stripe
    const response = await fetch('/api/crear-sesion-de-pago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Aquí puedes enviar los detalles necesarios para crear la sesión de pago
        specialistId: selectedSpecialist.id,
        services: selectedServices,
      }),
    });

    const session = await response.json();

    // Actualizar el estado con el ID de la sesión de pago
    setCheckoutSessionId(session.id);
  };

  return (
    <>
      {selectedSpecialist && (
        <Box mt={4}>
          <Text>Información del Especialista:</Text>
          <Text>{`Especialista: ${selectedSpecialist.name}`}</Text>
          <Text>{`Descripción: ${selectedSpecialist.description}`}</Text>
          <a href={`Pasarelap/${checkoutSessionId}`}>
            <Button onClick={handlePayButtonClick}>Pagar</Button>
          </a>
        </Box>
      )}

      {/* Usar el componente Elements correctamente */}
      {selectedSpecialist && (
        <Elements stripe={stripePromise}>
          <CPasarelap />
        </Elements>
      )}
    </>
  );
};


