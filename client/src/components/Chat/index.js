import React from "react";
import "../../css/Chat.css";
import Conversations from "./Conversations";
export default function Chat() {
	return (
		<div className="container-fluid">
			<div className="row">
				<h1>Chat</h1>
				<div className="col-12 col-sm-3 col-xl-2 chatMenu">
					<h3>Search</h3>
					<input
						type="text"
						placeholder="Search for Friends"
						className="form-control"
					/>
				</div>
				<div className="col-12 col-sm-6 col-xl-8 chatMessages">
					<h3>Conversation with This Friend</h3>
					<div className="d-flex flex-column">
						<Conversations />
					</div>
				</div>
				<div className="col-12 col-sm-3 col-xl-2 chatOnline">
					<h3>Friends Online</h3>
				</div>
			</div>
		</div>
	);
}
