import User from '../../models/User.js';
// import Book from '../../models/Book.js';
import { signToken, AuthenticationError } from '../../services/auth.js'

interface Context {
    user?: {
        _id: string;
        username: string;
        email: string;
    }
}
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
interface addBookArgs {
    input: bookArgs
    userId: string
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
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
            // return user;
        },
        saveBook: async (_parent:unknown, {input, userId}: addBookArgs, context:Context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { saveBook: input } },
                    { new: true, runValidators: true }
                );
            }
            throw new AuthenticationError('Not Authenticated')
        },
        
        // async (_parent: unknown, { input }: bookArgs) => {
        //     const book = await Book.create({ ...input });
        //     await User.findOneAndUpdate(context.user._id, { $addToSet: { savedBooks: book._id } });
        //     return book
        // },
        removeBook: async (_parent: unknown, { bookId }: bookIdArgs, context:Context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                )
            }
      // If user attempts to execute this mutation and isn't logged in, throw an error
            throw new AuthenticationError('Not Authenticated')
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