import * as zod from 'zod';

export const createFurnitureSchema = zod.object({
    make: zod.string().min(4, { message: 'Make must be at least 4 characters long' }),
    model: zod.string().min(4, { message: 'Model must be at least 4 characters long' }),
    year: zod.coerce.number().int()
        .min(1950, { message: 'Year must be between 1950 and 2050' })
        .max(new Date().getFullYear(), { message: 'You cannot be in the future' }),
    description: zod.string().min(10, { message: 'Description must be at least 10 characters long' }),
    price: zod.coerce.number().positive({ message: 'Price must be a positive number' }),
    img: zod.string().url({ message: 'Image must be a valid URL' }),
    material: zod.string().optional(),
});