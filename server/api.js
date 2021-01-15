
import { Router } from "express";

import { Connection } from "./db";
import sql from "sql";
import moment from "moment";
import { workSpace, users } from "./slack";
import filter from "./data/filter";
import testJSON from "./data/testPerformance";
import slackUsers from "./data/users.json";


const router = new Router();
 
router.get("/", (_, res, next) => {
	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });

	});
});

const createUserList = (userList) => {
	let users = [];
	userList = userList.data;

	for( let user in userList){
		let currentUser = { userid: user, name: userList[ user ].realName, };
		users.push(currentUser);
	}

	return users;
};



router.post("/create/users", async (_, res, next) => {
	const client = await Connection.connect();
	try {
		const usersToInsert = createUserList(slackUsers);
		const  performSchema = sql.define({
			name: "slackusers",
			columns: [
				"id",
				"name",
				"userid",
			],
		});

		const insertQuery = performSchema.insert(usersToInsert).returning(performSchema.id).toQuery();
		const result = await client.query(insertQuery)
		if(result.rowCount){
			res.json( { msg: "Updated the slack user table successfully", users: usersToInsert });
		} else {
			res.send("No Updates to the  slack user table were applied");
		}
	} catch (error) {
		console.log(error.message);
	}
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
	} finally {
		client && client.release();
	}
};


const getLastFourWeeks = async name => {
	let client = await Connection.connect();
	let report = [
		{ "id": "Posts", "data": [ ] },
		{ "id": "Reactions", "data": [ ] },
		{ "id": "Files", "data": [ ] },
		{ "id": "Attachments", "data": [ ] }
	];
 
	let  selectQuery = "SELECT username,  ";
	selectQuery += "SUM(posts) AS posts, SUM(reactions) AS reactions, SUM(attachments) AS attachments, SUM(files) AS files ";
	selectQuery += "FROM slackactivity ";
	selectQuery += "WHERE date >=  $1 AND date <= $2 AND username = $3 ";
	selectQuery += "GROUP BY username;";
	 let pastFourWeeks = [], dateRanges = [];
	 const FOURTH_WEEK = 4, FIRST_WEEK = 1, DAYS_IN_THE_WEEK = 7;
	 const daysToMonday = 6;
	 let diff = 7 - new Date().getDay();
	const date = moment().add( diff, 'day').format('YYYY-MM-DD');
	for(let weekNumber = FOURTH_WEEK ; weekNumber >= FIRST_WEEK; --weekNumber){
		// (7 days in a week * number of weeks) + number of days to get to Monday...
		let days = (DAYS_IN_THE_WEEK * weekNumber) + daysToMonday;                          
		let startDate = moment(date).subtract(days, 'days' ).format('YYYY-MM-DD');
		let endDate =  moment(date).subtract(weekNumber , 'week').format('YYYY-MM-DD');
		const userStat = await client.query(selectQuery, [ startDate, endDate, name ]);

		if(userStat.rowCount > 0){
			userStat.rows.forEach( stat => { 
				report.forEach( r => {
					switch(r.id){
						case "Posts":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: stat.posts});
							break;
						case "Reactions":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: stat.reactions});
							break;
						case "Files":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: stat.files});
							break;
						case "Attachments":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: stat.attachments});
							break;
					}
				});
			});
		} else {
			report.forEach( r => {
					switch(r.id){
						case "Posts":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: 0});
							break;
						case "Reactions":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: 0});
							break;
						case "Files":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: 0});
							break;
						case "Attachments":
							r.data.push({ x: moment(endDate).format('DD MMM'), y: 0});
							break;
					}
				});
		}
	}
	client.release();
	return report;
}


const getTotalStats = async (name, thresholdLevels) => {
	let client = await Connection.connect();
	let selectQuery = "SELECT date FROM slackactivity ORDER BY date LIMIT 1;"
	const dateRow = await client.query(selectQuery);
	const startDate = moment(dateRow.rows[0].date).format('YYYY-MM-DD');
	const endDate = moment().subtract(1, 'day').format('YYYY-MM-DD');

	selectQuery = "SELECT username,  ";
	selectQuery += "SUM(posts) AS posts, SUM(reactions) AS reactions, SUM(attachments) AS attachments, SUM(files) AS files ";
	selectQuery += "FROM slackactivity ";
	selectQuery += "WHERE username =  $1 ";
	selectQuery += "GROUP BY username;";

	const userStats = await client.query(selectQuery, [ name ]);
	const slackUser = userStats.rowCount > 0 ? userStats.rows[0] : null;
	let report = { totalRange: `${startDate} ${endDate}`, totals: [] } ;
	const activityList = Object.keys(thresholdLevels);
	activityList.forEach( activity => {
		let total = {};
		switch(activity){
			case "posts":
				total[ "id" ] = "posts";
				total[ "label" ] = "posts";
				total[ "value"  ] = userStats.rowCount > 0 ? slackUser.posts : 0;
				report.totals.push(total);
				break;
			case "reacts":
				total[ "id" ] = "reacts";
				total[ "label" ] = "reacts"
				total[ "value"  ] = userStats.rowCount > 0 ? slackUser.reactions : 0;
				report.totals.push(total);
				break;
			case "attachments":
				total[ "id" ] = "attachments";
				total[ "label" ] = "attachments";
				total[ "value"  ] = userStats.rowCount > 0 ? slackUser.attachments : 0;
				report.totals.push(total);
				break;
			case "files":
				total[ "id" ] = "files";
				total[ "Done" ] = "files";
				total[ "value"  ] = userStats.rowCount > 0 ? slackUser.files : 0;
				report.totals.push(total);
				break;
		}
	});

	client.release();
	return report;
};

