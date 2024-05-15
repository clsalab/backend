import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware para manejar errores de validación
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Error: ', errors );
        
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Pasar al siguiente middleware si no hay errores de validación
};

export { handleValidationErrors };
