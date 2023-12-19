import { Box, Flex } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { SpecialistCard } from '../../components/SpecialistCard'
import { CustomCard } from '../../components/CustomCard'
import { gql, useQuery } from '@apollo/client'
import { SpecialistForm } from '../../components/SpecialistForm'

const GET_SPECIALISTS = gql`
    query {

        findSpecialists {
            id
            username
            age
            avatar
            active
            city
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
            }
        }

    }
`
  

export const Pruebas = () => {

    const { data, loading, error } = useQuery(GET_SPECIALISTS)

    if (loading) return <p>Loading...</p>

    console.log(data)

    return (
        <Box p={6} bg="black" w="100vw" color="white" mx="auto">
            <Box justify='center' align='center' ml={{base:'' ,md: '265px' }}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <h1 className="text-3xl font-bold underline mb-5">
                        Pruebas
                    </h1>

                    <SpecialistForm/>

                </Box>
            </Box>
        </Box>
    )
}