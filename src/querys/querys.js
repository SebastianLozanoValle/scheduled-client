import { gql } from '@apollo/client';

export const GET_SPECIALIST = gql`
    query GetSpecialist($id: ID!) {
        getSpecialist(id: $id) {
            id
            username
            age
            email
            phone
            avatar
            gender
            active
            reject
            files{
                id
                alias
                tipo
                filename
                path
            }
            city
            street
            role
            world
            highlighted
            specialtys {
                name
                description
                price
                time
                state
            }
            serviceType
            accountNumber
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
            notifications {
                id
                message
                recipient
                sender
                tipo
                date
            }
        }
    }
`;

export const FIND_SPECIALISTS = gql`
        query {findSpecialists {
            id
            username
            age
            email
            phone
            avatar
            gender
            active
            reject
            files{
                id
                alias
                tipo
                filename
                path
            }
            city
            street
            role
            world
            highlighted
            specialtys {
                name
                description
                price
                time
                state
            }
            serviceType
            accountNumber
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
            notifications {
                id
                message
                recipient
                sender
                tipo
                date
            }
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
            id
            link
            order
            merchant
            checksum
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
            notifications {
                id
                message
                recipient
                sender
                tipo
            }
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

export const CREATE_SPECIALIST = gql`
    mutation($input: SpecialistInput!) {
        createSpecialist(input: $input) {
            id
        }
    }
`;

export const SEND_NOTIFICATION = gql`
    mutation($input: NotificationInput!) {
        sendNotification(input: $input) {
            id
            message
            tipo
            sender
            recipient
            date
        }
    }
`;


export const TOGGLE_REJECT = gql`
    mutation toggleReject($id: ID!) {
        toggleReject(id: $id) {
            id
            username
            reject
        }
    }
`;

export const MESSAGE_TO_TRASH = gql`
    mutation messageToTrash($id: ID!) {
        messageToTrash(id: $id) {
            id
            tipo
            recipient
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            username
            city
            email
            phone
            notifications {
                id
                message
                recipient
                sender
                tipo
                date
            }
        }
    }
`

export const GET_NOTIFICATIONS_BY_SENDER = gql`
    query getNotificationsBySender($id: ID!) {
        getNotificationsBySender(id: $id) {
            id
            message
            recipient
            sender
            tipo
            date
        }
    }
`

export const GET_NOTIFICATIONS_BY_RECIPIENT = gql`
    query getNotificationsByRecipient($id: ID!) {
        getNotificationsByRecipient(id: $id) {
            id
            message
            recipient
            sender
            tipo
            date
        }
    }
`

export const GET_CLIENT = gql`
    query GetClient($id: ID!) {
        getClient(id: $id) {
            id
            username
            city
            email
            phone
            notifications {
                id
                message
                recipient
                sender
                tipo
                date
            }
        }
    }
`;

export const TIME_TO_PAY = gql`
    mutation TimeToPay($id: ID, $order: String!, $merchant: String!) {
        timeToPay(id: $id, order: $order, merchant: $merchant)
    }
`;

export const SPECIALIST_COUNT = gql`
    query {
        specialistCount
    }
`

export const CLIENT_COUNT = gql`
    query {
        clientCount
    }
`

export const INVOICE_COUNT = gql`
    query {
        invoiceCount
    }
`

export const APPOINTMENT_COUNT = gql`
    query {
        appointmentCount
    }
`

export const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            username
        }
    }
`;

export const UPDATE_SPECIALIST = gql`
    mutation UpdateSpecialist($id: ID!, $input: UpdateSpecialistInput!) {
        updateSpecialist(id: $id, input: $input) {
            id
            username
        }
    }
`;

export const UPDATE_CLIENT = gql`
    mutation($updateClientId: ID!, $input: UpdateClientInput!) {
        updateClient(id: $updateClientId, input: $input) {
            id
            username
        }
    }
`;

export const DELETE_SERVICE = gql`
    mutation DeleteService($id: ID!, $serviceName: String!) {
        deleteService(id: $id, serviceName: $serviceName) {
            id
            username
        }
    }
`;

export const CANCEL_APPOINTMENT = gql`
    mutation($id: ID!){
        cancelAppointment(id: $id) {
            id
        }
    }
`;
