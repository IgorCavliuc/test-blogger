
declare namespace Express {
    interface Request {
        user?: {
            id: number;
            is_admin: boolean;
            name: string;
            email: string;
            password: string;
            created_at: string;
            updated_at: string;
        };
    }
}