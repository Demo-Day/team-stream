import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_EVENT } from "../utils/queries";

import ReactPlayer from "react-player";
// import Chat from "./Chat";
import Chat from "./Chat/index";
import { Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import LikeButton from "./LikeButton";
import PremiumBadge from "./PremiumBadge";
import { Table } from "semantic-ui-react";

export default function Event() {
	const { eventId } = useParams();
	const { data } = useQuery(QUERY_SINGLE_EVENT, {
		variables: { eventId: eventId },
	});
	const event = data?.event || {};

	return (
		<div className="boxShadow">
			<div className="row">
				<div className="col-12 col-lg-8">
					{/* <PremiumBadge
						className="badge"
						isPremiumContent={event.isPremiumContent}
					/> */}
					<h2 className="text-center">{event.eventTitle}</h2>
					<h5 className="text-center">{event.eventDate}</h5>
					<p className="text-center">{event.eventDescription}</p>
					<div className="align-center">
						<Table className="ui single line unstackable table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="left aligned">
										Category
									</Table.HeaderCell>
									<Table.HeaderCell className="right aligned">
										Air Date
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell className="left aligned">
										{event.category}
									</Table.Cell>
									<Table.Cell className="right aligned">
										{event.eventDate}
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</div>
					<div className="player-wrapper">
						<ReactPlayer
							className="react-player"
							url={event.eventLink}
							playing={true}
							controls={true}
							width={"100%"}
							height={"100%"}
						/>
					</div>
					<LikeButton
						key={event._id}
						eventId={event._id}
						likes={event.likes?.length}
					/>
					<CommentForm eventId={event._id} />
					<CommentList comments={event.comments} />
				</div>
				<div className="col-12 col-lg-4">
					<Chat event={event} />
				</div>
			</div>
		</div>
	);
}
