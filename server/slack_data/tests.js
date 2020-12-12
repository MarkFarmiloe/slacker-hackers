const fs = require("fs");
const { WebClient, LogLevel } = require("@slack/web-api");

const token = process.env.SLACK_TOKEN;

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const web = new WebClient({
	token: token,
	// LogLevel can be imported and used to make debugging simpler
	logLevel: LogLevel.DEBUG,
});
// Store conversation history
let conversationHistory;

// Fetch users
async function fetchUsers() {
	try {
		const result = await web.users.list({
			token: token,
		});
		const users = result.members;
		console.log(users.length + " users found");
		return users;
	} catch (error) {
		console.error(error);
	}
}

// Fetch user email
async function fetchUserProfile(user) {
	try {
		const result = await web.users.profile.get({
			token: token,
			user: user,
		});
		const profile = result.profile;
		return profile;
	} catch (error) {
		console.error(error);
	}
}

// Fetch conversations
async function fetchConversations() {
	try {
		const result = await web.conversations.list({
			token: token,
		});
		const conversations = result.channels;
		console.log(conversations.length + " conversations found");
		return conversations;
	} catch (error) {
		console.error(error);
	}
}

// Fetch conversation history
async function fetchHistory(id) {
	try {
		const result = await web.conversations.history({
			token: token,
			channel: id,
		});
		conversationHistory = result.messages;
		console.log(conversationHistory.length + " messages found in " + id);
		return conversationHistory;
	} catch (error) {
		console.error(error);
	}
}

// Fetch conversation replies
async function fetchReplies(id, ts) {
	try {
		const result = await web.conversations.replies({
			token: token,
			channel: id,
			ts: ts,
		});
		const replies = result.messages;
		console.log(replies.length + " replies found in " + id + " with timestamp " + ts);
		return replies;
	} catch (error) {
		console.error(error);
	}
}

fetchUsers()
	.then((data) => {
		// console.log(data);
		const users = data.filter((u) => !u.deleted).map((u) => {
			return { slackUserId: u.id, name: u.real_name };
		});
		console.log(users);
		fs.writeFile("slackUsers.json", JSON.stringify(users), (err) => {
			if (err) {
				throw err;
			}
			console.log("The slackUsers file has been saved!");
		});
	})
	.catch((e) => console.log(e));


// fetchUserProfile("U01FU1B32SK");

// fetchConversations();

// fetchHistory("C01GETWS2JG");

// fetchReplies("C01GETWS2JG", "1607440773.001700");

