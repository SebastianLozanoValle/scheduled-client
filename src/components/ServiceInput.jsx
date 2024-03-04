export const ServiceInput = ({ especialidad, register }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={especialidad} className="text-lg">{especialidad}</label>
            <input type="checkbox" id={especialidad} name={especialidad} value={especialidad} />
            <div>
                <input type="text" placeholder="Precio" {...register(`${especialidad}Price`)} />
                <select {...register(`${especialidad}Time`)}>
                    <option value="30">30 min</option>
                    <option value="60">1 hora</option>
                    <option value="90">1 hora, 30 min</option>
                </select>
            </div>
        </div>
    )
}