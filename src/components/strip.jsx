import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('tu_publishable_key'); // Reemplaza 'tu_publishable_key' con tu clave de publicación de Stripe

export default stripePromise;
