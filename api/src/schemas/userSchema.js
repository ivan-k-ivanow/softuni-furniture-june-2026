import * as z from 'zod';
import bcrypt from 'bcrypt';

export const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .transform((val) => { return bcrypt.hash(val, 10); }),
});