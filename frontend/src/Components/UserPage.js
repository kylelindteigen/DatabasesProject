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
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";

import NavBar from './NavBar';
import "./RestaurantsList.css";

const useStyles = makeStyles(theme => ({

}));

export default function UserPage(props) {


    const dispatch = useDispatch();
    const history = useHistory();
	fetch('/api/isRest', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({userid: props.match.params.UserID}),
	})
		.then(response => response.json())
		.then((data) => {
			if (data.Restaurant) {
				history.push(`/RestaurantPage/${props.match.params.UserID}`)
			} else {

			}
		})
		.catch(error => { setReload(true); console.log("fetch error", error)});
	const minRating = 1;
	const maxRating = 5;
	var name  = "fasdf"
	var search = [];

	var posts = [];

	var follows = [];

	var followed = [];

	var reviews = [];

	const classes = useStyles();

	const [searchCards, setSearch] = useState(search);

	const [postCards, setPosts] = useState(posts);

	const [followsCards, setFollows] = useState(follows);

	const [followedCards, setFollowed] = useState(followed);

	const [reviewsCards, setReviews] = useState(reviews);

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
		fetch('/api/loadUserPage', {
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
		})
		.catch(error => console.log("fetch error", error));
	}, [reload])
	const refresh = ()=> {
        history.push(props.location.pathname);
      }
	var setname = ()=>{
		return(name)
	}

	return(
		<div >
			<NavBar/>
			<div>
			<div className="grid">
			<h>Follows</h>
			<Grid container spacing={0}
				direction="column"
				justify="flex-start"
				alignItems="baseline">
				{followsCards.map((follows, index) => (
					 <Grow
					 in={true}
					 style={{ transformOrigin: '0 0 0' }}
					 timeout={index*500 }
				   >
					<Grid key={follows.UserID} xs={12} zeroMinWidth>
						<Link style={{ textDecoration: 'none' }} to={{
							pathname: `/UserPage/${follows.UserID}`,
							state: { UserID: follows.UserID, show: false }
						}} >
							<Card >
								<CardActions>
									<ButtonBase onClick={refresh}>
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
			</div>
			<div className="div">
				<div className="card">
					<div className="card-header">
						<div className="hero-container">
							<div className="d-flex flex-column align-items-center justify-content-center">
								<textarea className="logo d-flex justify-content-center" value={nameUser}></textarea>
							</div>
							<button onClick={follow}>follow</button>

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
								<Grid key={post.PostID}  xs={12} zeroMinWidth>
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
			<h>Followed By</h>
			<Grid container spacing={0}
				direction="column"
				justify="flex-start"
				alignItems="baseline">
				{followedCards.map((followed, index) => (
					 <Grow
					 in={true}
					 style={{ transformOrigin: '0 0 0' }}
					 timeout={index*500 }
				   >
					<Grid key={follows.UserID} xs={12} zeroMinWidth>
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

			</div>
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
														<b alignte>{reviews.RName}</b>
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
			</div>
		</div>
	)
}
