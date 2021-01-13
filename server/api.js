
import { Router } from "express";

import { Connection } from "./db";
import sql from "sql";
import moment from "moment";
import { workSpace, users } from "./slack";
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

const calculateArchiveRange = archiveDays => {
	const startDate =  moment().subtract(archiveDays,'day').format('YYYY-MM-DD');
	const endDate = moment().subtract(1,'day').format('YYYY-MM-DD');
	return [ startDate, endDate ];
};

const buildFilterOptions = async _ => {
	const client = await Connection.connect();

	try {
		const filter = {
					"locations": [],
					"performance": [],
		};
		
		let selectQuery = "SELECT performance from performance";
		const performance = await client.query(selectQuery);
		if(performance.rowCount){
			filter.performance = performance.rows.map(row => row.performance);
		} else {
			filter.performance = [ "High", "Medium", "Low" ];
		}

		selectQuery = "SELECT locations.name as city, classes.name as class, classes.channelname as channel FROM locations";
		selectQuery += ` INNER JOIN classes ON locations.id = classes.locationid ORDER BY locations.name, classes.name`;

		console.log(selectQuery)
		const table = await client.query(selectQuery);

		if(table.rowCount){
			let city = "";
			let classList = [];
			table.rows.forEach( (row, index) => {
				if( row.city === city || city === "" ){ 
					row.class.length && classList.push(row.class);
				}
				if( ((row.city !== city) && city)){
					
					filter.locations.push( { city: city, classes: classList } );
					console.log("location:", filter)
					classList = [];
					row.class.length && classList.push(row.class);
				}

				if(table.rowCount === (index + 1)){
					filter.locations.push( { city: row.city, classes: classList } );
				}
				
				city = row.city;
			});
			return filter;
		} else {
			res.status(404).send("No locations were found in the table");
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	} finally {
		client.release();
		console.log("Pool released....");
	}
};

router.get("/thresholds/test", async (req, res) =>{
 	const thresholds = await getThresholds();

	 	if(thresholds){
			await res.json({thresholds});
		 } else {
			 res.status(500).send("Server Error: Could not retrieve the thresholds")
		 }
	
});

const getThresholds = async _ => {
	let client;

	try {
		let thresholds = {
					"high": { posts: 0, reacts: 0, files: 0, attachments: 0},
					"medium": { posts: 0, reacts: 0, files: 0, attachments: 0},
					"low": { posts: 0, reacts: 0, files: 0, attachments: 0}
		};
		
		client = await Connection.connect();
		let selectQuery = 'SELECT level, "postsWeight", "reactsWeight", "attachmentsWeight", "filesWeight"  FROM "thresholds"';
		console.log(selectQuery);
		const thresholdsRows = await client.query(selectQuery);
		if(thresholdsRows.rowCount){
			thresholdsRows.rows.forEach(thresholdRow => {
					thresholds[ thresholdRow.level ].posts = thresholdRow.postsWeight;
					thresholds[ thresholdRow.level ].reacts = thresholdRow.reactsWeight;
					thresholds[ thresholdRow.level ].attachments = thresholdRow.attachmentsWeight;
					thresholds[ thresholdRow.level ].files = thresholdRow.filesWeight;
				});

			return thresholds;
		} else {
			return null;
		}
	} catch (error) {
		console.error("/thresholds: ", error.message);
	} finally{
		client.release();
	}
};

router.get("/students/:weeks",  async (req, res, next) => {
	let client =  await Connection.connect();
	try {

		let weeks = req.params.weeks;
			//const today = moment().format('x'); //.format('YYYY-MM-DD')
		if ( !(weeks && (weeks >= 1 && weeks <= 4)) ){
			weeks = 1;
		}
		//return res.json(weeks)
		let [ startDate, endDate ] = calculateArchiveRange( parseInt(weeks, 10) * 7 );			// from 7 to 28 days
		console.log("DATES: ",startDate, endDate)
		
		let  selectQuery = "SELECT username, classname, ";
		selectQuery += "SUM(posts) AS posts, SUM(reactions) AS reactions, SUM(attachments) AS attachments, SUM(files) AS files ";
		selectQuery += "FROM slackactivity ";
		selectQuery += "WHERE date >=  $1 AND date <= $2 ";
		selectQuery += "GROUP BY username, classname ORDER BY classname, username;";
		const result =   await client.query(selectQuery, [ startDate, endDate]);

		if( result.rowCount){
			console.log("sending results to client")
			const filter = await buildFilterOptions();
			const thresholds = await getThresholds();
			res.json({ 
				dateRange: `${startDate} ${endDate}`, 
							  filter: filter, 
							  thresholds: thresholds,
							  report: result.rows 
			});
		} else {
			res.status(404).send(`No activity found for date range(${startDate} - ${endDate})`);
		}
	} catch (error) {
		console.error("/students/:weeks: ", error.message);
	} finally{
		client.release();
	}
});


router.get("/filter", async (_, res, next) => {   // New filter 
	const client = await Connection.connect();
	try {
		const filter = {
					"locations": [],
					"performance": [],
		};
		let selectQuery = "SELECT performance from performance";
		const performance = await client.query(selectQuery);
		if(performance.rowCount){
			filter.performance = performance.rows.map(row => row.performance);
		} else {
			filter.performance = [ "Good", "Average", "Poor" ];
		}

		selectQuery = "SELECT locations.name as city, classes.name as class, classes.channelname as channel FROM locations";
		selectQuery += ` INNER JOIN classes ON locations.id = classes.locationid ORDER BY locations.name, classes.name`;

		console.log(selectQuery)
		const table = await client.query(selectQuery);

		if(table.rowCount){
			let city = "";
			let classList = [];
			table.rows.forEach( (row, index) => {
				if( row.city === city || city === "" ){ 
					row.class.length && classList.push(row.class);
				}
				if( ((row.city !== city) && city)){
					
					filter.locations.push( { city: city, classes: classList } );
					console.log("location:", filter)
					classList = [];
					row.class.length && classList.push(row.class);
				}

				if(table.rowCount === (index + 1)){
					filter.locations.push( { city: row.city, classes: classList } );
				}
				
				city = row.city;
			});
			await res.json(filter);
		} else {
			res.status(404).send("No locations were found in the table");
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server error");
	} finally {
		client.release();
		console.log("Pool released....");
	}
});


router.get("/filter/test", (_, res, next) => {

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
router.post("/threshold", async (req, res, next) => {
	let client = await Connection.connect();
	try{
		let thresholdObj = req.body;
		let thresholdValuesObj = thresholdObj.thresholdValues;
		let posts = thresholdValuesObj.posts;
		let reacts = thresholdValuesObj.reacts;
		let files = thresholdValuesObj.files;
		let attachments = thresholdValuesObj.attachments;
		let level = thresholdObj.thresholdLevel;
		let updateQuery = `UPDATE thresholds SET "postsWeight" = $1, "reactsWeight"=$2, "filesWeight"=$3, "attachmentsWeight" =$4 where "level" = $5 `;
		let queryDb = `SELECT "postsWeight", "reactsWeight", "filesWeight", "attachmentsWeight", "level" from thresholds`;
		
		let x = client.query(updateQuery, [posts,reacts,files,attachments,level]);
		let y = await client.query(queryDb);
		
		if(x.rowCount < 1){
			await res.json({ message: 'wasnt updated' });
		}else{
			await res.json(y.rows); //sending an array with all thresholds
		}
	}
	catch(error){
		console.error(error.message);
		return res.status(500).send("Server error");
	}finally {
		client.release();
		console.log("Pool released....");
	}
})
router.get("/threshold", async (req, res, next) => {
	let client = await Connection.connect();
	try{
		let queryDb = `SELECT "postsWeight", "reactsWeight", "filesWeight", "attachmentsWeight", "level" from thresholds`;
		let y = await client.query(queryDb);
		console.log(y)
		await res.json(y.rows)
	}
	catch(error){
		console.error(error.message);
		return res.status(500).send("Server error");
	}finally {
		client.release();
		console.log("Pool released....");
	}
})
router.post("/token", async (req, res, next) => {
	let client = await Connection.connect();
	try{
		let recievedToken = req.body.token;
		let updateQuery = `UPDATE token SET "token" = $1 where "id" = $2 `;
		let queryDb = `SELECT token FROM token WHERE id = 1 `
		let x = client.query(updateQuery, [recievedToken, 1]);
		let y = await client.query(queryDb);

		if(x.rowCount < 1){
			await res.json({ message: 'wasnt updated' });
		}else{
			await res.json(y.rows); //sending an array with all thresholds
		}
	}
	catch(error){
		console.error(error.message);
		return res.status(500).send("Server error");
	}finally {
		client.release();
		console.log("Pool released....");
	}
})
router.get("/token", async (req, res, next) => {
	let client = await Connection.connect();
	try{
		
		let queryDb = `SELECT token FROM token WHERE id = 1 `
		let y = await client.query(queryDb);

		if(y.rowCount < 1){
			await res.json({ message: 'wasnt updated' });
		}else{
			await res.json(y.rows); //sending an array with all thresholds
		}
	}
	catch(error){
		console.error(error.message);
		return res.status(500).send("Server error");
	}finally {
		client.release();
		console.log("Pool released....");
	}
})

export default router;
