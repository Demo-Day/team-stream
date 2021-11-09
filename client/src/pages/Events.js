import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { QUERY_EVENTS, QUERY_USER, QUERY_ME } from "../utils/queries";
import EventContainer from "./Landing/EventContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
const Events = () => {
	// useEffect to run the query on the page load so data populates (useLazyQuery)

	const { loading, data } = useQuery(QUERY_EVENTS);
	const eventList = data?.events;
	const { username: userParam } = useParams();
	const { loading: loading1, data: data1 } = useQuery(
		userParam ? QUERY_USER : QUERY_ME,
		{
			variables: { username: userParam },
		}
	);
	const user = data1?.me || data1?.user || {};
	if (eventList?.length === 0) {
		return (
			<div className="">
				<h4>There are no events.</h4>
			</div>
		);
	}
	return (
		<main className="fadeIn p-3">
			<div className="eventTitleDiv d-flex flex-column align-items-center justify-content-center">
				<div>
					<h2 className="m-3 title">Events</h2>
				</div>

				{user.isPremium ? (
					<Link to="/new-event" className="m-1 btn btn-secondary">
						Create an Event
						<FontAwesomeIcon
							icon={faChevronRight}
							className=""
						></FontAwesomeIcon>
					</Link>
				) : (
					<div className="d-flex flex-column justify-content-center">
						<p className="m-3 text-center">
							Premium events are only available to premium
							members.
						</p>
						<Link to="/shop" className="m-1 btn btn-secondary">
							Go Premium
							<FontAwesomeIcon
								icon={faChevronRight}
								className=""
							></FontAwesomeIcon>
						</Link>
					</div>
				)}
			</div>

			<div>
				<EventContainer events={eventList} />
			</div>
		</main>
	);
};

export default Events;
