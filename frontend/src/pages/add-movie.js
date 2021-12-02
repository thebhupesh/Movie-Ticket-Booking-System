import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/header'
import Footer from './components/footer'

function AddMovie() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    
    const [name, setName] = useState('')
	const [indate, setIndate] = useState(null)
    const [outdate, setOutdate] = useState('')
    const [genre, setGenre] = useState('')
    const [duration, setDuration] = useState('')
    const [imdb, setImdb] = useState('')
    const [dirname, setDirname] = useState('')
    const [poster, setPoster] = useState(null)
    const [trailer, setTrailer] = useState('')
    
    async function addMovie(event) {
        event.preventDefault()

        const formdata = new FormData()
        formdata.append("name",name)
        formdata.append("indate",indate)
        formdata.append("outdate",outdate)
        formdata.append("genre",genre)
        formdata.append("duration",duration)
        formdata.append("imdb",imdb)
        formdata.append("director",dirname)
        formdata.append("poster",poster)
        formdata.append("trailer",trailer)

        axios.post('http://localhost:1337/api/addmovie',formdata)
            .then((res) => {
                alert(res.data.message)
                window.location.href = '/addmovie';    
            })
            .catch(err => {
                console.log(err);
            });
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
                
                <div className="container m-5 p-4 shadow-lg mx-auto rounded-3">
                    <h1 className="mb-3 text-center">Add Movie</h1>
                    <form onSubmit={addMovie} encType='multipart/form-data'>
                        <div className="form-group m-3">
                            <label for="movie" className="form-label">Movie name:</label>
                            <input
                                id="movie"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter movie name"
                                required
                            />
                        </div>
                        <div className="form-group m-3">
                            <label for="indate" className="form-label">In-date:</label>
                            <input
                                id="indate"
                                className="form-control"
                                value={!indate ? '' : indate}
                                onChange={(e) => setIndate(e.target.value)}
                                type="date"
                                min={today}
                                required
                            />
                        </div>
                        <div className="form-group m-3">
                            <label for="outdate" className="form-label">Out-date:</label>
                            <input
                                id="outdate"
                                className="form-control"
                                value={outdate}
                                onChange={(e) => setOutdate(e.target.value)}
                                type="date"
                                min={!indate ? today : indate}
                                required
                            />
                        </div>
                        <div className="form-group m-3">
                            <label for="genre" className="form-label">Genre:</label>
                            <select id="genre" className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                                <option value="" disabled>Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Crime">Crime</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="form-group m-3">
                            <label for="duration" className="form-label">Duration:</label>
                            <input
                                id="duration"
                                className="form-control"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                type="number"
                                min="10"
                                placeholder="Enter duration"
                                required
                            />
                            <label className="form-label text-danger">* In minutes</label>
                        </div>
                        <div className="form-group m-3">
                            <label for="imdb" className="form-label">IMDB:</label>
                            <input
                                id="imdb"
                                className="form-control"
                                value={imdb}
                                onChange={(e) => setImdb(e.target.value)}
                                type="number"
                                step="0.01"
                                min="0.01"
                                max="10.00"
                                placeholder="Enter IMDB rating"
                                required
                            />
                        </div>
                        <div className="form-group m-3">
                            <label for="dir" className="form-label">Director:</label>
                            <input
                                id="dir"
                                className="form-control"
                                value={dirname}
                                onChange={(e) => setDirname(e.target.value)}
                                type="text"
                                placeholder="Enter director's name"
                                required
                            />
                        </div>
                        <div className="form-group m-3">
                            <label for="poster" className="form-label">Poster:</label>
                            <input
                                id="poster"
                                className="form-control"
                                onChange={(e) => setPoster(e.target.files[0])}
                                type="file"
                                accept=".jpg, .jpeg"
                                name="poster"
                                required
                            />
                        </div>
                        <div className="form-group m-3">
                            <label for="trailer" className="form-label">Trailer URL:</label>
                            <input
                                id="trailer"
                                className="form-control"
                                value={trailer}
                                onChange={(e) => setTrailer(e.target.value)}
                                type="text"
                                placeholder="Enter trailer URL"
                                required
                            />
                            <label className="form-label text-danger">* Youtube embed url</label>
                        </div>
                        <div className="clearfix m-3">
                            <button type="submit" className="btn btn-dark float-start">Add Movie</button>
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

export default AddMovie