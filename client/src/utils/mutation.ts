import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email:String!, $password:String!){
login(email: $email, password: $password){
    token
    user {
        email
    }
}
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email:String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
        token
        user{
            username
            email
        }
    }
}
`;


export const SAVE_BOOK = gql`
mutation saveBook($authors: [string], $title: string){
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
//OR
// export const SAVE_BOOK = gql`
// mutation saveBook($authors: [string], $title: string, $description: string, $bookId: string, $image: string, $link: string){
//     saveBook($authors: authors, $title: title, $description: description, $bookId: bookId, $image: image, $link: link){
//      authors
//      title
//      description 
//      bookId
//      image
//      link
//         
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