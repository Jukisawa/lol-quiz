import sqlite3              from 'sqlite3';
import { open }             from 'sqlite';
import { serverConfig }     from '../server.config';
import { Database }         from 'sqlite/build/Database';

export let db       : Database;
export async function initSQLite(): Promise<void> {
    db = await open({
        filename    : serverConfig.db.filePath,
        driver      : sqlite3.Database
    });
}
