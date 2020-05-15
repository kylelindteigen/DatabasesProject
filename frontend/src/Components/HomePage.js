import React, { Component, useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { makeStyles } from '@material-ui/core/styles';
import TargetedRestaurant from "./TargetedRestaurant.js";
import RestaurantForm from "./RestaurantForm.js";
import SearchRestaurant from "./SearchRestaurant.js";
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Popup from "reactjs-popup";
import RestaurantsList from "./RestaurantsList.js"
import Map from "./Map.js"

import NavBar from './NavBar';
import "./RestaurantsList.css";

export default class HomePage extends Component {
	constructor(props){
		super(props)
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
			maxRating: 5,
			users:
			[ 
			]
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

	render(){
		let name = `Kyle Apple god`
		let handle = '@mcNasty'
		let tweet = 'balajhakdajkfjkasfjk'
		return(
			<div >
				<NavBar/>
				<div className="main-content-container container-fluid d-flex flex-column">
					<div className="row">
						<RestaurantsList
							restaurants={this.state.restaurants}
							restaurant={this.state.restaurant}
							restaurantsListView={this.state.restaurantsListView}
							closeRestaurantTargetView={this.closeRestaurantTargetView}
							handleClick={this.handleClick}
							handleSubmitForm={this.handleSubmitForm}
							handleSubmitFormComment={this.handleSubmitFormComment}
							newRestaurantPosition={this.state.newRestaurantPosition}
							ratingsState={this.ratingsState}
						/>
					</div>
				</div>
				
				</div>
		);
	}
}
