import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
	const [formState, setFormState] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});
	const [addUser, { error, data }] = useMutation(ADD_USER);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await addUser({
				variables: { ...formState },
			});

			Auth.login(data.addUser.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className="">
			<div className="">
				<div className="">
					<h2 className="boxShadow">Sign Up</h2>
					<div>
						{data ? (
							<p>
								Success! You may now head{" "}
								<Link to="/">back to the homepage.</Link>
							</p>
						) : (
							<form
								className="boxShadow"
								onSubmit={handleFormSubmit}
							>
								<div className="form-group">
									<input
										autoFocus
										placeholder="Full Name"
										className="form-control"
										name="name"
										type="text"
										value={formState.name}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Username"
										name="username"
										type="text"
										value={formState.username}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Your email"
										name="email"
										type="email"
										value={formState.email}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="******"
										name="password"
										type="password"
										value={formState.password}
										onChange={handleChange}
									/>
								</div>
								<button
									className="btn btn-secondary"
									style={{ cursor: "pointer" }}
									type="submit"
								>
									Submit
								</button>
							</form>
						)}

						{error && (
							<div className="alert alert-danger">
								{error.message}
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Signup;
