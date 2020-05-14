import React, { Component, useState, useEffect } from "react";
import Restaurant from "./Restaurant.js";
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
import { useHistory } from 'react-router-dom';

import NavBar from './NavBar';
import "./RestaurantsList.css";

const useStyles = makeStyles(theme => ({
	// cardtitle: {
	// 	color: var(--textColor);
	// },
	//
	// card: {
	// 	backgroundcolor: var(--restaurantBackColor);
	// },
	//
	// restaurantslistcontainer: {
	// 	height: '100vh',
	// 	overflow: 'scroll',
	// 	backgroundcolor: var(--restaurantContainerBackColor);
	// },
	//
	// .bg-primary {
	// 	background-color: var(--headerBackColor) !important;
	// }
	//
	// .card-form {
	// 	background-color: var(--headerBackColor);
	// 	box-shadow: none;
	// }
	//
	// .card-form:hover {
	// 	background-color: var(--headerBackColor);
	// 	box-shadow: none;
	// }
	//
	// .btn-form {
	// 	background-color: #ffb400;
	// }
	//
	// .fa-sort-amount-down {
	// 	color: var(--icon);
	// }
	//
	// .fa-sort-amount-up {
	// 	color: var(--icon);
	// }
	//
	// .fa-star {
	// 	color: var(--icon);
	// }
	//
	// .fa-utensils {
	// 	color: var(--icon);
	// }
	//
	// .hidden {
	// 	display: none;
	// }
	//
	// @media only screen and (max-width: 991px) {
	// 	.restaurants-list-container {
	// 		height: 50vh;
	// 	}
	// }
}));

