import express                      from 'express';
import { Express }                  from 'express';
import { serverConfig }             from './server.config';
import { routes }                   from './server.routes';
import { ControllerFn, HttpMethod } from './server.types';
import { initSQLite }               from './service/orm.service';

export module Server {

    /**
     * public server start entry
     */
    export async function start(): Promise<void> {

        const app = express();

        // Parse JSON bodies for this app. Make sure you put
        // `app.use(express.json())` **before** your route handlers!
        app.use(express.json());

        const cors=require('cors');
        app.use(cors({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": true,
            "optionsSuccessStatus": 200
        }));

        const routeBindSuccess = await bindRoutes(app);
        if (!routeBindSuccess) return;

        startServer(app);
        initSQLite();
    }

    /**
     * bind all in server.routes.ts defined routes to their controller action
     *
     * @param app
     * @private
     */
    async function bindRoutes(app: Express): Promise<boolean> {
        try {

            for ( const route of routes ) {

                // check if method is valid
                const method = getExpressMethod(route.method);
                if (!method) {
                    console.warn(`Method '${route.method}' is invalid!`);
                    continue;
                }

                // check if controller function exists and import it
                const controllerFn = await importControllerAction(route.controller, route.action);
                if (!controllerFn) continue;

                // add route to express routing and bind controller action to it
                app[method](route.path, controllerFn);
            }
            return true;

        } catch (err) {
            console.error('Unexpected error during route binding!');
            return false;
        }
    }

    /**
     * start express server
     *
     * @param app
     * @private
     */
    function startServer(app: Express) {
        app.listen(serverConfig.server.port, () => {
            console.log(`The application is listening on port ${serverConfig.server.port}!`);
        })

    }

    /**
     * import the requests controller action and return it
     *
     * @param controllerName
     * @param actionName
     * @private
     */
    async function importControllerAction( controllerName: string, actionName: string ): Promise<ControllerFn|null> {
        const fullPath = `./controller/${controllerName}Controller`;
        try {
            const controller = await import(fullPath);
            if (!controller?.hasOwnProperty(actionName) || typeof controller[actionName] !== 'function') {
                console.warn(`The controller '${controllerName}Controller' has no valid action named '${actionName}'!`);
                return null;
            }
            return controller[actionName];

        } catch (err) {
            console.warn(`The controller '${fullPath}' failed to load!`);
            return null;
        }
    }

    /**
     * validate method and convert it into lowe case
     *
     * @param method
     * @private
     */
    function getExpressMethod( method: HttpMethod ): Lowercase<HttpMethod>|null {
        return ['GET','POST','PUT','DELETE'].includes(method)
            ? method.toLowerCase() as Lowercase<HttpMethod>
            : null;
    }

}


/** trigger server start **/
Server
    .start()
    .catch( err => console.error(err) );



