import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { login } from './simpleAuth';
import './Auth.css'

export default function Login() {
	const [ user, setUser ] = useState();
	const history = useHistory();
	const location = useLocation()
	const articleId = location?.state?.articleId || null
	const feedId = location?.state?.feedId || null
	const path = location?.state?.path || null
	const pathname = path ? path : feedId ? `/feed/source/${feedId}` : "/";
	
	const handleInputChange = (evt) => {
		setUser({
			...user,
			[evt.target.id]: evt.target.value
		});
	};

	const handleLogin = (evt) => {
		evt.preventDefault();

		// create object based on state
		const credentials = {
			username: user.userName,
			password: user.password
		};

		// Make fetch call with the object as the body of the POST request
		login(credentials).then((response) => {
			if (response === true) {
				history.push({ pathname, state: { articleId, feedId }});
			} else window.alert('Username/password combination do not exist');
		});
	};

	return (
		<main style={{ textAlign: 'center' }}>
			<form className="form--login" onSubmit={handleLogin}>
				<h1 className="h3 mb-3 font-weight-normal">Welcome Back!</h1>
				{/* <h1 className="h3 mb-3 font-weight-normal">Login</h1> */}
				<fieldset>
					<label htmlFor="userName"> Username </label>
					<input
						onChange={(evt) => handleInputChange(evt)}
						id="userName"
						type="text"
						name="userName"
						className="form-control"
						placeholder="Username"
						required
						autoFocus
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="inputPassword"> Password </label>
					<input
						onChange={handleInputChange}
						id="password"
						type="password"
						name="password"
						className="form-control"
						placeholder="Password"
						required
					/>
				</fieldset>
				<fieldset>
					<button 
						className="button--auth button--action"
						type="submit"
					>
						Login
					</button>
				</fieldset>
			</form>
			<br/>
			<p>First time here? Join us!</p>
			<button className="button--auth">
				<Link 
					style={{ color: 'black' }}
					to={{
						pathname:'/register',
						state: { path, articleId, feedId }
					}}
				>
					Register
				</Link>
			</button>
		</main>
	);
}
