import { useState, useEffect } from 'react'
import './css/login.css'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token) {
			alert("You are already logged-in");
			window.location.href = '/dashboard';
		}
	},[])
	
	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})

		const data = await response.json()

		if (data.success) {
			localStorage.setItem('token', data.message)
			localStorage.setItem('type', data.user)
			window.location.href = '/dashboard'
		} else {
			alert(data.message);
		}
	}

	return (
		<div>
			<div className="sidenav">
				<div className="login-main-text">
					<h2><a className="home" href="/home">Movie Ticket Booking</a><br/> Login</h2>
					<p>Login or register from here to access.</p>
				</div>
			</div>
			<div className="main">
				<div className="form-main-text">
					<div className="login-form">
						<form onSubmit={loginUser}>
							<div className="form-group m-3">
								<label for="email">Email</label>
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type="email"
									placeholder="Enter email"
									className="form-control"
									id="email"
									required
								/>
							</div>
							<div className="form-group m-3">
								<label for="pwd">Password</label>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									placeholder="Enter password"
									className="form-control"
									id="pwd"
									required
								/>
							</div>
							<input type="submit" className="btn btn-dark m-3" value="Sign in" />
							<a className="btn btn-secondary m-3" href="/register">New user? Sign up</a>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login