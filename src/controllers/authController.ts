import { Request, Response } from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.query(
                'INSERT INTO Persons (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, hashedPassword]
            );

            const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.SECRET_KEY as string);

            res.status(201).json({ user: newUser.rows[0], token });
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async signIn(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await db.query('SELECT * FROM Persons WHERE email = $1', [email]);

            if (user.rows.length === 0) {
                 res.status(401).json({ error: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

            if (!passwordMatch) {
                 res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.rows[0].id }, process.env.SECRET_KEY as string);

            res.json({ user: user.rows[0], token });
        } catch (error) {
            console.error('Error signing in:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AuthController();
