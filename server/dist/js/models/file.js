"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    name: String,
    data: Buffer,
    contentType: String,
});
const ImageModel = mongoose_1.default.model('Image', imageSchema);
exports.default = ImageModel;
