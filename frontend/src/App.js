import React, { Component } from "react";
import HomePage from "./Components/HomePage";
import UserPage from "./Components/UserPage";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SignUpRestaurant from "./Components/SignUpRestaurant";
import RestaurantPage from "./Components/RestaurantPage"
import Post from "./Components/Post"
import Search from "./Components/Search"
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<Switch>
			<div className="main-content-container container-fluid d-flex flex-column">
				<div >
					<CssBaseline/>
					<Switch>
					<Route exact path='/' component={Login}/>
					<Route exact path='/SignUp' component={SignUp}/>
					<Route exact path='/SignUpRestaurant' component={SignUpRestaurant}/>
					<Route exact path='/HomePage' component={HomePage}/>
					<Route exact path='/UserPage/:UserID' component={UserPage}/>
					<Route exact path='/RestaurantPage/:UserID' component={RestaurantPage}/>
					<Route exact path='/Post/:PostID' component={Post}/>
					<Route exact path='/Search/:SearchTerm' component={Search}/>
					</Switch>
				</div>
			</div>
			</Switch>
		);
	}
}

export default App;
