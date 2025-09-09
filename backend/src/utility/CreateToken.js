import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = async (data) =>{
    let payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data};
    return jwt.sign(payload, process.env.JWT_SECRET );

}
export default createToken;