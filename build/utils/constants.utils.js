"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.ContentType = exports.Roles = exports.corsOptions = void 0;
const allowedOrigins = ['http://localhost:3000', "https://resolutio.ai"];
exports.corsOptions = {
    origin: allowedOrigins
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
