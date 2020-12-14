import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
const cors = require("cors");

import router from "./api";
import { httpsOnly, logErrors, pushStateRouting } from "./middleware";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");


const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(logErrors());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
	app.disable("etag");
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

export default app;
