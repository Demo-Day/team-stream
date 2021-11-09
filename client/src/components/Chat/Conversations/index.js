import React from "react";
import { useQuery } from "@apollo/client";
import Messages from "./Messages";
import { useParams } from "react-router";
import Auth from "../../../utils/auth";
import {
	QUERY_ME,
	QUERY_USER,
	QUERY_SINGLE_CONVERSATION,
} from "../../../utils/queries";
export default function Conversations({ conversation }) {
	console.log(conversation?._id);
	const { username: userParam } = useParams();
	const { loading: loading1, data: data1 } = useQuery(
		userParam ? QUERY_USER : QUERY_ME,
		{
			variables: { username: userParam },
		}
	);
	const user = data1?.me || data1?.user || {};

	const { data } = useQuery(QUERY_SINGLE_CONVERSATION, {
		variables: { conversationId: conversation?._id },
	});
	const convo = data?.convo || {};
	console.log(user);
	return (
		<div className="d-flex flex-column">
			<Messages />
			<Messages own={true} />
			<Messages />
		</div>
	);
}
