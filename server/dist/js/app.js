"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const PORT = process.env.PORT || 4000;
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const oneDay = 1000 * 60 * 60 * 24;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(session({
    name: "uid",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    store: MongoStore.create({
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
