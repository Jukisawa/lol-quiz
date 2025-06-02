import { db } from '../service/orm.service';

export class Question {
    category            : string;
    value               : number;
    question            : string;
    answers             : string[];
    guessed             : boolean;
    multipleChoice      : boolean;
    hints               : string[];

    protected constructor( values: ExcludeMethods<Question>) {
        this.category       = values.category;
        this.value          = values.value;
        this.question       = values.question;
        this.answers        = values.answers;
        this.guessed        = values.guessed;
        this.multipleChoice = values.multipleChoice;
        this.hints          = values.hints;
    }

    static async find(): Promise<Question[]> {
        const results: QueryResult[] = await db.all(`
            SELECT q.category       AS 'category'
                 , q.value          AS 'value'
                 , q.question       AS 'question'
                 , q.answers        AS 'answers'
                 , q.guessed        AS 'guessed'
                 , q.multipleChoice AS 'multipleChoice'
                 , q.hints          AS 'hints'
            FROM questions AS q;
        `, []);

        return results
            .map( result => new Question({
                ...result,
                guessed         : !!result.guessed,
                multipleChoice  : !!result.multipleChoice,
                answers         : JSON.parse(result.answers),
                hints           : JSON.parse(result.hints),
            }));
    }

    static async insert( values: ExcludeMethods<Question>[] ): Promise<void> {
        const statement = await db.prepare(`
            INSERT INTO questions (
                category
              , value
              , question
              , answers
              , guessed
              , multipleChoice
              , hints
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        for ( const value of values ) {
            await statement.run(
                value.category,
                value.value,
                value.question,
                JSON.stringify(value.answers),
                value.guessed ? 1 : 0,
                value.multipleChoice ? 1 : 0,
                JSON.stringify(value.hints),
            );
        }
    }

    static async delete(): Promise<void> {

    }

    static async createTable(): Promise<void> {
        await db.run(`
            CREATE TABLE IF NOT EXISTS questions (
                 id             INTEGER PRIMARY KEY AUTOINCREMENT
               , category       TEXT
               , value          INTEGER
               , question       TEXT
               , answers        TEXT
               , guessed        INTEGER
               , multipleChoice INTEGER
               , hints          TEXT
            );
        `);
    }

    static async dropTable(): Promise<void> {
        await db.run(`
            DROP TABLE IF EXISTS questions;
        `);
    }

}

// types
interface QueryResult {
    category            : string;
    value               : number;
    question            : string;
    answers             : string;
    guessed             : number;
    multipleChoice      : number;
    hints               : string;
}