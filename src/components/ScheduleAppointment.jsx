import { Service } from "./Service"

export const ScheduleAppointment = ({ especialista }) => {
    return (
        <form>
            <div className="flex flex-wrap p-20">
                {
                    especialista?.specialtys?ScheduleAppointment.map((especialidad) => (
                        <Service especialidad={especialidad} />
                    )):null
                }
            </div>

            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Agendar</button>
            </div>
        </form>
    )
}