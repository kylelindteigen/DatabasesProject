import React, { Component, useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Popup from "reactjs-popup";

import NavBar from './NavBar';
import "./RestaurantsList.css";

const useStyles = makeStyles(theme => ({

}));

export default function HomePage() {

	const sendPost = ()=>{
		console.log("hello")
		fetch('/api/savePost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({userid: localStorage.getItem("userid"), post: post}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
		})
		.catch(error => console.log("fetch error", error));
	}

	var search = [];

	var posts = [];

	var follows = [];

	var followed = [];

	const classes = useStyles();

	const [searchCards, setSearch] = useState(search);

	const setPost = (event) => {
		post = event.target.value
	}

	var post = ""

	const [postCards, setPosts] = useState(posts);

	const [followsCards, setFollows] = useState(follows);

	const [followedCards, setFollowed] = useState(followed);

	const [reload, setReload] = useState(false);


	useEffect(() => {
		fetch('/api/loadHomePage', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({userid: localStorage.getItem("userid")}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
			posts = r.followsposts
			setPosts(posts)
			follows = r.follows
			setFollows(follows)
			followed = r.followed
			setFollowed(followed)
		})
		.catch(error => console.log("fetch error", error));
	}, [reload])

	return(
		<div >
			<NavBar/>
			<div>
			<div className="grid" background-color ="black">
			<h>Following</h>
			<Grid container spacing={0}
				direction="column"
				justify="flex-start"
				alignItems="baseline"
				>
				{followsCards.map((follows, index) => (
					 <Grow
					 in={true}
					 style={{ transformOrigin: '0 0 0' }}
					 timeout={index*500 }
				   >
					<Grid key={follows.UserID}  xs={12} zeroMinWidth>
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
			</div>
			<div className="div">
				<div className="card">
					<div className="card-header">
						<div className="hero-container">
							<div className="d-flex flex-column align-items-center justify-content-center">
								<textarea className="textarea" value={localStorage.getItem("name")}></textarea>
									{/* <i className="fas fa-utensils"></i> */}
							</div>
							<Popup modal="true" trigger = {<button>Post</button>}>
								{close => (
							      <div alignItems="center">
								  <div alignItems="center">
								  <textarea rows="5" cols="100" onKeyUp={setPost}></textarea>
								  </div>
  									<button onClick={sendPost}>Submit</button>
    								<button onClick={close}>Close</button>
							      </div>
							    )}
							</Popup>

						</div>
					</div>
					<div>

					</div>

					<div className="card-header" id="posts">
						<Grid container spacing={0}
							direction="column"
							justify="flex-start"
							alignItems="center">
							{postCards.map((post, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid direction="row" key={post.PostID} xs={12} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/Post/${post.PostID}`,
										state: { PostID: post.PostID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{post.Name}</b>
														<p>{post.Post}</p>
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

			</div>
			<div className="grid">
			<h>Followed By</h>
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
			</div>
	)
}
