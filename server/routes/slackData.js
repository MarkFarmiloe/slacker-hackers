
const router  = require("express").Router();
import { Connection } from "../db";
import sql from "sql";
import { workSpace, users } from "../slack";



router.get("/users/populate",  (_, res, next) => {
    //if( await workSpace.getUserCount() === 0){
        console.log("calling fetchUserList() to populate users list")
         //const users =  await workSpace.fetchUserList();
        //console.log(users)
    //}
    console.log("responded to route /slack/users/populate");
     //const users = await workSpace.getUsers();
        //console.log(workSpace.users)
    workSpace.fetchUserList()
	  res.json("request pending....");
});

router.get("/users", async (_, res, next) => {
    //if( await workSpace.getUserCount() === 0){
        //console.log("calling fetchUserList() to populate users list")
         //const users =  await workSpace.fetchUserList();
        //console.log(users)
    //}
    console.log("responded to route /slack/users");
     //const users = await workSpace.getUsers();
        //console.log(workSpace.users)

	 res.json(workSpace.users);
});


router.get("/channels/populate", (_, res, next) => {
    //if(workSpace.getChannelCount() === 0){
     //   console.log("calling fetchChannelList() to populate channel list")
        workSpace.fetchChannelList();
    //}
	console.log("responded to route /slack/channels");
	res.json(workSpace.channels);
});

router.get("/channels", (_, res, next) => {
    /* if(workSpace.getChannelCount() === 0){
        console.log("calling fetchChannelList() to populate channel list")
        workSpace.fetchChannelList();
    } */
	console.log("responded to route /slack/channels");
	res.json(workSpace.channels);
});

const isValidDate = (date) => {
	if(date){
		const dateArray = date.split("-");
		const yyyy = parseInt(dateArray[0], 10);
		const mm = parseInt(dateArray[1], 10);
		const dd = parseInt(dateArray[2], 10);
		// Validate the month and year
		if(yyyy < 1970 || yyyy > 2112 || mm === 0 || mm > 12) {  // RUSH(2112) - Geddy Lee, Alex Lifeson & Neil Peart
			return false;
		}

		let daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		//  Is this a leap year
		if(yyyy % 400 === 0 || (yyyy % 100 != 0 && yyyy % 4 === 0)) {
			daysInMonth[1] = 29;
		}
		// Validate the day
		return dd >= 1 && dd <= daysInMonth[mm - 1];
	} else {
		return false;
	}
};

const timestampRange = (startDate, endDate) => {
	let dateArray = startDate.split("-");
	let mm = parseInt(dateArray[1], 10);
	let month = (--mm).toString().padStart(2, "0");
	const start = new Date(dateArray[0], month, dateArray[2], 0, 0, 0).getTime() / 1000;
	dateArray = endDate.split("-");
	mm = parseInt(dateArray[1], 10);
	month = (--mm).toString().padStart(2, "0");
	const end = new Date(dateArray[0], month, dateArray[2], 23, 59, 59).getTime() / 1000;
	return [ start.toString(), end.toString() ];
};

router.get("/reactions", (_, res, next) => {
	console.log("responded to route /reactions");
	res.json(workSpace.getReactions());
});

router.get("/attachments", (_, res, next) => {
	console.log("responded to route /attachments");
	res.json(workSpace.getAttachments());
});

router.get("/files", (_, res, next) => {
	console.log("responded to route /files");
	res.json(workSpace.getFiles());
});


router.get("/posts", (_, res, next) => {
	console.log("responded to route /posts");
	res.json(workSpace.getAll());
});


router.get("/posts/:date", async (req, res, next) => {
	if(req.params.date && isValidDate(req.params.date)){
		const [ startDate, endDate ] = timestampRange(req.params.date, req.params.date);
		//const posts =
		//await workSpace.reset();
		 const wkSpaceData = await workSpace.selectSlackPosts(startDate, endDate);
		//console.log(workSpace.posts);
		await res.json(wkSpaceData);
	} else {
		res.status(400).send("Invalid Date Format");
	}
});


router.get("/posts/:startDate/:endDate", async (req, res, next) => {
	try {
			if(req.params.startDate &&   req.params.endDate && isValidDate(req.params.startDate) && isValidDate(req.params.endDate)){
			const [ startDate, endDate ] = timestampRange(req.params.startDate, req.params.endDate);
			const workSpaceData = await workSpace.selectSlackPosts(startDate, endDate);
			res.json(workSpaceData);
			} else {
				res.status(400).send("Invalid Date Format");
			}
	} catch (error) {
		console.error(error.mesage);
		res.status(500).send("Server error");
	}
	
});

router.get("/config", async (req, res, next) => {
    await workSpace.getSlackConfig();
    await res.send("Slack config reset requested....")
});

router.post("/archive/:date", async (req, res, next) => {
	if(req.params.date && isValidDate(req.params.date)){
		const [ startDate, endDate ] = timestampRange(req.params.date, req.params.date);
		await workSpace.archiveData(startDate, endDate);
		//console.log(workSpace.posts);
		await res.json(wkSpaceData);
	} else {
		res.status(400).send("Invalid Date Format");
	}
    await res.send("Slack config reset requested....")
});

module.exports = router;