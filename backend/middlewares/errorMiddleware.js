export class CustomError extends Error {
    constructor(message, statusCode, originalError = null) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.originalError = originalError;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleSupabaseError = (error, customMessage = "Database operation failed") => {
    if (error) {
        console.error(customMessage, error);
        throw new CustomError(customMessage, 500, error);
    }
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        originalError: err.originalError
    });

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        details: process.env.NODE_ENV === 'development' && err.originalError ? err.originalError : undefined
    });
};