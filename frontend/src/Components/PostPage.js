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
import "./RestaurantsList.css";

const useStyles = makeStyles(theme => ({

}));

export default function UserPage(props) {
	console.log(props.match.params.UserID)
	fetch('/api/isRestaurant', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({userid: props.match.params.UserID}),
	})
		.then(response => response.json())
		.then((data) => {
			if (data.Restaurant) {
				return()
			} else {

			}
		})
		.catch(error => { setReload(true); console.log("fetch error", error)});
	const minRating = 1;
	const maxRating = 5;
	var search = [];

	var posts = [];

	var follows = [];

	var followed = [];

	var reviews = [];

	const classes = useStyles();

	const [searchCards, setSearch] = useState(search);

	const [commentsCards, setComments] = useState(comments);

	const [reload, setReload] = useState(false);

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

			})
			.catch(error => { setReload(true); console.log("fetch error", error)});
	}

	useEffect(() => {
		fetch('/api/getPostComments', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({postid: props.match.params.PostID}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
			comments = r.comments
			setComments(comments)
		})
		.catch(error => console.log("fetch error", error));
	}, [reload])

	return(
		<div className="restaurants-list-container col-12 col-lg-4 p-2 order-2 order-lg-1">
			<div>
				<div className="card text-white bg-primary mb-3">
					<div className="card-header">
						<div className="hero-container">
							<div className="d-flex flex-column align-items-center justify-content-center">
								<h1 className="logo d-flex justify-content-center">iEat</h1>
								<a
									href=""
									target="_blank"
									rel="noopener noreferrer"
								>
									<small>
										<i></i>
									</small>
									<button type="button" onClick={follow()} >Follow</button>
									{/* <i className="fas fa-utensils"></i> */}
								</a>
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
					</div>
				</div>
			</div>

			<div>

			</div>
		</div>
	)
}
