import { useState,useEffect } from 'react'
import Header from './components/header'
import Footer from './components/footer'

function AddShow() {
	const [movie, setMovie] = useState('')
	const [theatre, setTheatre] = useState('')
	const [time, setTime] = useState('')
	const [date, setDate] = useState('')
	const [price, setPrice] = useState('')
	
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

	let din = today
	let dout = today

	const [movies, setMovies] = useState('')
	const [theatres, setTheatres] = useState('')
	const [timings, setTimings] = useState('')
	
	async function addShow(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/addshow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				movie,
				theatre,
				time,
				date,
				price
			})
		})

		const data = await response.json()

		alert(data.message);

		window.location.href = '/addshow';
	}

	useEffect(() => {
		async function get() {
			var res = await fetch('http://localhost:1337/api/getformdata')
			const data = await res.json()
			setMovies(data.movie)
			setTheatres(data.theatre)
			setTimings(data.timing)
		}
		const token = localStorage.getItem('token');
		if(token) {
			const user = localStorage.getItem('type')
			if(user !== "admin")
				window.location.href = '/404';
			else
				get()
		}
		else {
			window.location.href = '/404';
		}
	}, [])

	if(movie) {
		movies.forEach(mov => {
			if(mov._id === movie) {
				document.getElementById("date").disabled = false
				din = mov.indate
				dout = mov.outdate
				if(din<today)
					din = today
			}
		});
	}
	
	if(localStorage.getItem('token') && localStorage.getItem('type') === "admin") {
		return (
			<div>
				<Header />

				<div className="container m-5 p-4 shadow-lg mx-auto rounded-3">
					<h1 className="mb-3 text-center">Add Show</h1>
					<form onSubmit={addShow}>
						<div className="form-group m-3">
							<label for="movie" className="form-label">Movie:</label>
							<select id="movie" className="form-select" value={movie} onChange={(e) => setMovie(e.target.value)} required>
								<option value="" disabled>Select movie</option>
								{movies ? movies.map((mov) => (new Date(mov.outdate+" 00:00:00") >= new Date(today+" 00:00:00") ? (<option value={mov._id}>{mov.name.toUpperCase()}</option>) : null)) : null}        
							</select>
						</div>
						<div className="form-group m-3">
							<label for="date" className="form-label">Date:</label>
							<input
								id="date"
								className="form-control"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								type="date"
								min={din}
								max={dout}
								required
								disabled
							/>
						</div>
						<div className="form-group m-3">
							<label for="time" className="form-label">Time:</label>
							<select id="time" className="form-select" value={time} onChange={(e) => setTime(e.target.value)} required>
								<option value="" disabled>Select time</option>
								{timings ? timings.map((tmng) => (<option value={tmng._id}>{tmng.slot}</option>)) : null}        
							</select>
						</div>
						<div className="form-group m-3">
							<label for="theatre" className="form-label">Theatre:</label>
							<select id="theatre" className="form-select" value={theatre} onChange={(e) => setTheatre(e.target.value)} required>
								<option value="" disabled>Select theatre</option>
								{theatres ? theatres.map((thetr) => (<option value={thetr._id}>{thetr.name.toUpperCase()}</option>)) : null}        
							</select>
						</div>
						<div className="form-group m-3">
							<label for="price" className="form-label">Price:</label>
							<input
								id="price"
								className="form-control"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								type="number"
								min="100"
								step="50"
								placeholder="Price"
								required
							/>
						</div>
						<div className="clearfix m-3 mt-4">
							<button type="submit" className="btn btn-dark float-start">Add Show</button>
							<a href="/dashboard" className="btn btn-danger float-end">Exit</a>
						</div>
					</form>
				</div>

				<Footer />
			</div>
		)
	}
	else {
		return null
	}
}

export default AddShow