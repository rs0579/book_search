import express, {Request, Response} from 'express';
import path from 'node:path';
import db from './config/connection.js';
// import routes from './routes/index.js';
import {ApolloServer} from '@apollo/server';
import {typeDefs, resolvers} from './types/index.js';
import { authenticateToken } from './services/auth.js';
import {expressMiddleware} from "@apollo/server/express4"

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(routes);
//I BELIEVE THE BELOW LINE IS THE CORRECT WAY TO IMPLEMENT THE AUTHENTICATION MIDDLEWARE
app.use('/graphql', expressMiddleware(server as any,
  {  
    context: authenticateToken as any
  }
));

app.use(express.static(path.join(process.cwd(), '../client/dist')));

app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));


// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
};

startApolloServer();
