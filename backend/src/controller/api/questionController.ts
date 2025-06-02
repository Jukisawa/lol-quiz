import { Request, Response }    from 'express';
import { Question }             from '../../models/question';

export async function find( req: Request, res: Response ): Promise<void> {

    const questions = await Question.find();
    res.json(questions);

}

