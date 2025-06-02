import { Request, Response } from 'express';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type QueryParameter = { [param: string]: string|number } | Array<string|number>;
export type ControllerFn = ( req: Request, res: Response ) => Promise<void>;

export interface Route {
    method      : HttpMethod;
    path        : string;
    controller  : string;
    action      : string;
}

export interface ServerConfig {
    server: { port: number };
    db: {
        host        : string;
        user        : string;
        password    : string;
        database    : string;
    };
}