const getWeeklyStats = async (name, thresholdLevels) => {
	let  selectQuery = "SELECT username,  ";
	selectQuery += "SUM(posts) AS posts, SUM(reactions) AS reactions, SUM(attachments) AS attachments, SUM(files) AS files ";
	selectQuery += "FROM slackactivity ";
	selectQuery += "WHERE date >=  $1 AND date <= $2 AND username = $3 ";
	selectQuery += "GROUP BY username;";

	const diff = new Date().getDay() - 1;
	const startDate = moment().subtract( diff, 'day').format('YYYY-MM-DD');
	const endDate = moment().add( 6 - diff , 'day').format('YYYY-MM-DD');
	let client = await Connection.connect();
	const userStats = await client.query(selectQuery, [ startDate, endDate, name ]);
	const slackUser = userStats.rowCount ? userStats.rows[0] : 0;  //weekRange: report.weekRange, goals: report.week
	let report = { weekRange: `${startDate} ${endDate}`, week: [] } ;
	const activityList = Object.keys(thresholdLevels);
	activityList.forEach( activity => {
		let goal = {};
		switch(activity){
			case "posts":
				goal[ "action" ] = "POSTS";
				goal[ "Done" ] = userStats.rowCount ? slackUser.posts : 0;
				goal[ "Left To Do"  ] = thresholdLevels.posts <= goal[ "Done" ] ? 0 : thresholdLevels.posts - goal[ "Done" ];
				report.week.push(goal);
				break;
			case "reacts":
					goal[ "action" ] = "REACTS";
					goal[ "Done" ] = userStats.rowCount ? slackUser.reactions: 0;
					goal[ "Left To Do"  ] = thresholdLevels.reacts <= goal[ "Done" ] ? 0 : thresholdLevels.reacts - goal[ "Done" ];
					report.week.push(goal);
					break;
			case "attachments":
					goal[ "action" ] = "ATTACHMENTS";
					goal[ "Done" ] = userStats.rowCount ? slackUser.attachments : 0;
					goal[ "Left To Do"  ] = thresholdLevels.attachments <= goal[ "Done" ]  ? 0 : thresholdLevels.attachments - goal[ "Done" ];
					report.week.push(goal);
					break;
			case "files":
					goal[ "action" ] = "FILES";
					goal[ "Done" ] = userStats.rowCount ? slackUser.files : 0;
					goal[ "Left To Do"  ] = thresholdLevels.files <= goal[ "Done" ] ? 0 : thresholdLevels.files - goal[ "Done" ];
					report.week.push(goal);
					break;
		}
		});
	client.release();
	return report;
};

router.get("/report/lastfourweeks/:name",  async (req, res, next) => {
	const name = req.params.name;
	const report = await getLastFourWeeks(name);
	res.json(report)
});

const getUsername = async (id) => {
	const selectQuery = "SELECT name FROM slackusers WHERE userid = $1";
	let client = await Connection.connect();
	const username =  await client.query(selectQuery, [ id ]);
	return username.rows[0].name;
}

router.get("/student-profile/:userid",  async (req, res, next) => {
	try {
		const userid = req.params.userid;
		const name = await getUsername(userid);
		if(userid && name){
			const thresholds = await getThresholds();
			const weekly = await getWeeklyStats(name, thresholds[ "high"]);
			const total = await getTotalStats(name, thresholds[ "high"]);
			const fourWeeks = await getLastFourWeeks(name);
			let report = {};
			report[ "name" ] = name;
			report[ "Weekly Stats" ]  = weekly;
			report[ "Total Stats" ]  = total;
			report[ "Last 4 Weeks" ]  = fourWeeks;
			res.json({ report });
		} else {
			res.status(404).send("/student-profle/:name: recieved an invalid name");
		}
	} catch (error) {
		console.error("/student-profle/:userid: ", error.message);
	}
});


const addSlackIds = (users, userIdTable) => {
	const userMap = {};
	userIdTable.forEach( user => {
		return userMap [ user.name ] = user.userid;
	});

	
	const userList = users.map( user => {
		let u = {};
		console.log("addSlackIds")
		user[ "userid" ] = userMap[ user.username ];
		//console.log("addSlackIds", user)
		return user;
	});

	return userList;
};



router.get("/students/:weeks",  async (req, res, next) => {
	let client;
	try {
		client =  await Connection.connect();
		let weeks = req.params.weeks;

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
		const activeUsers =   await client.query(selectQuery, [ startDate, endDate]);

		if( activeUsers.rowCount){
			selectQuery = "SELECT * from slackusers";
			const slackUserList =   await client.query(selectQuery);
			const activeUserList = addSlackIds(activeUsers.rows, slackUserList.rows);
			console.log("sending results to client")
			const filter = await buildFilterOptions();
			const thresholds = await getThresholds();
			res.json({
				dateRange: `${startDate} ${endDate}`, 
							  filter: filter, 
							  thresholds: thresholds,
							  report: activeUserList 
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
