import React from "react";
import Messages from "./Messages";

export default function Conversations() {
	return (
		<div className="d-flex flex-column">
			<Messages />
			<Messages own={true} />
			<Messages />
		</div>
	);
}
