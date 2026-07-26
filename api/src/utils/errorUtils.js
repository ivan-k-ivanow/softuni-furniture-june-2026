import * as zod from 'zod';

export function getErrorMessage(error) {
    console.log(error);
    switch (error.name) {
        case 'ZodError':
            return object.values(zod.flattenError(error).fieldErrors).flat().join(', ') || 'Invalid input';
        default:
            return error.message || 'An unknown error occurred';  
    }
}