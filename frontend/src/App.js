import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Logout from './pages/logout'
import Dashboard from './pages/dashboard'
import AddMovie from './pages/add-movie'
import AddTheatre from './pages/add-theatre'
import AddShow from './pages/add-shows'
import Details from './pages/details'

import NotFound from './pages/not-found'

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/addmovie" exact element={<AddMovie />} />
          <Route path="/addtheatre" exact element={<AddTheatre />} />
          <Route path="/addshow" exact element={<AddShow />} />
          <Route path="/details/:id" exact element={<Details />} />
          
          <Route path="/*" exact element={<NotFound />} />
        </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
