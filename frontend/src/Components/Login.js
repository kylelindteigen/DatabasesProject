import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const [failed, setFailed] = React.useState(false);
  const { onLogin, onPageLoad } = useHomePage();
  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setFailed(false);
	};

	useEffect(() => {
		// if (localStorage.token) {
		// 	history.push((onPageLoad(localStorage.token)));
		// }
	});
  const loginSubmit = () => {
	  let x = JSON.stringify({ "user": {
		"email" : "email",
		"password" : "password"
	}})
  		fetch('/api/login', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(inputs),
			credentials: "same-origin"
  		})
  			.then(response => response.json())
  			.then((data) => {
  				if (data.status == "success") {
					localStorage.setItem("token", data.token);
					localStorage.setItem("userid", data.userid);
					localStorage.setItem("name", data.name);
					console.log(loginUser(data))
					console.log((onLogin(data.token)))
					dispatch(loginUser(data));
					history.push((onLogin(data.token)));
  				} else {
					setFailed(true);
  				}
  			})
  			.catch(error => { setFailed(true); console.log("fetch error", error)});
  }
  const { inputs, handleInputChange, handleSubmit } = useLogin(loginSubmit);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
			onChange={handleInputChange}
            name="email"
            autoComplete="email"
			value={inputs.email || ''}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
			onChange={handleInputChange}
            autoComplete="current-password"
			value={inputs.password || ''}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
              <Link component={RouteLink} to="/SignUp" variant="body2" lineHeight="5">
                {"User Sign Up"}
              </Link>
            </Grid>
            <Grid>
              <Link component={RouteLink} to="/SignUpRestaurant" variant="body2" lineHeight="5">
                {"Restaurant sign up"}
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
