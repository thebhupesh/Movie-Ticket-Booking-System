import { useState,useEffect } from 'react'

function Register() {
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token) {
			alert("Logout to register new user");
			window.location.href = '/dashboard';
		}
	},[])
	
	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				password,
                password2
			})
		})

		const data = await response.json()

		if (data.success) {
			alert(data.message);
			window.location.href = '/login';
		}
        else {
            alert(data.message);
        }
	}

	return (
		<div>
			<div className="sidenav">
				<div className="login-main-text">
					<h2><a className="home" href="/home">Movie Ticket Booking</a><br/> Register</h2>
					<p>Login or register from here to access.</p>
				</div>
			</div>

			<div className="main">
				<div className="form-main-text">
					<div className="login-form">
						<form onSubmit={registerUser}>
							<div className="form-group m-3">
								<label for="name">Name</label>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									placeholder="Enter full name"
									className="form-control"
									id="name"
									required
								/>
							</div>
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
							<div className="form-group m-3">
								<label for="pwd2">Re-enter Password</label>
								<input
									value={password2}
									onChange={(e) => setPassword2(e.target.value)}
									type="password"
									placeholder="Enter password"
									className="form-control"
									id="pwd2"
									required
								/>
							</div>
							<input type="submit" className="btn btn-dark m-3" value="Confirm"/>
							<a className="btn btn-secondary m-3" href="/login">Already a user? Sign in</a>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register