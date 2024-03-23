import { config } from 'dotenv';

config();

console.log('Hello, Node.js');

console.log(`Server Port: ${process.env.PORT}`);
