import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email:String!, $password:String!){
login(email: $email, password: $password){
    token
    email
    password
}
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email:String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
        username
        email
        password
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput!){
    saveBook(userID: $userID, BookInput:$input){
        userID
        input
    }
}
`;

// export const SAVE_BOOK = gql`
// mutation saveBook($userId:String!, $book:String!){
//     saveBook(userID: $userID, book:$book){
//         userID
//         book
//     }
// }
// `;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId:ID){
    removeBook(bookId:$bookId){
        bookId
    }
}
`;