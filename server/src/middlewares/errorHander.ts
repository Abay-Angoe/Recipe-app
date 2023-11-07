import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const message = `You can't find ${req.originalUrl} on the server`;
    res.status(404).send(message);
}
