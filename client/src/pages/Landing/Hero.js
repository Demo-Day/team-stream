import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
export default function Hero() {
	const { username: userParam } = useParams();
	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});
	const user = data?.me || data?.user || {};

	return (
		<div className=" d-flex align-items-center hero">
			<div className="m-4">
				<h1 className="heroTitle">T.E.A.M. STREAM</h1>
				<h5 className="m-3 text-light">
					Welcome to the future of streaming.
				</h5>
				{user.isPremium ? (
					<Link to="/new-event" className="m-1 btn btn-primary">
						Create an Event
						<FontAwesomeIcon
							icon={faChevronRight}
							className=""
						></FontAwesomeIcon>
					</Link>
				) : (
					<Link to="/shop" className="m-1 btn btn-primary">
						Become a premium member today
						<FontAwesomeIcon
							icon={faChevronRight}
							className=""
						></FontAwesomeIcon>
					</Link>
				)}
			</div>
		</div>
	);
}
