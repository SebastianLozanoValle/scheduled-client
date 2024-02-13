import { gql } from '@apollo/client';

export const GET_SPECIALIST = gql`
    query GetSpecialist($id: ID!) {
        getSpecialist(id: $id) {
            username
            age
            avatar
            gender
            active
            city
            street
            role
            world
            highlighted
            specialtys
            serviceType
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
`;

export const FIND_SPECIALISTS = gql`
        query {findSpecialists {
            username
            age
            avatar
            gender
            active
            city
            street
            world
            role
            highlighted
            specialtys
            serviceType
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
`;

export const GET_CLIENT = gql`
    query GetClient($id: ID!) {
        getClient(id: $id) {
            username
            email
        }
    }
`;

export const IS_SLOT_AVAILABLE = gql`
    mutation IsSlotAvailable($input: SlotInput!) {
        isSlotAvailable(input: $input){
            isSlotAvailable
            reason
        }
    }
`;

export const SHEDULE_APPOINTMENT = gql`
    mutation($input: AppointmentInput!) {
        scheduleAppointment(input: $input) {
            id
            value
            clientId
            specialistId
            date
            detail
            subject
        }
    }
`;

export const CREATE_INVOICE = gql`
    mutation($invoice: InvoiceInput!) {
        createInvoice(invoice: $invoice) {
            link
        }
    }
`;