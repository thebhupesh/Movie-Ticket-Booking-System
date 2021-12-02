import React, { Component } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Carousel from './components/carousel'
import Showing from './components/showing';
import Upcoming from './components/upcoming';

export default class Home extends Component {
    render() {
		const token = localStorage.getItem('token');
		if(token) {
			window.location.href = '/dashboard';
			return null
		}
		else{
			return (
				<div>
					<Header />
					<Carousel />
					<Showing />
					<Upcoming />
					<Footer />
				</div>
			)
		}
    }
}