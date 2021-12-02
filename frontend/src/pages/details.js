import React,{ useEffect,useState,useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'

function Details() {
    const { id } = useParams()
    const [movie, setMovie] = useState('')
    const [token] = useState(localStorage.getItem('token'))
    const [type] = useState(localStorage.getItem('type'))
    const today = useMemo(() => new Date(), [])
    
    useEffect(() => {
        async function getMovie() {
            const res = await fetch('http://localhost:1337/api/getmovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
    
            const mov = await res.json()
    
            setMovie(mov)

            if(mov.message || (new Date(mov.outdate+" 00:00:00"))<today)
                window.location.href = '/404';
        }
        if(token) {
            getMovie()
		}
        else {
            window.location.href = '/404';
        }
    }, [id,today,token])

	if(token) {
        return (
            <div>
                <Header />

                <div style={{position: "absolute", top: "50%", marginTop: "-260px", left: "0", width: "100%"}}>
                    <div className="shadow p-4 m-5 bg-white row rounded-3">
                        <div className="col-6">
                            <iframe
                                width="100%"
                                height="350"
                                src={movie.trailer}
                                title={movie.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        {movie ? <div className="col-6 p-1 shadow rounded">
                            <h1 className="m-3" style={{textAlign: "center"}}>{movie.name.toUpperCase()}</h1>
                            <div className="col-12 px-5" style={{textAlign: "center"}}>
                                <h5 className="mb-3">Director: <i>{movie.director.toUpperCase()}</i></h5>
                                <h5 className="mb-3">Genre: <i>{movie.genre.toUpperCase()}</i></h5>
                                <h5 className="mb-3">IMDB: <i>{movie.imdb}/10</i></h5>
                                <h5 className="mb-3">Duration: <i>{Math.floor(movie.duration/60)}h {movie.duration%60}m</i></h5>
                                <h5 className="mb-3">Release: <i>{(new Date(movie.indate)).toDateString()}</i></h5>
                                {type === "user" && (today>=(new Date(movie.indate+" 00:00:00")) && today<=(new Date(movie.outdate+" 00:00:00"))) ?
                                <div className="col-12 mt-4" style={{textAlign: "center"}}>
                                    <a href={"/shows/"+id} className="btn btn-dark"><b>Book</b></a>
                                </div> : null}
                            </div>
                        </div> : null}
                    </div>
                </div>

                <div style={{position: "absolute", bottom: "0", width: "100%"}}><Footer /></div>
            </div>
        )
    }
    else
        return <div></div>;
}

export default Details