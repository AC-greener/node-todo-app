import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app: Express = express();

const session = require("express-session");
const MongoStore = require("connect-mongo");
const PORT: string | number = process.env.PORT || 4000;

const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    name: "uid",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s5kyres.mongodb.net/?retryWrites=true&w=majority` }),
  })
);

app.use(todoRoutes);
app.get('/', (req, res) => {
  
  console.log('req.session :>> ', req.session);
  console.log("sessionID", req.sessionID)
  res.send('Hello World!')
})
const uri: string = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s5kyres.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.set('useFindAndModify', false)

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
