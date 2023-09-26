"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEARER = exports.HUNDRED = exports.ZERO = exports.TWO = exports.MINUSONE = exports.ONE = exports.TEMPORARY_REDIRECT = exports.PERMANENT_REDIRECT = exports.SERVICE_UNAVAILABLE = exports.INTERNAL_SERVER_ERROR = exports.UNAUTHORIZED = exports.NOT_FOUND = exports.CREATED = exports.OK = exports.BAD_REQUEST = exports.Status = exports.ContentType = exports.Roles = exports.corsOptions = void 0;
const allowedOrigins = ['http://localhost:3000', "https://resolutio.ai"];
exports.corsOptions = {
    //origin: allowedOrigins
    origin: "*"
};
//Enums
var Roles;
(function (Roles) {
    Roles[Roles["System"] = 0] = "System";
    Roles[Roles["User"] = 1] = "User";
})(Roles || (exports.Roles = Roles = {}));
;
var ContentType;
(function (ContentType) {
    ContentType[ContentType["Text"] = 0] = "Text";
    ContentType[ContentType["Image"] = 1] = "Image";
})(ContentType || (exports.ContentType = ContentType = {}));
var Status;
(function (Status) {
    Status[Status["Sent"] = 0] = "Sent";
    Status[Status["Received"] = 1] = "Received";
    Status[Status["Pending"] = 2] = "Pending";
})(Status || (exports.Status = Status = {}));
//Status Codes
exports.BAD_REQUEST = 400;
exports.OK = 200;
exports.CREATED = 201;
exports.NOT_FOUND = 404;
exports.UNAUTHORIZED = 401;
exports.INTERNAL_SERVER_ERROR = 500;
exports.SERVICE_UNAVAILABLE = 503;
exports.PERMANENT_REDIRECT = 301;
exports.TEMPORARY_REDIRECT = 301;
//Numbers
exports.ONE = 1;
exports.MINUSONE = -1;
exports.TWO = 2;
exports.ZERO = 0;
exports.HUNDRED = 100;
exports.BEARER = "bearer";
