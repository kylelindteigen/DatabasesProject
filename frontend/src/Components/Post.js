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

}));

export default function Post(props) {

	const sendComment = ()=>{
		console.log("hello")
		fetch('/api/saveComment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({userid: localStorage.getItem("userid"), postid: props.match.params.PostID, comment: userComment}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
		})
		.catch(error => console.log("fetch error", error));
	}
	var userComment = ""
	const setUserComment = (event) => {
		userComment = event.target.value
	}
    const history = useHistory();

	const minRating = 1;
	const maxRating = 5;
	var name  = "fasdf"
	var post = "asld;kfj"
	var comment = [];
	var userid = "";

	const classes = useStyles();

	const [commentCards, setComment] = useState(comment);

	const [useridUser, setUserid] = useState(userid);

	const [reload, setReload] = useState(false);

	const [nameUser, setName] = useState(name);

	const [postUser, setPost] = useState(post);

	useEffect(() => {
		fetch('/api/loadPost', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({postid: props.match.params.PostID}),
			credentials: "same-origin"
		})
		.then(response => response.json())
		.then(r => {
			console.log(r)
			name = r.postinfo.Name
			setName(name)
			userid = r.postinfo.UserID
			setUserid(userid)
			console.log(userid)
			post = r.postinfo.Post
			setPost(post)
			comment = r.comments
			setComment(comment)
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
							<Link style={{ textDecoration: 'none' }} to={{
								pathname: `/UserPage/${useridUser}`
							}}>
							<Card>
								<CardActions>
									<ButtonBase>
										<CardContent>
											<b>{nameUser}</b>
											<p>{postUser}</p>
										</CardContent>
									</ButtonBase>
								</CardActions>
							</Card>
							</Link>
							</div>
							<Popup modal="true" trigger = {<button>Comment</button>}>
								{close => (
  							      <div alignItems="center">
  								  <div alignItems="center">
  								  <textarea rows="5" cols="125" onKeyUp={setUserComment}></textarea>
  								  </div>
    									<button onClick={sendComment}>Submit</button>
      								<button onClick={close}>Close</button>
  							      </div>
							    )}
							</Popup>


						</div>
					</div>

					<div className="card-body" id="posts">
						<Grid container spacing={0}
							direction="row"
							justify="flex-start"
							alignItems="baseline">
							{commentCards.map((comment, index) => (
								 <Grow
								 in={true}
								 style={{ transformOrigin: '0 0 0' }}
								 timeout={index*500 }
							   >
								<Grid key={comment.PostID} item sm={3} xs={"auto"} zeroMinWidth>
									<Link style={{ textDecoration: 'none' }} to={{
										pathname: `/UserPage/${comment.UserID}`,
										state: { PostID: comment.UserID, show: false }
									}}>
										<Card>
											<CardActions>
												<ButtonBase>
													<CardContent>
														<b>{comment.Name}</b>
														<p>{comment.Comment}</p>
														<p>{comment.TimeStamp}</p>
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
