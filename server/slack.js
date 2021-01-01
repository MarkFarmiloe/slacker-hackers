// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App, LogLevel } = require("@slack/bolt");
//require("dotenv").config();

const token = process.env.slackToken;
const secret = process.env.slackSigningSecret;
const slackApp = new App({
	token: token,
	signingSecret: secret,
	// LogLevel can be imported and used to make debugging simpler
	logLevel: LogLevel.DEBUG,
});

//const SLACK_PORT = process.env.PORT || 3000;
// We currently generate & manage user & channel statistics based on what is received from a set of Slack API calls....
const workSpace = { 
	archived: 0,
	private: 0,
	userCount: 0,
	channelCount: 0,
	users: {},			// Config data - A list of the available users in the Slack Workspace
	channels: {},	// Config data - A ist of the availale channels in the Slack Workspace
	 posts: [],			// All the posts returned by the Slack API
     calls: [],          // Data on calls are not provided by default...we will need to create an App that makes calls...
	 reactions: [],
	 attachments: [],
	 files: [],
	 postCount: 0,
	 reactionCount: 0,
	 callCount: 0,
	 attachmentCount: 0,
	 fileCount: 0,
	 getPostCount: function(){ return this.postCount },
	 getReactionCount: function(){ return this.reactionCount },
	 getCallCount: function(){ return this.callCount },
	 getAttachmentCount: function(){ return this.attachmentCount },
	 getFileCount: function(){ return this.fileCount },
	 fullReset: function(){ 
		this.posts = []; this.reactions = []; this.attachments = []; this.files = [];
		this.postCount = this.callCount = this.reactionCount = this.attachmentCount = this.fileCount = 0;
	},
	reset: function(){ 
		this.posts = []; this.reactions = []; this.attachments = []; this.files = [];
		this.postCount = this.callCount = this.reactionCount = this.attachmentCount = this.fileCount = 0;
	},
	 setUserCount: function(count){ this.userCount = count },
	 setChannelCount: function(count){ this.channelCount = count },
	 getUserCount: function(){ return this.userCount },
	 getChannelCount: function(){ return this.channelCount },
	 fetchChannelList: _ => fetchChannelList(),
	 getChannels: function(){ return this.channels },
	 fetchUserList:  _ => fetchUserList() ,
	 getUsers: function(){ return this.users },
	 selectSlackPosts: (startDate, endDate) => selectSlackPosts(startDate, endDate),
	 getPosts: function(){ return this.posts },
	 getReactions: function(){ return this.reactions },
	 getAttachments: function(){ return this.attachments },
	 getFiles: function(){ return this.files },
	 getAll: function() { return this },
	 getSlackConfig: async function(){
		this.reset();
		await this.fetchUserList();
		await this.fetchChannelList();
	 },
	 archiveData: function(start, end) { archiveData(start, end); }
}
//setTimeout(lcdLog, nextReset());

const getReplyDate = (timestamp) => {
	const months = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
	let date = new Date(Number(timestamp) * 1000);
	//console.log("getReplyDate()", `${date.getFullYear()}-${months[ date.getMonth() ]}-${date.getDate()}`);
	return  `${date.getFullYear()}-${months[ date.getMonth() ]}-${date.getDate()}`;
};

