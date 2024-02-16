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
                date
                startTime
                estimatedEndTime
                clientId
                specialistId
                subject
                detail
                value
                status
                serviceType
                clientUsername
                specialistUsername
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

export const GET_CLIENTS = gql`
    query {
        getClients {
                id
                username
                avatar
                age
                gender
                phone
                email
                city
                street
                role
                active
                appointments{
                    date
                    startTime
                    estimatedEndTime
                    status
                    detail
                    id
                    serviceType
                    value
                }
                favorites
        }
    }
`;

export const GET_APPOINTMENTS = gql`
    query{
        getAppointments {
            id
            date
            startTime
            estimatedEndTime
            clientId
            specialistId
            subject
            detail
            value
            status
            serviceType
            clientUsername
            specialistUsername
        }
    }
`;

export const GET_INVOICES = gql`
    query{
        getInvoices {
                id
                merchant
                email
                country
                order
                money
                amount
                description
                language
                expiration
                iva
                user_name
                specialistId {
                id
                username
                }
                clientId {
                id
                username
                }
                date
                status
                checksum
                link 
        }
    }
`;

export const CREATE_CLIENT = gql`
    mutation($input: ClientInput!) {
        createClient(input: $input) {
            id
        }
    }
`;
