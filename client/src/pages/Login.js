import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import Brand from "../components/Brand";

const Login = (props) => {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await login({
				variables: { ...formState },
			});

			console.log(JSON.stringify(data, null, 2));

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			email: "",
			password: "",
		});
	};

	return (
		<div className="fadeIn  ">
			<div className="">
				<div className="d-flex flex-column align-items-center justify-content-center">
					<div className="col-12 col-md-6 col-lg-4">
						<div>
							{data ? (
								<p>
									Success! You may now head{" "}
									<Link to="/">back to the homepage.</Link>
								</p>
							) : (
								<div>
									<Brand />
									<h2 className="boxShadow">Login</h2>
									<div className="boxShadow">
										<form
											className=""
											onSubmit={handleFormSubmit}
										>
											<div className="form-group">
												<input
													autoFocus
													placeholder="Your email"
													name="email"
													type="email"
													value={formState.email}
													onChange={handleChange}
													className="form-control"
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
												className="btn btn-secondary mt-4"
												style={{ cursor: "pointer" }}
												type="submit"
											>
												Submit
											</button>
										</form>
										<div className="form-group">
											<p>
												Not yet a member?
												<Link
													className="formLink m-1"
													to="/signup"
												>
													Signup
												</Link>
											</p>
										</div>
									</div>
								</div>
							)}

							{error && (
								<div className="alert alert-danger m-3">
									{error.message}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
