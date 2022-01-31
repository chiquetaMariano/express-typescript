import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    secret: process.env.SECRET
};