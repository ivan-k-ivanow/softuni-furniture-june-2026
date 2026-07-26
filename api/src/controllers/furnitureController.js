import { createFurnitureSchema } from "../schemas/furnitureSchema.js";
import { furniureService } from "../services/index.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export async function getAll(req, res) {
    const furnitures = await furniureService.getAll();

    res.json(furnitures);
};

export async function create(req, res) {    

    const { success, data, error } = createFurnitureSchema.safeParse(req.body);
    
    if (!success) {
        return res.status(400).json({ message: getErrorMessage(error) });
    }

    const result = await furniureService.create(data);
    
    res.json({ message: 'Furniture created successfully' });
}