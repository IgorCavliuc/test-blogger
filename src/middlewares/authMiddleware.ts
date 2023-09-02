import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//@ts-ignore
import Person from '../models/persons';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers?.authorization;

        if (!authorizationHeader) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Unauthorized: Token not found');
        }

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as { userId: number };

            const userId = decodedToken.userId;

            const user = await Person.findByPk(userId);

            if (!user) {
                return res.status(401).send('Unauthorized: User not found');
            }
//@ts-ignore
            req.user = user;
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).send('Unauthorized: Invalid token');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

export const authorizeUser = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
//@ts-ignore
        if (!req.user || req.user.role !== role) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
};
