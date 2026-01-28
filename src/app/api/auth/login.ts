import bcrypt from 'bcrypt';
import { db } from '../../../db';

export const login = async (email: string, password: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });

        if (!user) {
            console.log("User not found");
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            console.log("Invalid password");
            return null;
        }

        console.log(`User ${email} logged in successfully.`);
        
        const { passwordHash, ...userProfile } = user;
        return userProfile;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}