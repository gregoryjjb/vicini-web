import React from 'react';

import {
	withStyles,
	AppBar,
	Toolbar,
	Typography,
	Button,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flex: 1,
	}
})

const Header = ({ classes }) => (
	<header className={classes.root} >
		<AppBar position="static">
			<Toolbar>
				<Typography variant="title" color="inherit" className={classes.title} >
					Linduino Vicini
				</Typography>
			</Toolbar>
		</AppBar>
	</header>
)

export default withStyles(styles)(Header);