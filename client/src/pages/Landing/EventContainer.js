import React from "react";
import { Link } from "react-router-dom";
import PremiumBadge from "../../components/PremiumBadge";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_EVENTS, QUERY_USER, QUERY_ME } from "../../utils/queries";

import EventCard from "./EventCard";

const EventContainer = ({ events }) => {
	const { loading: loading1, data: data1 } = useQuery(QUERY_EVENTS);
	const eventList = data1?.events;

	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};

	if (eventList?.length === 0) {
		return (
			<div className="">
				<div className="d-flex justify-content-center">
					<h4 className="text-center">There are no events.</h4>
				</div>
			</div>
		);
	}
	return (
		<div className="">
			<EventCard events={eventList} user={user} />
		</div>
	);
};

export default EventContainer;
