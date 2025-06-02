import { Route } from './server.types';

export const routes: Array<Route> = [

    { method: 'GET', path: '/', controller: 'index', action: 'index' },
    { method: 'GET', path: '/resetDB', controller: 'init', action: 'resetDatabase' },

    //  - - - - - - - - - - - - - - - - -  //
    //  -              API              -  //
    //  - - - - - - - - - - - - - - - - -  //

    { method: 'GET', path: '/api/category/find', controller: 'api/category', action: 'find' },
    { method: 'GET', path: '/api/question/find', controller: 'api/question', action: 'find' },

];