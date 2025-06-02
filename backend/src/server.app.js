"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Server = void 0;
var express_1 = require("express");
var server_config_1 = require("./server.config");
var server_routes_1 = require("./server.routes");
var orm_service_1 = require("./service/orm.service");
var Server;
(function (Server) {
    /**
     * public server start entry
     */
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var app, cors, routeBindSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = (0, express_1["default"])();
                        // Parse JSON bodies for this app. Make sure you put
                        // `app.use(express.json())` **before** your route handlers!
                        app.use(express_1["default"].json());
                        cors = require('cors');
                        app.use(cors({
                            "origin": "*",
                            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                            "preflightContinue": true,
                            "optionsSuccessStatus": 200
                        }));
                        return [4 /*yield*/, bindRoutes(app)];
                    case 1:
                        routeBindSuccess = _a.sent();
                        if (!routeBindSuccess)
                            return [2 /*return*/];
                        startServer(app);
                        (0, orm_service_1.initSQLite)();
                        return [2 /*return*/];
                }
            });
        });
    }
    Server.start = start;
    /**
     * bind all in server.routes.ts defined routes to their controller action
     *
     * @param app
     * @private
     */
    function bindRoutes(app) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, routes_1, route, method, controllerFn, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _i = 0, routes_1 = server_routes_1.routes;
                        _a.label = 1;
                    case 1:
                        if (!(_i < routes_1.length)) return [3 /*break*/, 4];
                        route = routes_1[_i];
                        method = getExpressMethod(route.method);
                        if (!method) {
                            console.warn("Method '".concat(route.method, "' is invalid!"));
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, importControllerAction(route.controller, route.action)];
                    case 2:
                        controllerFn = _a.sent();
                        if (!controllerFn)
                            return [3 /*break*/, 3];
                        // add route to express routing and bind controller action to it
                        app[method](route.path, controllerFn);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                    case 5:
                        err_1 = _a.sent();
                        console.error('Unexpected error during route binding!');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * start express server
     *
     * @param app
     * @private
     */
    function startServer(app) {
        app.listen(server_config_1.serverConfig.server.port, function () {
            console.log("The application is listening on port ".concat(server_config_1.serverConfig.server.port, "!"));
        });
    }
    /**
     * import the requests controller action and return it
     *
     * @param controllerName
     * @param actionName
     * @private
     */
    function importControllerAction(controllerName, actionName) {
        return __awaiter(this, void 0, void 0, function () {
            var fullPath, controller, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullPath = "./controller/".concat(controllerName, "Controller");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.resolve().then(function () { return require(fullPath); })];
                    case 2:
                        controller = _a.sent();
                        if (!(controller === null || controller === void 0 ? void 0 : controller.hasOwnProperty(actionName)) || typeof controller[actionName] !== 'function') {
                            console.warn("The controller '".concat(controllerName, "Controller' has no valid action named '").concat(actionName, "'!"));
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, controller[actionName]];
                    case 3:
                        err_2 = _a.sent();
                        console.warn("The controller '".concat(fullPath, "' failed to load!"));
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * validate method and convert it into lowe case
     *
     * @param method
     * @private
     */
    function getExpressMethod(method) {
        return ['GET', 'POST', 'PUT', 'DELETE'].includes(method)
            ? method.toLowerCase()
            : null;
    }
})(Server = exports.Server || (exports.Server = {}));
/** trigger server start **/
Server
    .start()["catch"](function (err) { return console.error(err); });
