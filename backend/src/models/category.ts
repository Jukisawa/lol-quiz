import { db } from '../service/orm.service';

export class Category {
    name                : string;

    protected constructor( values: ExcludeMethods<Category>) {
        this.name       = values.name;
    }

    static async find(): Promise<Category[]> {
        const results: QueryResult[] = await db.all(`
            SELECT DISTINCT q.category AS 'name'
            FROM questions AS q;
        `, []);

        return results.map( result => new Category({ ...result }));
    }
}

// types
interface QueryResult {
    name            : string;
}