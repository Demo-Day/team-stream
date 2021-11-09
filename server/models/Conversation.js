const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
	event: {
		type: Schema.Types.ObjectId,
		ref: "Event",
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	messages: [
		{
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
	],
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
