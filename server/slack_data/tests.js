// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

const token = process.env.SLACK_TOKEN || "xoxb-1576628019408-1568414586276-IRrVkoO8hclJYgL9FguNG09T";

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
			// The token you used to initialize your app
			token: token,
		});
		// console.log(result);
		const users = result.members;
		// Print results
		console.log(users.length + " users found");
		console.log(users);
	} catch (error) {
		console.error(error);
	}
}

// Fetch user email
async function fetchUserProfile(user) {
	try {
		const result = await web.users.profile.get({
			// The token you used to initialize your app
			token: token,
			user: user,
		});
		// console.log(result);
		const profile = result.profile;
		// Print results
		console.log(profile);
	} catch (error) {
		console.error(error);
	}
}

// Fetch conversations
async function fetchConversations() {
	try {
		const result = await web.conversations.list({
			// The token you used to initialize your app
			token: token,
		});
		// console.log(result);
		const conversations = result.channels;
		// Print results
		console.log(conversations.length + " conversations found");
		console.log(conversations);
	} catch (error) {
		console.error(error);
	}
}

// Fetch conversation history
async function fetchHistory(id) {
	try {
		const result = await web.conversations.history({
			// The token you used to initialize your app
			token: token,
			channel: id,
		});
		conversationHistory = result.messages;
		// Print results
		console.log(conversationHistory.length + " messages found in " + id);
		console.log(conversationHistory);
	} catch (error) {
		console.error(error);
	}
}

// Fetch conversation replies
async function fetchReplies(id, ts) {
	try {
		const result = await web.conversations.replies({
			// The token you used to initialize your app
			token: token,
			channel: id,
			ts: ts,
		});
		const replies = result.messages;
		// Print results
		console.log(replies.length + " replies found in " + id + " with timestamp " + ts);
		console.log(replies);
	} catch (error) {
		console.error(error);
	}
}

// fetchUsers();

fetchUserProfile("U01FU1B32SK");

// fetchConversations();

// fetchHistory("C01GETWS2JG");

// fetchReplies("C01GETWS2JG", "1607440773.001700");

