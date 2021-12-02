import React, { Component } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Carousel from './components/carousel'
import Showing from './components/showing';
import Upcoming from './components/upcoming';

export default class Dashboard extends Component {
    render() {
		const token = localStorage.getItem('token');
		const type = localStorage.getItem('type');
		if(!token) {
			window.location.href = '/login';
			return
		}
		else {
			return (
				<div>
					<Header />
					<Carousel />

					{type === "admin" ? <ul className="pagination justify-content-center">
						<li className="page-item"><a id="movie-tab" className="btn btn-dark mx-5" href="/addmovie">Add Movie</a></li>
						<li className="page-item"><a id="theatre-tab" className="btn btn-dark mx-5" href="/addtheatre">Add Theatre</a></li>
						<li className="page-item"><a id="show-tab" className="btn btn-dark mx-5" href="/addshow">Add Show</a></li>
				  	</ul> : null}

					<Showing />
					<Upcoming />
					<Footer />
				</div>
			)
		}
    }
}