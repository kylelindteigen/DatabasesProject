import React from 'react';
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouteLink } from 'react-router-dom';
import useLogin from './useLogin';
import { useHistory } from 'react-router-dom';
import { loginUser } from './actions';
import { useHomePage } from './useHomePage'
import HomePage from './HomePage'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpRestaurant() {
	const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();
    const [failed, setFailed] = React.useState(false);
    const { onLogin, onPageLoad } = useHomePage();
    const signupSubmit = () => {
		localStorage.clear();
    		fetch('http://localhost:8000/api/signUpRest', {
    			method: 'POST',
    			headers: {
    				'Content-Type': 'application/json',
    			},
    			body: JSON.stringify(inputs),
    		})
    			.then(response => response.json())
    			.then((data) => {
    				if (data.status == "success") {
						dispatch(loginUser(data));
						localStorage.setItem("token", data.token);
						localStorage.setItem("userid", data.insertId);

	  					history.push((onLogin(data)));
    					console.log(data)
    				} else {
	  					console.log("failed")
    				}
    			})
    			.catch(error => { setFailed(true); console.log("fetch error", error)});
    }
    const { inputs, handleInputChange, handleSubmit } = useLogin(signupSubmit);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
				onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
				onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
				onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
				onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
				onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="style"
                label="Style"
                type="style"
                id="style"
				onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="address"
				onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouteLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
