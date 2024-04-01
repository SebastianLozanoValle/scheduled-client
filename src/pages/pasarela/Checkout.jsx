import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { SHEDULE_APPOINTMENT, GET_CLIENT, CREATE_INVOICE, TIME_TO_PAY } from "../../querys/querys";
import { useUserStore } from "../../store/userStore";
import { useParams } from "react-router-dom";

export const Checkout = () => {

    const { userId } = useUserStore();

    const { loading, error, data } = useQuery(GET_CLIENT, {
        variables: { id: userId },
    });

    const { email, username } = data?.getClient || {};
    const [link, setLink] = useState(null);
    const [alreadyPayed, setAlreadyPayed] = useState(true);

    const { specialistId, date, value, iva, subject, startTime, estimatedEndTime, serviceType, specialistName } = useParams();
    // /checkout/:specialistId/:date/:value/:iva/:subject/:startTime/:estimatedEndTime/:serviceType

    const detail = "Servicos: " + subject.replaceAll(",", ", ") + ". IVA: " + iva + "%" + "con " + specialistName;
    const asunto = "Cita con " + specialistName;
    const formatedValue = parseFloat(value)

    const [appointment, setAppointment] = useState({
        "clientId": userId,
        "specialistId": specialistId,
        "date": date,
        "detail": detail,
        "startTime": startTime,
        "estimatedEndTime": estimatedEndTime,
        "status": "scheduled",
        "subject": asunto,
        "value": formatedValue,
        "serviceType": serviceType,
    });

    const [scheduleAppointment] = useMutation(SHEDULE_APPOINTMENT, {
        variables: { input: appointment },
        onError: (error) => {
            console.error('Error al verificar la disponibilidad:', error);
        }
    });

    const [mutationResponse, setMutationResponse] = useState(null);

    useEffect(() => {
        scheduleAppointment().then(({ data }) => {
            setMutationResponse(data); // Almacenar la respuesta en el estado
        }).catch(error => {
            console.error('Error al verificar la disponibilidad:', error);
        });
    }, []);

    console.log('mutationResponse:', mutationResponse);


    console.log('date:', date);
    const [mes, dia, año] = date.split("-");
    const expiration = `${dia}/${mes}/${año}`
    const [invoiceResponse, setInvoiceResponse] = useState(null);

    const [createInvoice] = useMutation(CREATE_INVOICE, {
        onError: (error) => {
            console.error('Error al verificar la disponibilidad:', error);
        },
        // onCompleted: (data) => {
        //     setInvoiceResponse(data); // Almacenar la respuesta en el estado
        // }
    });

    const [timeToPay] = useMutation(TIME_TO_PAY, {
        onError: (error) => {
            console.error('Error al ejecutar timeToPay:', error);
        }
    });


    console.log('userId:', userId);
    console.log('specialistId:', specialistId);

    useEffect(() => {
        if (mutationResponse) {
            const invoice = {
                "merchant": "quruxcrsandbox",
                "email": email,
                "country": 314,
                "money": "CRC",
                "amount": value,
                "description": detail,
                "language": "es",
                "expiration": expiration,
                "iva": iva,
                "user_name": username,
                "appointmentId": mutationResponse?.scheduleAppointment.id,
                "date": date,
                "specialistId": specialistId,
                "clientId": userId,
                "status": "Sin Cobrar",
            };

            console.log('mutationResponse:', mutationResponse.scheduleAppointment.id);
            console.log('expiration:', expiration);

            if (mutationResponse.scheduleAppointment.id) {
                createInvoice({ variables: { invoice } }).then(({ data }) => {
                    setLink("https://" + data.createInvoice.link);
                    setInvoiceResponse(data);
                    window.open("https://" + data.createInvoice.link);
                }).catch(error => {
                    console.error('Error al verificar la disponibilidad:', error);
                });
            }
        }
    }, [mutationResponse]);

    useEffect(() => {
        console.log('invoiceResponse:', invoiceResponse?.createInvoice);
        if (invoiceResponse) {
            const { id, order, merchant } = invoiceResponse.createInvoice; // Reemplaza esto con tu lógica para obtener las variables

            const input = {
                id: id,
                order: order,
                merchant: merchant
            }

            console.log("imput", input)

            timeToPay({ variables: { id, order, merchant } }).then(({ data }) => {
                setAlreadyPayed(data)
            }).catch(error => {
                console.error('Error al ejecutar timeToPay:', error);
            });
        }
    }, [invoiceResponse]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // const [timer, setTimer] = useState(1 * 60); // Temporizador de 1 minuto

    // useEffect(() => {
    //     let interval = null;
    //     if (alreadyPayed && timer > 0) {
    //         interval = setInterval(() => {
    //             setTimer(timer => timer - 1);
    //         }, 1000);
    //     } else if (!alreadyPayed || timer === 0) {
    //         clearInterval(interval);
    //     }
    //     return () => clearInterval(interval);
    // }, [alreadyPayed, timer]);

    return (
        link ?
            <div className="flex flex-col items-center justify-center h-screen">
                <a className="text-white bg-[#d3983f] rounded-xl px-10 py-4 text-5xl hover" target="_blank" href={link}>A Pagar</a>
            </div>
            :
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#d3983f]"></div>
                <h3>Conectando con la pasarela de pagos.</h3>
            </div>
    )
}