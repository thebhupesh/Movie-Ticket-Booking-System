import React, { Component } from 'react'

export default class Header extends Component {
    state = {
		data : []
    }
    
    componentDidMount(){
		if(localStorage.getItem('token')) {
            fetch('http://localhost:1337/api/profile', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => this.setState({data}));
        }
    }

    render() {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem('type')
        return (
            <nav id="header" className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/home"><h4>Movie Ticket Booking</h4></a>
                        </li>
                    </ul>
                    <ul className="navbar-nav d-flex">
                        {token ? <li className="nav-item dropdown">
                            {this.state.data.name ? <button className="nav-link dropdown-toggle bg-dark border-0 active" style={{textAlign: "right", minWidth: "160px"}} type="button" data-bs-toggle="dropdown"><b>{this.state.data.name.toUpperCase()} </b></button> : null}
                            <ul className="dropdown-menu" style={{right: "0", left: "auto"}}>
                                {type === "user" ? <li className="dropdown-item">
                                    <a className="dropdown-item" href="/bookings"><h6>Bookings</h6></a>
                                </li> : null}
                                <li className="dropdown-item">
                                    <a className="dropdown-item" href="/logout"><h6>Logout</h6></a>
                                </li>
                            </ul>
                        </li>
                        : <li className="nav-item">
                            <a className="nav-link active" href="/login"><h6><b>Login</b></h6></a>
                        </li>}
                    </ul>
                </div>
            </nav>
        )
    }
}