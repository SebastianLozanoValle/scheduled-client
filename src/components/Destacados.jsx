import { gql, useQuery } from "@apollo/client";

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

    const especialistas = data?.findSpecialists.filter(especialista => especialista.highlighted) || [];

    return (
        <div>
            {especialistas?.map((especialista) => {
                return (
                    <>
                        <h1>{especialista.username}</h1>
                    </>
                )
            })}
        </div>
    )
}