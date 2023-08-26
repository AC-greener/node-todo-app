"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const oneDay = 1000 * 60 * 60 * 24;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    name: "uid",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    store: connect_mongo_1.default.create({
        mongoUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s5kyres.mongodb.net/?retryWrites=true&w=majority`,
    }),
}));
app.use(routes_1.default);
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s5kyres.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.set('useFindAndModify', false)
function startServer() {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
mongoose_1.default
    .connect(uri)
    .then(() => {
    startServer();
    // if (require.main === module) {
    //   // application run directly; start app server
    //   startServer();
    // } else {
    //   // application imported as a module via "require": export function to create server
    //   module.exports = startServer;
    // }
    // app.listen(PORT, () =>
    //   console.log(`Server running on http://localhost:${PORT}`)
    // )
})
    .catch((error) => {
    throw error;
});
