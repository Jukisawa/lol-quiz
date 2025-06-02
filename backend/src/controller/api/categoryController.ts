import { Request, Response }    from 'express';
import { Category }             from '../../models/category';

export async function find( req: Request, res: Response ): Promise<void> {

    const categories = await Category.find();
    res.json(categories);

}

