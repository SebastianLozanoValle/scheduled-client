import { gql, useQuery } from "@apollo/client";
import { TarjetaSpecialista } from "./TarjetaSpecialista";

export const GET_SPECIALISTS = gql`
    query {
        findSpecialists {
            id
            username
            age
            avatar
            active
            city
            street
            role
            highlighted
            specialtys
            weeklySchedule {
                Monday {
                    start
                    end
                }
                Tuesday {
                    start
                    end
                }
                Wednesday {
                    start
                    end
                }
                Thursday {
                    start
                    end
                }
                Friday {
                    start
                    end
                }
                Saturday {
                    start
                    end
                }
                Sunday {
                    start
                    end
                }
            }
            appointments {
                id
                clientId
                status
                startTime
                estimatedEndTime
            }
        }

    }
`

export const Destacados = () => {

    const { loading, error, data } = useQuery(GET_SPECIALISTS);

    const inicial = data?.findSpecialists.filter(especialista => especialista.highlighted) || [];
    const especialistas = [...inicial, ...inicial]

    return (
        <div>
            {especialistas?
                    <div className="container my-5 w-full">
                        <div className="overflow-hidden w-full">
                            <div className="flex whitespace-nowrap animate-scroll">
                                {
                                    especialistas?.map((especialista, index) => {
                                        return (
                                            <TarjetaSpecialista key={`${especialista.id}${index}`} especialista={especialista}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                : <></>
            }
        </div>
    )
}