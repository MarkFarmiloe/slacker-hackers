
import { Router } from "express";

import { Connection } from "./db";
import filter from "./data/filter";
//import testJSON from "./data/testPerformance.json";

const router = new Router();

router.get("/", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
	});
});
/*
router.get("/students", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /students");
		res.json(testJSON);
	});
});
*/
router.get("/filter", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /filter");
		res.json(filter);
	});
});

router.get("/filter/locations", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /search/criteria");
		res.json(filter.locations);
	});
});

router.get("/filter/classes", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /search/criteria");
		res.json(filter.classes);
	});
});

router.get("/filter/performance", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /search/criteria");
		res.json(filter.performance);
	});
});

router.get("/test", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to ROUTE /test");
		res.send("The ROUTE is /api/test");
	});
});

export default router;
