import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useHistory } from 'react-router-dom';

import DrawerList from './DrawerList'
// import MenuButton from './MenuButton';
// import FilterSpeeches from './FilterSpeeches';

const useStyles = makeStyles(theme => ({
	root:{
		width: '100%',
		padding: 0,
	},
	list: {
		width: '100%',
		height: '98%',
		margin: 0,
		padding: 0,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',

	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '50%',
		[theme.breakpoints.up('sm')]: {
			width: 50,
			'&:focus': {
				width: 200,
			},
		},
	},
}));

export default function NavBar(props) {
	const classes = useStyles();
    const history = useHistory();

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (side, open) => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<DrawerList />
		</div>
	);

	const handleSearch = (event) => {
		if(event.keyCode == 13){
			history.push(`/Search/${event.target.value}`)
		}
	}

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<SwipeableDrawer
						open={state.left}
						onClose={toggleDrawer('left', false)}
						onOpen={toggleDrawer('left', true)}>
						{sideList('left')}
					</SwipeableDrawer>
					<Typography className={classes.title} variant="h6" noWrap>
						iEat
          			</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
