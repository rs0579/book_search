import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email:String!, $password:String!){
login(email: $email, password: $password){
    token
}
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email:String!, $password: String!){
    addUser(username: $username, email: $email, password: $password)
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($userId:String!, $book:String!){
    saveBook(userID: $userID, book:$book){

    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($book:String){
    removeBook(book:$book){
        
    }
}
`;