import { CustomError } from "../middlewares/errorMiddleware.js";

export function validateTitle(title) {
    if (title !== undefined && (typeof title !== 'string' || title.length < 3)) {
        throw new CustomError("Title must be a string at least 3 characters long", 400);
    }
    return title;
}

export function validateContent(content) {
    if (content !== undefined && (typeof content !== 'string' || content.length < 10)) {
        throw new CustomError("Content must be a string at least 10 characters long", 400);
    }
    return content;
}

export function validatePublished(published) {
    if (published === undefined) return undefined;

    if (typeof published === 'boolean') return published;

    if (published === 'true' || published === '1') return true;
    if (published === 'false' || published === '0') return false;

    throw new CustomError("Published must be a boolean value", 400);
}