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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const formidable_1 = __importDefault(require("formidable"));
const file_1 = __importDefault(require("../models/file"));
const fs_1 = __importDefault(require("fs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // save user info to db
    const user = new user_1.default({
        username,
        password
    });
    req.session.user = {
        username,
        password
    };
    console.log("req.session", req.session);
    console.log("req.session", req.session.id);
    const newUser = yield user.save();
    console.log('newUser :>> ', newUser);
    res.status(200).json({ message: "login success" });
});
exports.login = login;
const upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({});
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            next(err);
            return;
        }
        const uploadImg = files.file[0];
        console.log('files :>> ', files.file[0]);
        console.log('uploadImg :>> ', uploadImg.filepath);
        try {
            const imgBuffer = fs_1.default.readFileSync(uploadImg.filepath);
            const image = new file_1.default({
                name: uploadImg.newFilename,
                data: imgBuffer,
                contentType: uploadImg.mimetype,
            });
            yield image.save();
        }
        catch (err) {
            next(err);
            return;
        }
        //save img file to db
        res.json({ fields, files });
    }));
});
exports.upload = upload;
