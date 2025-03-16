import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email:String!, $password:String!){
login(email: $email, password: $password){
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
mutation saveBook($authors: [string]?, $title: string){
    saveBook(authors: $authors, title: $title){
        authors
        title
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