export default function RestaurantPage(props) {
	// const createData = (id, name, username, email, address, error_count) => {
	// 	return { id, name, transcript_preview, date_created, date_last_modified, error_count };
	// }
    const history = useHistory();
	const minRating = 1;
	const maxRating = 5;
	var name  = "fasdf"
	var search = [];

	var posts = [];

	var follows = [];

	var followed = [];

	var reviews = [];

	var menu = [];

	const classes = useStyles();

	const [searchCards, setSearch] = useState(search);

	const [postCards, setPosts] = useState(posts);

	const [followsCards, setFollows] = useState(follows);

	const [followedCards, setFollowed] = useState(followed);

	const [reviewsCards, setReviews] = useState(reviews);

	const [menuCards, setMenu] = useState(menu);

	const [reload, setReload] = useState(false);

	const [nameUser, setName] = useState(name);

	const follow = () => {
		fetch('http://localhost:8000/api/follow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({follower: localStorage.getItem("userid"), follow: props.match.params.UserID}),
		})
			.then(response => response.json())
			.then((data) => {

			})
			.catch(error => { setReload(true); console.log("fetch error", error)});
	}

	// const sortSpeeches = (sortTerm) => {
	// 	let sortedSpeeches = [];
	// 	if (sortTerm === 'name') {
	// 		sortedSpeeches = speechCards.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
	// 	} else if (sortTerm === 'created') {
	// 		sortedSpeeches = speechCards.slice().sort((a, b) => (a.date_created > b.date_created) ? -1 : ((b.date_created > a.date_created) ? 1 : 0));
	// 	} else if (sortTerm === 'updated') {
	// 		sortedSpeeches = speechCards.slice().sort((a, b) => (a.date_last_modified > b.date_last_modified) ? 1 : ((b.date_last_modified > a.date_last_modified) ? -1 : 0));
	// 	}
	// 	return setSpeechCards(sortedSpeeches);
	// }

	useEffect(() => {
		fetch('http://localhost:8000/api/loadRestPage', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({userid: props.match.params.UserID}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
			posts = r.userposts
			setPosts(posts)
			follows = r.follows
			setFollows(follows)
			followed = r.followed
			setFollowed(followed)
			reviews = r.reviews
			setReviews(reviews)
			name = r.userinfo[0].Name
			setName(name)
			menu = r.menu
			setMenu(menu)
		})
		.catch(error => console.log("fetch error", error));
	}, [reload])

	var setname = ()=>{
		return(name)
	}

	return(
		<div >
			<NavBar/>
			<div>
				<div className="card text-white bg-primary mb-3">
					<div className="card-header">
						<div className="hero-container">
							<div className="d-flex flex-column align-items-center justify-content-center">
								<textarea className="logo d-flex justify-content-center" value={nameUser}></textarea>
							</div>


						</div>
					</div>

					<div className="card-body" id="posts">
						<Grid container spacing={0}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{postCards.map((post, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid key={post.PostID} item sm={3} xs={"auto"} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/PostPage/${post.PostID}`,
										state: { PostID: post.PostID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{post.Name}</b>
														<p>{post.Post}</p>
														<p>{post.TimeStamp}</p>
													</CardContent>
												</ButtonBase>
											</CardActions>
										</Card>
									</Link>
								</Grid>
								</Grow>
							))}
						</Grid>
						<Grid container spacing={0}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{followsCards.map((follows, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid key={follows.UserID} item sm={3} xs={"auto"} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/UserPage/${follows.UserID}`,
										state: { UserID: follows.UserID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{follows.Name}</b>
													</CardContent>
												</ButtonBase>
											</CardActions>
										</Card>
									</Link>
								</Grid>
								</Grow>
							))}
						</Grid>
						<Grid container spacing={0}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{followedCards.map((followed, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid key={follows.UserID} item sm={3} xs={"auto"} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/UserPage/${followed.UserID}`,
										state: { UserID: followed.UserID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{followed.Name}</b>
													</CardContent>
												</ButtonBase>
											</CardActions>
										</Card>
									</Link>
								</Grid>
								</Grow>
							))}
						</Grid>
						<Grid container spacing={0}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{reviewsCards.map((reviews, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid key={reviews.UserID} item sm={3} xs={"auto"} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/UserPage/${reviews.UserID}`,
										state: { UserID: reviews.UserID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{reviews.RName}</b>
														<p>{reviews.Description}</p>
													</CardContent>
												</ButtonBase>
											</CardActions>
										</Card>
									</Link>
								</Grid>
								</Grow>
							))}
						</Grid>
						<Grid container spacing={0}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{menuCards.map((menu, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid key={menu.ItemID} item sm={3} xs={"auto"} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/UserPage/${menu.ItemID}`,
										state: { ItemID: menu.ItemID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{menu.Name}</b>
													</CardContent>
												</ButtonBase>
											</CardActions>
										</Card>
									</Link>
								</Grid>
								</Grow>
							))}
						</Grid>
					</div>
				</div>
			</div>

			<div>

			</div>
		</div>
	)
}
//
// export default class HomePage extends Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			minRating: 1,
// 			maxRating: 5
// 		};
// 		this.onStarClick = this.onStarClick.bind(this);
// 	}
//
// 	onStarClick(nextValue, prevValue, name) {
// 		if (name === "minRating") {
// 			this.setState({ minRating: nextValue });
// 		} else if (name === "maxRating") {
// 			this.setState({ maxRating: nextValue });
// 		}
// 		this.props.ratingsState(name, nextValue);
// 		/* this.props.ratingsState(this.state); */
// 	}
//
// 	render() {
// 		const { minRating, maxRating } = this.state;
// 		return (
// 			<div className="restaurants-list-container col-12 col-lg-4 p-2 order-2 order-lg-1">
// 				<div className={this.props.restaurantsListView ? "" : "hidden"}>
// 					<div className="card text-white bg-primary mb-3">
// 						<div className="card-header">
// 							<div className="hero-container">
// 								<div className="d-flex flex-column align-items-center justify-content-center">
// 									<h1 className="logo d-flex justify-content-center">iEat</h1>
// 									<a
// 										href=""
// 										target="_blank"
// 										rel="noopener noreferrer"
// 									>
// 										<small>
// 											<i>by Kyle Austin Devin</i>
// 										</small>
// 										{/* <i className="fas fa-utensils"></i> */}
// 									</a>
// 								</div>
//
// 								<RestaurantForm
// 									handleSubmitForm={this.props.handleSubmitForm}
// 									newRestaurantPosition={this.props.newRestaurantPosition}
// 								/>
// 							</div>
// 						</div>
// 						<div className="card-body">
// 							<h5 className="card-title text-center">
// 								Filter by <i className="far fa-star"></i>
// 							</h5>
// 							<div className="rate-filter d-flex justify-content-around">
// 								<div className="search-area d-flex flex-column justify-content-center align-items-center">
// 									<h4>
// 										<i className="fas fa-sort-amount-down"></i>
// 									</h4>
// 									<div>
// 										<StarRatingComponent
// 											name="minRating"
// 											starCount={5}
// 											value={minRating}
// 											onStarClick={this.onStarClick}
// 										/>
// 									</div>
// 								</div>
// 								<div className="search-area search-area d-flex flex-column justify-content-center align-items-center">
// 									<h4>
// 										<i className="fas fa-sort-amount-up"></i>
// 									</h4>
// 									<div>
// 										<StarRatingComponent
// 											name="maxRating"
// 											starCount={5}
// 											value={maxRating}
// 											onStarClick={this.onStarClick}
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="card-footer bg-transparent ">
// 						<div>
// 							<p className="d-flex justify-content-end">
// 								<i
// 									onClick={() => this.handleBtnIcon()}
// 									className={
// 										this.state.isClicked
// 											? "fas fa-search-minus"
// 											: "fas fa-search-plus"
// 									}
// 									title="search restaurant"
// 									data-toggle="collapse"
// 									href="#collapseSearch"
// 									role="button"
// 									aria-expanded="false"
// 									aria-controls="collapseForm"
// 								></i>
// 							</p>
//
// 							<div className="row mb-2 collapse" id="collapseSearch">
// 								<div className="col">
// 									<input
// 										type="text"
// 										className="form-control"
// 										id="search"
// 										placeholder="Search a restaurant.."
// 									/>
// 									<div className="d-flex justify-content-center">
// 										<button
// 											id="search-btn"
// 											className="btn-primary rounded"
// 											type="submit"
// 										>
// 											search
// 										</button>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 						</div>
// 					</div>
//
// 					{this.props.restaurants
// 						.filter(
// 							restaurant =>
// 								restaurant.averageRating >= this.state.minRating &&
// 								restaurant.averageRating <= this.state.maxRating
// 						)
// 						.map(restaurant => (
// 							<Restaurant
// 								key={restaurant.id}
// 								restaurant={restaurant}
// 								handleClick={this.props.handleClick}
// 							/>
// 						))}
// 				</div>
//
// 				<div className={this.props.restaurantsListView ? "hidden" : ""}>
// 					<TargetedRestaurant
// 						key={this.props.restaurant.name}
// 						restaurant={this.props.restaurant}
// 						handleClick={this.props.handleClick}
// 						restaurantsListView={this.props.restaurantsListView}
// 						closeRestaurantTargetView={this.props.closeRestaurantTargetView}
// 						handleSubmitFormComment={this.props.handleSubmitFormComment}
// 						handleSubmitForm={this.props.handleSubmitForm}
// 					/>
// 				</div>
// 			</div>
// 		);
// 	}
// }