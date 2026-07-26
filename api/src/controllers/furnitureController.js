import { createFurnitureSchema } from "../schemas/furnitureSchema.js";
import { furniureService } from "../services/index.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import querystring from "querystring";

export async function getAll(req, res) {
    let filter = {};

    if (req.query.where) {
        const result = querystring.parse(req.query.where.replaceAll('"', ''));

        // quick and dirty fix
        filter.userId = result._ownerId;
    }

    const furnitures = await furniureService.getAll(filter);

    res.json(furnitures);
};

export async function getById(req, res) {
    const { furnitureId } = req.params;

    const furniture = await furniureService.getById(furnitureId);

    if (!furniture) {
        return res.status(404).json({ message: 'Furniture not found' });
    }

    res.json(furniture);
}

export async function create(req, res) {
    const userId = req.user.id;

    const { success, data, error } = createFurnitureSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: getErrorMessage(error) });
    }

    const result = await furniureService.create(data, userId);

    res.json({ message: 'Furniture created successfully' });
}

export async function remove(req, res) {
    const { furnitureId } = req.params;
    const userId = req.user.id;

    const furniture = await furniureService.getById(furnitureId);

    if (!furniture) {
        return res.status(404).json({ message: 'Furniture not found' });
    };

    if (furniture.userId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this furniture' });
    };

    try {
        await furniureService.remove(furnitureId, userId);

        res.json({ message: 'Furniture removed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while deleting the furniture' });
    }
};

export async function update(req, res) {
    const { furnitureId } = req.params;
    const userId = req.user.id;

    try {
        const furnitureData = createFurnitureSchema.parse(req.body);

        const updatedFurniture = await furniureService.update(furnitureId, userId, furnitureData);

        res.json({ message: 'Furniture updated successfully', furniture: updatedFurniture });
    } catch (error) {
        return res.status(500).json({ message: getErrorMessage(error) });
    };
};