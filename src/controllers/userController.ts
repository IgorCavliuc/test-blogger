import { Request, Response } from 'express';
import db from '../db';

class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const allPeople = await db.query('SELECT * FROM Persons');
            res.status(200).json(allPeople.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getUserById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const user = await db.query('SELECT * FROM Persons WHERE id = $1', [userId]);
            if (user.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const userId = req.params.id;
        const { name, email, password, is_admin } = req.body;

        try {
            const updatedUser = await db.query(
                'UPDATE Persons SET name = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5 RETURNING *',
                [name, email, password, is_admin, userId]
            );

            if (updatedUser.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(updatedUser.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const userId = req.params.id;

        try {
            const deletedUser = await db.query('DELETE FROM Persons WHERE id = $1 RETURNING *', [userId]);
            if (deletedUser.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(204).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default new UserController();
