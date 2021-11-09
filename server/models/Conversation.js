const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
