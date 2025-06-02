import { Request, Response }    from 'express';
import { db }                   from '../service/orm.service';
import { Question }             from '../models/question';
import { questions }            from '../../files/testData';

export async function resetDatabase( req: Request, res: Response ): Promise<void> {

   // db.serialize();

    await Question.dropTable();
    await Question.createTable();
    await Question.insert( questions );


    res.json({ success: true });
}

