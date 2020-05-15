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
import Popup from "reactjs-popup";

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
	const sendReview = ()=>{
		console.log("hello")
		fetch('/api/saveReview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({userid: localStorage.getItem("userid"), restid: props.match.params.UserID, description: description}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
		})
		.catch(error => console.log("fetch error", error));
	}
	var description = ""
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

	const setDescription = (event) => {
		description = event.target.value
	}

	const [reload, setReload] = useState(false);

	const [nameUser, setName] = useState(name);

	const follow = () => {
		fetch('/api/follow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({follower: localStorage.getItem("userid"), follow: props.match.params.UserID}),
		})
			.then(response => response.json())
			.then((data) => {
				reload();
			})
			.catch(error => { setReload(true); console.log("fetch error", error)});
	}


	useEffect(() => {
		fetch('/api/loadRestPage', {
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
			<div className="grid">
			<h>Reviews</h>
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
					<Grid key={reviews.UserID} xs={12} zeroMinWidth>
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
			</div>
			<div className="div">
				<div className="card">
					<div className="card-header">
						<div className="hero-container">
							<div className="d-flex flex-column align-items-center justify-content-center">
								<textarea className="logo d-flex justify-content-center" value={nameUser}></textarea>
							</div>
							<button onClick={follow}>Follow</button>
							<Popup modal="true" trigger = {<button>Review</button>}>
								{close => (
							      <div alignItems="center">
								  <div alignItems="center">
								  <textarea rows="5" cols="100" onKeyUp={setDescription}></textarea>
								  </div>
  									<button onClick={sendReview}>Submit</button>
    								<button onClick={close}>Close</button>
							      </div>
							    )}
							</Popup>


						</div>
					</div>

					<div className="card-body" id="posts">
					<h>Posts</h>
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

					</div>
				</div>
			</div>

			<div className="grid">
			<h>Menu Items</h>
			<Grid container spacing={0}
				direction="column"
				justify="flex-start"
				alignItems="baseline">
				{menuCards.map((menu, index) => (
					 <Grow
					 in={true}
					 style={{ transformOrigin: '0 0 0' }}
					 timeout={index*500 }
				   >
					<Grid key={menu.ItemID} xs={12} zeroMinWidth>
							<Card>
								<CardActions>
									<ButtonBase>
										<CardContent>
											<b>{menu.Name}</b>
										</CardContent>
									</ButtonBase>
								</CardActions>
							</Card>
					</Grid>
					</Grow>
				))}
			</Grid>
			</div>
			</div>
		</div>
	)
}
//
// <Grid container spacing={0}
// 	direction="row"
// 	justify="flex-start"
// 	alignItems="baseline">
// 	{followsCards.map((follows, index) => (
// 		 <Grow
// 		 in={true}
// 		 style={{ transformOrigin: '0 0 0' }}
// 		 timeout={index*500 }
// 	   >
// 		<Grid key={follows.UserID} item sm={3} xs={"auto"} zeroMinWidth>
// 			<Link style={{ textDecoration: 'none' }} to={{
// 				pathname: `/UserPage/${follows.UserID}`,
// 				state: { UserID: follows.UserID, show: false }
// 			}}>
// 				<Card>
// 					<CardActions>
// 						<ButtonBase>
// 							<CardContent>
// 								<b>{follows.Name}</b>
// 							</CardContent>
// 						</ButtonBase>
// 					</CardActions>
// 				</Card>
// 			</Link>
// 		</Grid>
// 		</Grow>
// 	))}
// </Grid>
// <Grid container spacing={0}
// 	direction="row"
// 	justify="flex-start"
// 	alignItems="baseline">
// 	{followedCards.map((followed, index) => (
// 		 <Grow
// 		 in={true}
// 		 style={{ transformOrigin: '0 0 0' }}
// 		 timeout={index*500 }
// 	   >
// 		<Grid key={follows.UserID} item sm={3} xs={"auto"} zeroMinWidth>
// 			<Link style={{ textDecoration: 'none' }} to={{
// 				pathname: `/UserPage/${followed.UserID}`,
// 				state: { UserID: followed.UserID, show: false }
// 			}}>
// 				<Card>
// 					<CardActions>
// 						<ButtonBase>
// 							<CardContent>
// 								<b>{followed.Name}</b>
// 							</CardContent>
// 						</ButtonBase>
// 					</CardActions>
// 				</Card>
// 			</Link>
// 		</Grid>
// 		</Grow>
// 	))}
// </Grid>
