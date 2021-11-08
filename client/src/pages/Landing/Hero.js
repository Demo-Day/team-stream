import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
export default function Hero() {
	return (
		<div className=" d-flex align-items-center hero">
			<div className="m-4">
				<h1 className=" heroTitle">T.E.A.M. STREAM</h1>
				<h5 className=" m-3 text-light">
					Welcome to the future of streaming.
				</h5>
				<Link to="/shop" className="m-1 btn btn-primary">
					Become a premium member today
					<FontAwesomeIcon
						icon={faChevronRight}
						className=""
					></FontAwesomeIcon>
				</Link>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
