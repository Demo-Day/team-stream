import React from "react";
import { Link } from "react-router-dom";
const ConditionalLink = ({ children, to, condition }) =>
	!!condition && to ? (
		<Link className="btn btn-secondary" to={to}>
			<h5>{children[0]}</h5>
		</Link>
	) : (
		<h5 className="btn btn-secondary disabled">{children[1]}</h5>
	);

export default ConditionalLink;
