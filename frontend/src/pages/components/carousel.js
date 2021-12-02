import React, { Component } from 'react'

export default class Carousel extends Component {
    state = {
        data : []
    }

    componentDidMount(){
		fetch('http://localhost:1337/api/getposters').then(res => res.json())
        .then(data => this.setState({data}));
    }
    
    render() {
        return (
            <div id="carousel" className="carousel slide rounded-circle mt-5 mb-5" data-bs-ride="carousel" style={{width: "60%", margin: "auto"}}>
                <div className="carousel-inner" style={{height: "500px"}}>
                    {this.state.data ? this.state.data.map((img,i) => (i===0 ? <div className="carousel-item active" key={img._id}>
                        <img src={require(`../.././uploads/${img.poster}`).default} alt={img.poster} className="d-block" style={{height: "500px", width: "100%"}}/>
                    </div> :
                    <div className="carousel-item" key={img._id}>
                        <img src={require(`../.././uploads/${img.poster}`).default} alt={img.poster} className="d-block" style={{height: "500px", width: "100%"}}/>
                    </div>)) : 
                    <h3>loading</h3>}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
        )
    }
}