const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
	event: {
		type: Schema.Types.ObjectId,
		ref: "Event",
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
