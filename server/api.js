
import { Router } from "express";

import { Connection } from "./db";
import sql from "sql";
import filter from "./data/filter";
import testJSON from "./data/testPerformance";

const router = new Router();

router.get("/", (_, res, next) => {
	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });

	});
});

router.get("/create/perform", (_, res, next) => {
	const usersToInsert = testJSON;
	const  performSchema = sql.define({
		name: "perform",
		columns: [
			"id",
			"name",
			"posts",
			"week",
			"location",
			"class",
			"performance",
		],
	});

	Connection.connect((err, client, release) => {
		if (err) {
			return next(err);
		}

		const insertQuery = performSchema.insert(usersToInsert).returning(performSchema.id).toQuery();

		client.query(insertQuery)
			.then((result) => {
				if(result.rowCount){
					res.send("Updated the perform table successfully");
				} else {
					res.send("No Updates to the  perform table were applied");
				}
				release();
			}).catch((e) => console.log(e));
	});
});

router.get("/perform", (_, res, next) => {
	const selectQuery = "SELECT * FROM perform";

	Connection.connect((err, client, release) => {
		if (err) {
			res.status(400).json( { message: "Connection issue. Check the server logs" });
			return next(err);
		}
		client.query(selectQuery)
			.then((result) => {
				if(result.rowCount){
					res.json(result.rows);
				} else {
					res.status(404).send("Could not find any statistics in the  perform table");
				}

				release();
			}).catch((e) => console.log(e));
	});
});

router.get("/filter", (_, res, next) => {

	/* Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /filter");
		res.json(filter);
	}); */
	res.json(filter);
});

router.get("/filter/locations", (_, res, next) => {

	/* Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /search/criteria");
		res.json(filter.locations);
	}); */
	res.json(filter.locations);
});

router.get("/filter/classes", (_, res, next) => {

	/* Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /search/criteria");
		res.json(filter.classes);
	}); */
	res.json(filter.classes);
});

router.get("/filter/performance", (_, res, next) => {

	/* Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		console.log("responded to route /search/criteria");
		res.json(filter.performance);
	}); */
	console.log("responded to route /search/criteria");
	res.json(filter.performance);
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
