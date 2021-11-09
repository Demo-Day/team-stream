import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import Conversations from "./Conversations";

import { SEND_MESSAGE } from "../../utils/mutations";

import "../../css/Chat.css";

export default function Chat({ event }) {
	const [messageText, setMessageText] = useState("");
	const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

	const id = event.conversation?._id;
	const handleChange = (event) => {
		const { name, value } = event.target;
		setMessageText(value);
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await sendMessage({
				variables: {
					conversationId: id,
					messageText,
				},
			});

			setMessageText("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="container-fluid fadeIn ">
			<div className="row">
				<div className="col-12 chatMessages ">
					<h3>Live Chat</h3>
					<div className="d-flex flex-column">
						<Conversations conversation={event.conversation} />
					</div>
					<div className="chatInput">
						<form onSubmit={handleFormSubmit}>
							<textarea
								name="messageText"
								value={messageText}
								onChange={handleChange}
								className="form-control"
								placeholder="Type your message"
							></textarea>
							<button type="submit" className="btn btn-secondary">
								Send
							</button>
						</form>
					</div>
				</div>
				<div className="col-12 col-sm-3 col-xl-1 chatOnline "></div>
			</div>
		</div>
	);
}
