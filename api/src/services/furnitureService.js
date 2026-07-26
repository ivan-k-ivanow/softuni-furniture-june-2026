import { prisma } from '../lib/prisma.js';

export function getAll() {
    return prisma.furniture.findMany();
}

export function create(furnitureData) {
    return prisma.furniture.create({
        data: furnitureData,
    });
};