// Fetch conversation replies
async function fetchReplies(id, scope) {
	try {
		//scope = { token: process.env.SLACK_USER_TOKEN, channel:  id, ts: searchType.ts };
		scope.token = token;
		scope.channel = id;
		scope.limit = 200;
		//console.log(scope);
		//let userChannelStats = {};
		do {
			const result = await slackApp.client.conversations.replies( scope );
			const replies = result.messages;
			//userChannelStats = { posts: 0, reactions: 0, attachments: 0, files: 0 };

			replies.forEach( (reply) => {
				/* if(workSpace.getChannels()[id].name === "westmidlands-class2")
					console.log("REPLY[westmidlands-class2]", reply) */
				//workSpace.users[ reply.user  ].channels[ id ] = userChannelStats;

				// The reactions user array may contain a user ID that  doesn't already exist...
				if( workSpace.users[ reply.user  ].channels[ id ] === undefined ){
					//workSpace.users[ user ].channels = {};
					/* console.log("workSpace.users[ user  ].channels[ id ] UNDEFINED")
					console.log("USER: ", workSpace.users[ reply.user ].realName, 
										" reaction: ", workSpace.getUsers()[ reply.user ].realName) */
					workSpace.users[ reply.user ].channels[ id ] = { posts: 0, reactions: 0, attachments: 0, files: 0 };
					workSpace.users[ reply.user ].channels[ id ].channelName = workSpace.getChannels()[id].name;
				}
				
				if(reply.text.length){    					// Was a message actually posted?
					let post = {
						userId: reply.user, userName: workSpace.getUsers()[ reply.user ].realName,
						channelId: id, channelName: workSpace.getChannels()[id].name,
						message: reply.text, messageId: reply.client_msg_id,
						timestamp: reply.ts, date: getReplyDate(reply.ts),
						isReply: "parent_user_id" in reply,
					};

					if( post.isReply ) {
						post.parentUserId = reply.parent_user_id;
					}

					workSpace.users[ reply.user  ].channels[ id ].posts++;
					workSpace.channels[ id ].posts++;
					++workSpace.postCount;
					workSpace.posts.push(post);
				}

				if( "reactions" in reply){
					//console.log("REACTIONS:", reply.reactions);
					reply.reactions.forEach( (reaction) => {
						let name = reaction.name;
						reaction.users.forEach( (user) => {
							let reaction = {
								userId: user, userName: workSpace.getUsers()[ user ].realName,
								channelId: id, channelName: workSpace.getChannels()[ id ].name,
								message: reply.text, messageId: reply.client_msg_id, name: name,
								timestamp: reply.ts, date: getReplyDate(reply.ts),
							};
							++workSpace.reactionCount;
							
							// The user array may not contain a user ID that  doesn't already exist...
							if( workSpace.users[ user  ].channels[ id ] === undefined ){
								workSpace.users[ user ].channels[ id ] = { posts: 0, reactions: 0, attachments: 0, files: 0 };
								workSpace.users[ user ].channels[ id ].chanelName = reaction.channelName;
							}
							workSpace.users[ user  ].channels[ id ].reactions++;
							++workSpace.getChannels()[ id ].reactions;
							workSpace.reactions.push(reaction); //
						});
					});
				}

				if( "attachments" in reply){
					//console.log("ATTACHMENTS:", reply.attachments);
					reply.attachments.forEach( (file) => {
						let attachment = {
								userId: reply.user, userName: workSpace.getUsers()[ reply.user  ].realName,
								channelId: id, channelName: workSpace.getChannels()[ id ].name,
								message: reply.text, messageId: reply.client_msg_id,
								title: file.title, url: file.title_link, 
								timestamp: reply.ts, date: getReplyDate(reply.ts),
							};
							++workSpace.attachmentCount;
							++workSpace.getChannels()[ id ].attachments;
							workSpace.users[ reply.user  ].channels[ id ].attachments++;
							workSpace.attachments.push(attachment);
					});
				}

				if( "files" in reply){
					//console.log("FILES:", reply.files);
					reply.files.forEach( (currentFile) => {
						let file = {
								userId: reply.user, userName: workSpace.getUsers()[ reply.user  ].realName,
								channelId: id, channelName: workSpace.getChannels()[ id ].name,
								message: reply.text, messageId: reply.client_msg_id,
								title: currentFile.title, 
								timestamp: reply.ts, date: getReplyDate(reply.ts),
								//timestamp: currentFile.ts, date: getReplyDate(currentFile.ts),
							};
							++workSpace.fileCount;
							++workSpace.getChannels()[ id ].files;
							workSpace.users[ reply.user  ].channels[ id ].files++;
							workSpace.files.push(file);
					});
				}
			});
			if( "response_metadata" in result && "next_cursor" in result.response_metadata ){
					scope.cursor = result.response_metadata.next_cursor;  // Ah, there is more data to retrieve....
					//console.log("Getting more replies")
				}
		} while ("cursor" in scope && scope.cursor.length);
	} catch (error) {
		console.error(error);
	}
}


// Fetch conversation history using ID from last example
async function fetchConversationHistory(startDate = null, endDate = null) {                   // By Channel id
	try {
		// channels = getChannelList();
		let scope = {};

		if( startDate && endDate){
			[ scope.oldest, scope.latest ] = [ startDate, endDate ];
		}
		//console.log("fetchConversationHistory(SCOPE)",scope.oldest, scope.latest);
		const channels = workSpace.getChannels();
		for (let channel in channels) {
			//console.log("fetchConversationHistory(): ", channels[channel].name);
			
			//console.log("fetchConversationHistory(PASSED THE TEST): ", channels[channel].name);
			// Call the conversations.history method using the built-in WebClient
			const result = await slackApp.client.conversations.history({
				token: token,    // The token you used to initialize your app
				channel: channel,
			});

			//console.log("fetchConversationHistory:SCOPE = ", scope.oldest, scope.latest);
			//console.log("fetchConversationHistory", result.messages)
			result.messages.forEach( (conversation) => {
				
				if( conversation.ts >= scope.oldest && conversation.ts <= scope.latest){
					//console.log("fetchConversationHistory: TS = ", conversation.ts);
			//		console.log("fetchConversationHistory(CONVERSATION)", conversation)
					if( conversation.type === "message" && "subtype" in conversation === false){
						/*! ("oldest" in scope) && */ scope.ts = conversation.ts;  // No date range?, so lets grab every
						fetchReplies(channel, scope);
					}
				}
			});
		}
		//console.log("About to display posts.....")
		//console.log("POSTS: ", workSpace.posts);
	} catch (error) {
		console.error(error);
	}
}

