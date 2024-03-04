import { v4 as uuid } from 'uuid';

export const Service = ({ servicio }) => {
    return (
        <label key={uuid()}>
            <input type="checkbox" name={servicio} value={servicio} />
            <span>{servicio.name}</span>
            <span>{servicio.description}</span>
            <span>{servicio.time}</span>
            <span>{servicio.price}</span>
        </label>
    )
}