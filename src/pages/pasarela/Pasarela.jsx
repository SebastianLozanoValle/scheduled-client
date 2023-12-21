// import { useEffect, useState } from 'react';

// export const Pasarela = () => {
//   const [tilopay, setTilopay] = useState(null);
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://app.tilopay.com/sdk/v2/sdk_tpay.min.js';
//     script.async = true;
//     script.onload = () => {
//       Tilopay.Init({
//         token: "3807-1200-4546-5777",
//         // otras opciones aquí
//       }).then(initialize => {
//         setTilopay(Tilopay);
//         setPaymentMethods(initialize.methods);
//         setCards(initialize.cards);
//       });
//     };
//     document.body.appendChild(script);
//   }, []);

//   const pay = async () => {
//     if (tilopay) {
//       const payment = await tilopay.startPayment();
//       console.log(payment);
//     }
//   };

//   return (
//     <div>
//       <select>
//         {paymentMethods.map(method => (
//           <option key={method.id} value={method.id}>{method.name}</option>
//         ))}
//       </select>
//       <select>
//         {cards.map(card => (
//           <option key={card.id} value={card.id}>{card.name}</option>
//         ))}
//       </select>
//       <button onClick={pay}>Pay</button>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';

function Pasarela() {
  const [tilopay, setTilopay] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.tilopay.com/sdk/v2/sdk_tpay.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Tilopay) {
        window.Tilopay.Init({
          token: "3807-1200-4546-5777",
          // otras opciones aquí
        }).then(initialize => {
          setTilopay(window.Tilopay);
          setPaymentMethods(initialize.methods);
          setCards(initialize.cards);
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const pay = async () => {
    if (tilopay) {
      const payment = await tilopay.startPayment();
      console.log(payment);
    }
  };

  return (
    <div>
      <select>
        {paymentMethods.map(method => (
          <option key={method.id} value={method.id}>{method.name}</option>
        ))}
      </select>
      <select>
        {cards.map(card => (
          <option key={card.id} value={card.id}>{card.name}</option>
        ))}
      </select>
      <button onClick={pay}>Pay</button>
    </div>
  );
}

export default Pasarela;