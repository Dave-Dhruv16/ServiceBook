// import axios from 'axios';
import bcrypt from 'bcrypt';
// import CryptoJS from 'crypto-js';
import { db } from '../../../db';
import { users } from '../../../db/schema';
import { SECRET_KEY } from '@/constants';

export const register = async (email: string, password: string, role: string) => {
    try {
        console.log(email, password, role)

        const passwordHash = await bcrypt.hash(password, 10)

        const payload = JSON.stringify({
            email,
            passwordHash,
            role,
        });

        // const encryptedPayload = CryptoJS.AES.encrypt(payload, SECRET_KEY).toString();
        
        await db.insert(users).values({
            email: email,
            passwordHash: passwordHash,
            role: role as "CUSTOMER" | "PROVIDER" | "ADMIN", 
        });

        console.log(`User ${email} registered successfully.`);
        
    } catch (error) {
        console.error("Registration error:", error)
        throw error; 
    }
}