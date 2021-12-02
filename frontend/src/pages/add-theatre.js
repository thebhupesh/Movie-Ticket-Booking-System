import { useState,useEffect } from 'react'
import Header from './components/header'
import Footer from './components/footer'

function AddTheatre() {
	const [name, setName] = useState('')
	const [seats, setSeats] = useState('')

	async function addTheatre(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/addtheatre', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				seats
			})
		})

		const data = await response.json()

		alert(data.message);
		
		window.location.href = '/addtheatre';
	}

	useEffect(() => {
        const token = localStorage.getItem('token');
		if(token) {
			const user = localStorage.getItem('type')
            if(user !== "admin")
			    window.location.href = '/404';
		}
        else {
            window.location.href = '/404';
        }
    }, [])

	if(localStorage.getItem('token') && localStorage.getItem('type') === "admin") {
		return (
			<div>
				<Header />
				
				<div style={{position: "absolute", top: "50%", marginTop: "-230px", left: "0", width: "100%"}}>
					<div className="container m-5 p-4 shadow-lg mx-auto rounded-3">
						<h1 className="mb-3 text-center">Add Theatre</h1>
						<form onSubmit={addTheatre}>
							<div className="form-group m-3">
								<label for="theatre" className="form-label">Theatre name:</label>
								<input
									id="theatre"
									className="form-control"
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									placeholder="Enter theatre name"
									required
								/>
							</div>
							<div className="form-group m-3">
								<label for="seats" className="form-label">Seats count:</label>
								<input
									id="seats"
									className="form-control"
									value={seats}
									onChange={(e) => setSeats(e.target.value)}
									type="number"
									placeholder="Enter number of seats"
									min="15"
									required
								/>
							</div>
							<div className="clearfix m-3 mt-4">
								<button type="submit" className="btn btn-dark float-start">Add Theatre</button>
								<a href="/dashboard" className="btn btn-danger float-end">Exit</a>
							</div>
						</form>
					</div>
				</div>

				<div style={{position: "absolute", bottom: "0", width: "100%"}}><Footer /></div>
			</div>
		)
	}
	else {
		return null
	}
}

export default AddTheatre