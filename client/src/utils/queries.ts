import {gql} from '@apollo/client'

export const QUERY_ME = gql`
query GET_ME{
    me{
        username
        email
        password
        savedBooks
    }
}
`;