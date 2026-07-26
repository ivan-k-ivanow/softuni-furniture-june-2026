import { prisma } from '../lib/prisma.js';

export function create(furnitureData) {
    return prisma.furniture.create({
        data: furnitureData,
    });
};