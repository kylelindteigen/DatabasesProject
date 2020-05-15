import React, { Component } from "react";
import HomePage from "./Components/HomePage";
import UserPage from "./Components/UserPage";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SignUpRestaurant from "./Components/SignUpRestaurant";
import RestaurantList from "./Components/RestaurantsList";
import RestaurantPage from "./Components/RestaurantPage"
import Post from "./Components/Post"
import Search from "./Components/Search"
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from "./Components/Map";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			restaurant: {},
			restaurantsListView: true,
			newRestaurantPosition: {
				LatLngOnClick: null,
				address: null,
				postalCode: null
			},

			minRating: 0,
			maxRating: 5
		};
	}

	handleSubmitForm = newRestaurant => {
		this.setState(prevState => {
			return {
				restaurants: prevState.restaurants.concat(newRestaurant)
			};
		});
	};

	handleClick = restaurant => {
		this.setState({
			restaurant: restaurant,
			restaurantsListView: false
		});
	};

	handleSubmitFormComment = (restaurant, newComment, rating) => {
		let updatedComment = restaurant.reviews.concat({
			author_name: newComment.author,
			rating: newComment.stars,
			text: newComment.comment
		});
		restaurant.reviews = updatedComment;
		restaurant.user_ratings_total++;
		restaurant.newAverageRating = restaurant.getAverageRating();
		this.setState({ restaurant });
	};

	getLatLng = (lat, lng, formatted_address) => {
		let LatLngOnClick = {
			lat,
			lng
		};
		let splitAdress = formatted_address.split(",");
		let address = splitAdress[0];
		let postalCode = splitAdress[1] + splitAdress[2];
		this.setState({
			newRestaurantPosition: { LatLngOnClick, address, postalCode }
		});
	};

	closeRestaurantTargetView = () => {
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}
		this.setState({
			restaurantsListView: true,
			newRestaurantPosition: {
				LatLngOnClick: null,
				address: null,
				postalCode: null
			}
		});
	};

	apiLoadedCallback = restaurants => {
		this.setState({ restaurants });
	};

	ratingsState = (name, nextValue) => {
		this.setState({
			[name]: nextValue
		});
	};

	render() {
		return (
			<Router>
			<div className="main-content-container container-fluid d-flex flex-column">
				<div >
					<CssBaseline/>
					<Route exact path='/' component={HomePage}/>
					<Route exact path='/SignUp' component={SignUp}/>
					<Route exact path='/SignUpRestaurant' component={SignUpRestaurant}/>
					<Route exact path='/HomePage' component={HomePage}/>
					<Route exact path='/UserPage/:UserID' component={UserPage}/>
					<Route exact path='/RestaurantPage/:UserID' component={RestaurantPage}/>
					<Route exact path='/Post/:PostID' component={Post}/>
					<Route exact path='/Search/:SearchTerm' component={Search}/>
				</div>
			</div>
			</Router>
		);
	}
}

export default App;
