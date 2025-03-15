import User from '../../models/User.js';
import Book from '../../models/Book.js';
import { signToken, AuthenticationError } from '../../services/auth.js'

interface loginArgs {
    email: string;
    password: string;
}

interface userArgs {
    username: string
    email: string
    password: string
}

interface BookInput {
    authors: [string]
    title: string
    description: string
    bookId: string
    image: string
    link: string
}

interface bookArgs {
    input: BookInput
}

interface bookIdArgs {
    bookId: string
}

const resolvers = {
    Query: {
        me: async (_parent: unknown, _args: unknown, context:Context): Promise<typeof User | null> => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('Not Authenticated')
        }
    },
    Mutation: {
        login: async (_parent: unknown, { email, password }: loginArgs) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Not Authenticated');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        addUser: async (_parent: unknown, { username, email, password }: userArgs) => {
            const user = await User.create({ username, email, password });
            // const token = signToken(user.username, user.email, user._id);

            // return { token, user };
            return user;
        },
        saveBook: async (_parent: unknown, { input }: bookArgs) => {
            const book = await Book.create({ ...input });
            return book
        },
        removeBook: async (_parent: unknown, { bookId }: bookIdArgs) => {
            return await Book.findOneAndDelete({ _id: bookId })
        },

    }
};
export default resolvers;


// removeBook: async (_parent: unknown, { bookId }: bookIdArgs, context: Context) => {
//     if (context.user){
//         return await Book.findOneAndUpdate(
//             { _id: context.user._id },
//             {$pull: {bookIds: bookId}},
//             {new:true}
//         )
//        }
// },