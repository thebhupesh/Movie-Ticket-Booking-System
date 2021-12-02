import React, { Component } from 'react'

export default class Showing extends Component {
    today = new Date()

	state = {
        movies : []
    }

    componentDidMount(){
		fetch('http://localhost:1337/api/getposters').then(res => res.json())
        .then(movies => this.setState({movies}));
    }
    
    render() {
        const token = localStorage.getItem('token')
        return (
            <div id="showing" className="container mt-5">
                <div className="card bg-dark text-white" style={{textAlign: "center"}}>
                    <h5 className="card-body">Now Showing</h5>
                </div>
                <div className="row">
                    {this.state.movies ? this.state.movies.map((movie) => (this.today>=new Date(movie.indate+" 00:00:00") && this.today<=new Date(movie.outdate+" 00:00:00") ?
                    (<div className="col-sm-4">
                        <div className="shadow-lg border border-0 card mt-4">
                            <img className="card-img-top" src={require(`../.././uploads/${movie.poster}`).default} alt={movie.poster} style={{width: "100%", height: "230px"}}/>
                            <div className="card-body">
                                <h4 className="card-title mb-4">{movie.name.toUpperCase()}</h4>
                                {token ? <a href={"/details/"+movie._id} className="btn btn-dark">Details</a>
                                : <a href="/login" className="btn btn-dark">Details</a>}
                            </div>
                        </div>
                    </div>) : null)) : null}
                </div>
            </div>
        )
    }
}