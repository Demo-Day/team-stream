import React from "react";

export default function Messages({ own }) {
	return (
		<div
			className={
				own === true
					? "messageContainer own align-self-end"
					: "messageContainer"
			}
		>
			<div className="messageTop">
				<p className="chatName">Person Name</p>
			</div>
			<div className={own === true ? "message own " : "message"}>
				<p className="chatMessage">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				</p>
			</div>
			<div className="messageBottom ">
				<p className="chatTime">Time & Date</p>
			</div>
		</div>
	);
}