// Fetch users using the users.list method
const fetchUserList = async  _ => {
	try {
		let scope = {
			token: token,   // // The token you used to initialize your app
			limit: 200,
		};
		
		let resourceCount = 0;
		(async () => {
			do {								// Call the users.list method using the built-in WebClient
			const result =  await slackApp.client.users.list( scope );
			/* if(resourceCount === 0)
				console.log("USER: ",result.members) */
			resourceCount += result.members.length;
			
			 buildUserTable(result.members);
			if( "response_metadata" in result && "next_cursor" in result.response_metadata ){
				scope.cursor = result.response_metadata.next_cursor;  // Ah, is there more data to retrieve?....
			}
		} while ("cursor" in scope && scope.cursor.length);
		 workSpace.setUserCount(resourceCount);
		console.log("USERS[SIZE]", workSpace.getUserCount())
		//console.log("About to return from fetchUserList()")
		return  workSpace.users;
		})();
		
	} catch (error) {
		console.error(error);
	}
};

// Put users into the JavaScript object
const buildUserTable =  (userList) => {
	let userId = "";

	userList.forEach((currentUser) => {
		// Key user info on their unique user ID
		if(currentUser.deleted || currentUser.is_bot || currentUser["profile"].real_name === "Slackbot") {
			return;
		}

		let  user = {};
		userId = currentUser["id"];
		user.name = currentUser["name"];
		user.realName = currentUser.profile.real_name;
		user.displayName = currentUser.profile.display_name;
		user.channels = {};
		user.team = "";
		workSpace.users[userId] = user;
	});
}

const  fetchChannelList = async _ => {
	try {
		let scope = { 
			token: token,            // Not allowed to access any resources without a valid token
			limit: 200,                // Who knows how many resourses are available, lets page by the limit value
			//types: "public_channel, private_channel",  <---- DO NOT ENABLE ABILITY TO VIEW PRIVATE CHANNELS
		};
		let resourceCount = 0;
		//console.log("fetchChannelList( START )  -  EVERYTHING: ");
		do {			// Call the conversations.list method using the built-in WebClient
			let result =  await slackApp.client.conversations.list( scope );
			//console.log(result.channels);
			/* if(resourceCount === 0)
				console.log("CHANNEL: ",result.channels[0]); */
			resourceCount += result.channels.length;
			 buildChannelTable(result.channels);
			//console.log(result);
			if( "response_metadata" in result && "next_cursor" in result.response_metadata ){
				scope.cursor = result.response_metadata.next_cursor;  // Ah, there is more data to retrieve....
			}
		} while ("cursor" in scope && scope.cursor.length);
		workSpace.setChannelCount(resourceCount);
		console.log("CHANNELS[SIZE]", workSpace.getChannelCount())
		//console.log("fetchChannelList(END) - EVERYTHING: ");
	} catch (error) {
		console.error(error);
	}
};


function buildChannelTable(channelList) {
	let channelId = "";

	channelList.forEach((currentChannel) => {
		if(currentChannel.name !== "westmidlands-class1" && currentChannel.name !== "westmidlands-class2"){
				return;     // Still in TESTING MODE, so ONLY monitor these groups.....
		}
		if(currentChannel.is_archived || currentChannel.is_private){
			if(currentChannel.is_archived) workSpace.archived++;
			if(currentChannel.is_private) workSpace.private++
			return;                        // currently NOT iterested in archived or private channels
		}

		let  channel = {};
		channelId = currentChannel["id"];
		channel["name"] = currentChannel["name"];
		channel.posts = 0;
		channel.reactions = 0;
		channel.files = 0;
		channel.attachments = 0;

		if(currentChannel.is_channel) {
			channel.public = true;
		}

		if(currentChannel.is_private) {
			channel.public = false;
		}

		workSpace.channels[channelId] = channel;
	});
}

const selectSlackPosts = async (startDate, endDate) => { 
	// date is in 'YYYY-MM-DD' format
	//const ts = 1607435650  * 1000; // Start time: 1607385600  End time: 1607471999
	//date = "2020-12-08";    Start time: 1607385600  End time: 1607471999
	  fetchConversationHistory(startDate, endDate);
	 return workSpace.getAll();
}

const archiveData = async (startDate, endDate) => {
	await fetchConversationHistory(startDate, endDate);
	await archiveLog();
	
}

export {  workSpace  } ;

/* (async () => {
  // Start your slack
  await slackApp.start(SLACK_PORT);

  console.log(`⚡️ Bolt slack is running the Slacker Hackers service on Slack Port id ${SLACK_PORT}!`);
})(); */
