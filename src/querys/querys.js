import { gql } from '@apollo/client';

export const GET_SPECIALIST = gql`
    query GetSpecialist($id: ID!) {
        getSpecialist(id: $id) {
            username
        }
    }
`;

export const GET_CLIENT = gql`
    query GetClient($id: ID!) {
        getClient(id: $id) {
            username
        }
    }
`;