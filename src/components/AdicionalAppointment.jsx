export const AdicionalAppointment = ({appointment}) =>{
    return (
        <div>
            <h3>Monto:</h3>
            <p>{appointment.value}</p>
        </div>
    );
}