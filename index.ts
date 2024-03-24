import { config } from 'dotenv';
import Server from '@app/server';

config();

const server = new Server();
server.start().catch((error) => {
  console.error('Failed to start the server:', error);
});
