import { Request, Response }    from 'express';
import { db }                   from '../service/orm.service';
import { Question }             from '../models/question';


export async function index( req: Request, res: Response ): Promise<void> {

    res.json({ 'HALLO' : 'WELT'});

}