const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema({
	conversation: {
		type: Schema.Types.ObjectId,
		ref: "Conversation",
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	messageText: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});

const Message = model("Message", messageSchema);

module.exports = Message;
