import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validateResults = (req: any, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        throw errors;
        }
        return next();
    } catch (err: any) {
        res.status(403);
        res.send({ errors: err.array() });
    }
};

export default validateResults;
