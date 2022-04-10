import { Request, Response, NextFunction } from 'express';

const exceptionHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;

    if(error.toJSON) error = error.toJSON();

    return res.status(statusCode).json(error);
}

export default exceptionHandler;

